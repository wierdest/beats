import { Beat } from '@/components/BeatList';
import { createBeatsTable, getBeatById, getBeats } from '@/services/Database';
import React, { createContext, useContext, useEffect, useState } from 'react';

import beatsList from '@/beatsList.json';

interface DatabaseContextProps {
  initialized: boolean;
  beats: Beat[];
  getBeatById: (id: number) => Promise<Beat | null>;
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

  useEffect(() => {
    initDatabase();
    // compara beats beatsList, se tiver mais no beatsList, atualiza a db com o insertBeat
    console.log('Tem ', beatsList.length, 'arquivos de audio na na pasta!');
    
  }, [])

  const getBeatById = async (id: number) => {
    return await getBeatById(id);
  };

  return (
      <DatabaseContext.Provider
        value={{ initialized, beats, getBeatById }}
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