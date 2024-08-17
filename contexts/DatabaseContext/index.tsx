import { Beat } from '@/components/BeatList';
import { createBeatsTable, getBeats } from '@/services/Database';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Mp3Service } from '@/services/Mp3Service';

import beatsList from '@/beatsList.json';

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
    const fetchAndProcessFiles = async () => {
      await initDatabase();

      const filesInFolder = await getBeats(); 

      const beatsIds = beatsList.map(beat => beat.id);

      const newFiles = filesInFolder.filter(file => {
        const fileId = Number(file.id);
        return !beatsIds.includes(fileId);
      });

      if (newFiles.length > 0) {
        await Mp3Service.processMp3Files(); 
      }

      console.log('Tem ', filesInFolder.length, 'arquivos de audio na pasta!');
    };

    fetchAndProcessFiles();
  }, [beatsList]);
  
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