import { Beat } from '@/components/BeatList';
import { createBeatsTable, deleteBeatsTable, getBeatById, getBeats, updateBeat } from '@/services/Database';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface DatabaseContextProps {
  initialized: boolean;
  beats: Beat[];
  findBeatById: (id: number) => Promise<Beat | null>;
  clearDb: () => Promise<void>;
  updateAndReload: (id: number, beat: Beat) => Promise<void>;


};

const DatabaseContext = createContext<DatabaseContextProps | undefined>(undefined);

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [beats, setBeats] = useState<Beat[]>([])

  const initDatabase = async () => {
    await createBeatsTable();
    await loadBeats();
    setInitialized(true);
  };

  const loadBeats = async () => {
    const beats = await getBeats();
    setBeats(beats)
  }

  const clearDb = async () => {
    await deleteBeatsTable();
  }
  const findBeatById = async (id: number) => {
    return await getBeatById(id);
  }

  const updateBeatAndReload = async (id: number, beat: Beat) => {
    await updateBeat(id, beat);
    await loadBeats();
  };


  useEffect(() => {
    initDatabase();
    // console.log('Tem ', beatsList.length, 'arquivos de audio na pasta!');
 
  }, []);
  
  return (
      <DatabaseContext.Provider
        value={{ initialized, beats, findBeatById, clearDb, updateAndReload: updateBeatAndReload}}
      >
        {children}
      </DatabaseContext.Provider>
  );
}

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (context === undefined) {
      throw new Error('useDatabase must be used within a DatabaseProvider!');
    }
    return context;
};