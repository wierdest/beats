import { Beat } from '@/components/BeatList';
import * as SQLite from 'expo-sqlite';
import beatsList from '@/beatsList.json';
import { BeatFilenameService } from '../BeatFilename';


// database local simples com sqlite
// ref: https://docs.expo.dev/versions/latest/sdk/sqlite/#usage

// abre o db assincronamente
const openDatabase = async () => {
    const db = await SQLite.openDatabaseAsync('beats.db');
    return db;
}

// cria a tabela de beats
export const createBeatsTable = async () => {
    // PRAGMA journal_mode = instrui o compilador (o comando pragma é pra isso) a usar o modo de journaling
    // como Write Ahead Logging, que oferece melhor perfomance para operações multi thread
    try {
        const db = await openDatabase();
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS beats (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                bpm INTEGER NOT NULL,
                minBPM INTEGER NOT NULL,
                midBPM INTEGER NOT NULL,
                maxBPM INTEGER NOT NULL,
                signature TEXT NOT NULL,
                bars INTEGER NOT NULL,
                genre TEXT NOT NULL,
                title TEXT NOT NULL
            );
        `);

        const existingRows = await db.getAllAsync<Beat>('SELECT * FROM beats;');

        if(existingRows.length < beatsList.length) {
            // db está desatualizado com a lista de arquivos
            const existingIds = existingRows.map(row => row.id)
            const beatsParaAdcionarAoDB = beatsList.filter(beat => !existingIds.includes(beat.id)).map(b => b.title)
            console.log('title para ser processado e inserido no db ', beatsParaAdcionarAoDB)

            beatsParaAdcionarAoDB.forEach(beatTitle => insertBeat(BeatFilenameService.extractInfo(beatTitle)))

        } else {
            console.log('beats table contém ', existingRows.length, 'beats.')
        }
    } catch (e) {
        console.log('Erro ao criar o db! ', e);
    }
}

// crud básico

// getAll
export const getBeats = async (): Promise<Beat[]> => {
    try {
        const db = await openDatabase();
        const result = await db.getAllAsync('SELECT * FROM beats;');
        // mapeia o resultado
        const beats: Beat[] = result.map((row: any) => ({
            id: row.id,
            bpm: row.bpm,
            minBPM: row.minBPM,
            midBPM: row.midBPM,
            maxBPM: row.maxBPM,
            signature: row.signature,
            bars: row.bars,
            genre: row.genre,
            title: row.title,
            path: row.path
        }));

        return beats;
    } catch (e) {
        console.error('Erro ao buscar os beats: ', e);
        return [];
    }
}

// getById
export const getBeatById = async (id: number) => {
    try {
        const db = await openDatabase();
        const beat = await db.getFirstAsync<Beat>('SELECT * FROM beats WHERE id = ?;', id);
        return beat;
    } catch (e) {
        console.log('Erro ao buscar o beat: ', e);
        return null;
    }
}

// insere beat
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
        const db = await openDatabase();
        // no momento que insere a tabela tem o midBPM set no valor do bpm que é o default do arquivo.
        await db.runAsync(`
            INSERT INTO beats (bpm, minBPM, midBPM, maxBPM, signature, bars, genre, title)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, beat.bpm, beat.minBPM, beat.bpm, beat.maxBPM, beat.signature, beat.bars, beat.genre, beat.title);
        console.log('Beat inserido com sucesso!');
    } catch (e) {
        console.log(beat.bpm, beat.minBPM, beat.maxBPM, beat.signature, beat.bars, beat.genre, beat.title)
        console.log('Erro ao inserir o beat: ', e);
    }
}

// update 
export const updateBeat = async (id: number, beat: Beat) => {
    try {
        const db = await openDatabase();
        await db.runAsync(`
            UPDATE beats
            SET bpm = ?, minBPM = ?, maxBPM = ?, signature = ?, bars = ?, genre = ?, title = ?
            WHERE id = ?;
        `, beat.bpm, beat.minBPM, beat.maxBPM, beat.signature, beat.bars, beat.genre, beat.title, id);
        console.log('Beat atualizado com sucesso!');
    } catch (e) {
        console.log('Erro ao atualizar o beat: ', e);
    }
}

// delete by id
export const deleteBeat = async (id: number) => {
    try {
        const db = await openDatabase();
        await db.runAsync(`
            DELETE FROM beats WHERE id = ?;
        `, id);
        console.log('Beat deletado com sucesso!');
    } catch (e) {
        console.error('Erro ao deletar o beat: ', e);
    }
}

// delete all drop table
export const deleteBeatsTable = async () => {
    try {
        const db = await openDatabase();
        await db.execAsync('DROP TABLE IF EXISTS beats;');
        console.log('Tabela de beats deletada com sucesso!');
    } catch (e) {
        console.error('Erro ao deletar a tabela de beats: ', e);
    }
}

// Verifica se um arquivo com o ID fornecido já existe no banco de dados
export const existsInDatabase = async (id: number): Promise<boolean> => {
    try {
        const db = await openDatabase();
        const result = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) AS count FROM beats WHERE id = ?;', id);

        if (result === null) {
            return false;  
        }

        return result.count > 0;
    } catch (e) {
        console.log('Erro ao verificar a existência do arquivo: ', e);
        return false;
    }
}






