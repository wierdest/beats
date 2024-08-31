import { Beat } from '@/components/BeatList';
import { createBeatsTable, deleteBeatsTable, getBeatById, getBeats, populateBeatsTable, updateBeat } from '@/services/Database';
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
    try {
      await createBeatsTable();
      await populateBeatsTable();
      
    } catch (e) {
      console.log('Erro ao criar a tabela de beats!')
    }
    try {
      await loadBeats();
      console.log('Beats carregadas com sucesso!')
      setInitialized(true);
      return;
    } catch (e) {
      console.log('Erro ao carregar beats!')
    }
    setInitialized(false);
  };

  const loadBeats = async () => {
    const beats = await getBeats();
    setBeats(beats)
  }

  const clearDb = async () => {
    setInitialized(!initialized);
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
 
  }, [initialized]);
  
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