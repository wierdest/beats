import { Beat } from '@/components/BeatList';
import { createBeatsTable, getBeats } from '@/services/Database';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface DatabaseContextProps {
  initialized: boolean;
  beats: Beat[]

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
  }, [])

  return (
      <DatabaseContext.Provider
        value={{ initialized, beats }}
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