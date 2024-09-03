import * as SQLite from 'expo-sqlite';
import { Beat } from '@/components/BeatList';
import beatsList from '@/beatsList.json';
import { BeatFilenameService } from '../BeatFilename';

// followed the model @ https://github.com/expo/expo/issues/28176
class Sqlite3Connector {
    private dbName: string;

    constructor(dbName: string) {
        this.dbName = dbName;
    }

    async configureConnection() {
        const databaseConnector = await SQLite.openDatabaseAsync(this.dbName, { useNewConnection: true });
        databaseConnector
            ? console.log("Database Connected")
            : console.log("Database Not Connected");
        return databaseConnector;
    }

    // For INSERT, UPDATE, DELETE operations
    async queryInsertUpdateDelete(sql: string, params: any[] = []) {
        const databaseConnector = await this.configureConnection();

        try {
            const result = await databaseConnector.runAsync(sql, params);
            const row = { "Rows Affected": result.changes };
            return row;
        } catch (error) {
            console.error('Error during query:', error);
            throw error;
        } finally {
            await databaseConnector.closeAsync();
        }
    }

    // For SELECT (GET) queries
    async queryGet<T>(sql: string, params: any[] = []): Promise<T[]> {
        const databaseConnector = await this.configureConnection();

        try {
            const result = await databaseConnector.getAllAsync<T>(sql, params);
            return result;
        } catch (error) {
            console.error('Error during query:', error);
            throw error;
        } finally {
            await databaseConnector.closeAsync();
        }
    }

    async withTransactionAsync(transactionFn: (db: SQLite.SQLiteDatabase) => Promise<void>) {
        const databaseConnector = await this.configureConnection();

        try {
            await databaseConnector.withTransactionAsync(async () => {
                await transactionFn(databaseConnector);
            });
        } catch (error) {
            console.error('Transaction failed:', error);
            throw error;
        } finally {
            await databaseConnector.closeAsync();
        }
    }
}

const dbConnector = new Sqlite3Connector('beats.db');

export const createBeatsTable = async () => {
    try {

        const db = await dbConnector.configureConnection();

        // Set PRAGMA outside of a transaction
        await db.execAsync(`PRAGMA journal_mode = WAL;`)

        await dbConnector.withTransactionAsync(async (db) => {
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS beats (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    bpm INTEGER NOT NULL,
                    minBPM INTEGER NOT NULL,
                    midBPM INTEGER NOT NULL,
                    maxBPM INTEGER NOT NULL,
                    signature TEXT NOT NULL,
                    bars INTEGER NOT NULL,
                    genre TEXT NOT NULL,
                    title TEXT NOT NULL,
                    favorite INTEGER NOT NULL
                );
            `);
            console.log('Beats table created or already exists.');
        });
    } catch (e) {
        console.error('Error creating the database table:', e);
    }
};

export const populateBeatsTable = async () => {
    try {
        const existingRows = await dbConnector.queryGet<Beat>('SELECT * FROM beats;');

        if (existingRows.length < beatsList.length) {
            const existingIds = existingRows.map(row => row.id);
            const beatsToInsert = beatsList.filter(beat => !existingIds.includes(beat.id)).map(b => b.title);

            for (const beatTitle of beatsToInsert) {
                try {
                    await insertBeat(BeatFilenameService.extractInfo(beatTitle));
                } catch (insertError) {
                    console.error('Error inserting beat:', beatTitle, insertError);
                }
            }
        } else {
            console.log('Beats table already populated with', existingRows.length, 'beats.');
        }
    } catch (e) {
        console.error('Error populating beats table:', e);
    }
};


// Get All Beats
export const getBeats = async (): Promise<Beat[]> => {
    try {
        const sql = 'SELECT * FROM beats;';
        const result = await dbConnector.queryGet<Beat>(sql);

        return result;
    } catch (e) {
        console.error('Error fetching beats:', e);
        return [];
    }
};

// Get Beat By ID
export const getBeatById = async (id: number) => {
    try {
        const sql = 'SELECT * FROM beats WHERE id = ?;';
        const result = await dbConnector.queryGet<Beat>(sql, [id]);

        if (result.length === 0) {
            console.log("No beat found with id", id);
            return null;
        }

        return result[0];
    } catch (e) {
        console.error('Error fetching beat by id:', e);
        return null;
    }
};

// Insert Beat
export const insertBeat = async (beat: {
    bpm: number;
    minBPM: number;
    maxBPM: number;
    signature: string;
    bars: number;
    genre: string;
    title: string;
}) => {
    try {
        const sql = `
            INSERT INTO beats (bpm, minBPM, midBPM, maxBPM, signature, bars, genre, title, favorite)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        const params = [beat.bpm, beat.minBPM, beat.bpm, beat.maxBPM, beat.signature, beat.bars, beat.genre, beat.title, 0];
        await dbConnector.queryInsertUpdateDelete(sql, params);
    } catch (e) {
        console.error('Error inserting beat:', e);
    }
};

// Update Beat
export const updateBeat = async (id: number, beat: Beat) => {
    try {
        const sql = `
            UPDATE beats
            SET bpm = ?, minBPM = ?, maxBPM = ?, signature = ?, bars = ?, genre = ?, title = ?, favorite = ?
            WHERE id = ?;
        `;
        const params = [beat.bpm, beat.minBPM, beat.maxBPM, beat.signature, beat.bars, beat.genre, beat.title, beat.favorite, id];
        await dbConnector.queryInsertUpdateDelete(sql, params);
    } catch (e) {
        console.error('Error updating beat:', e);
    }
};

// Delete Beat
export const deleteBeat = async (id: number) => {
    try {
        const sql = 'DELETE FROM beats WHERE id = ?;';
        await dbConnector.queryInsertUpdateDelete(sql, [id]);
    } catch (e) {
        console.error('Error deleting beat:', e);
    }
};

// Delete Beats Table
export const deleteBeatsTable = async () => {
    try {
        const sql = 'DROP TABLE IF EXISTS beats;';
        await dbConnector.queryInsertUpdateDelete(sql);
    } catch (e) {
        console.error('Error deleting beats table:', e);
    }
};

// Check if Beat Exists
export const existsInDatabase = async (id: number): Promise<boolean> => {
    try {
        const sql = 'SELECT COUNT(*) AS count FROM beats WHERE id = ?;';
        const result = await dbConnector.queryGet<{ count: number }>(sql, [id]);

        return result[0].count > 0;
    } catch (e) {
        console.error('Error checking if beat exists:', e);
        return false;
    }
};