import { Beat } from '@/components/BeatList';
import { createBeatsTable, deleteBeatsTable, fileExistsInDatabase, getBeatById, getBeats } from '@/services/Database';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BeatFilenameService } from '@/services/BeatFilename';

import beatsList from '@/beatsList.json';

interface DatabaseContextProps {
  initialized: boolean;
  beats: Beat[];
  findBeatById: (id: number) => Promise<Beat | null>;
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


  useEffect(() => {
    // clearDb();
    initDatabase();
    console.log('Tem ', beatsList.length, 'arquivos de audio na pasta!');
 
  }, []);
  
  return (
      <DatabaseContext.Provider
        value={{ initialized, beats, findBeatById}}
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