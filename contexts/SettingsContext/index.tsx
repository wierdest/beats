import AsyncStorage from '@react-native-async-storage/async-storage';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextProps {
  isScreenOn: boolean;
  toggleScreenOn: (newValue: boolean) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children } :  { children: React.ReactNode }) => {

  const [isScreenOn, setIsScreenOn] = useState<boolean>(false);

  const loadScreenOn = async () => {
    try {
      const savedScreenOn = await AsyncStorage.getItem('screenOn');
      toggleScreenOn(savedScreenOn === 'true');
    } catch (error) {
      console.error('Failed to load theme', error);
    }
  };

  useEffect(() => {
    loadScreenOn();
  }, []);

  const toggleScreenOn = async (newValue: boolean) => {
    try {
      const screenOnString = newValue ? 'true' : 'false';
      await AsyncStorage.setItem('screenOn', screenOnString);
      if(newValue) {
        try {
            activateKeepAwakeAsync();
            setIsScreenOn(true);
            return;
        } catch(e) {
            console.log('Erro trying to activate the screen')
        }
    } else {
        deactivateKeepAwake();
    }
    } catch (error) {
      console.error('Failed to save screen on value', error);
    }
    setIsScreenOn(false)

  };

  return (
    <SettingsContext.Provider value={{ isScreenOn, toggleScreenOn }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};