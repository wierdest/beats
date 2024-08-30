import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SettingsContextProps {
  isScreenOn: boolean;
  toggleScreenOn: () => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children } :  { children: React.ReactNode }) => {

  const [isScreenOn, setIsScreenOn] = useState<boolean>(false);

  const loadScreenOn = async () => {
    try {
      const savedScreenOn = await AsyncStorage.getItem('screenOn');
      if (savedScreenOn) {
        setIsScreenOn(savedScreenOn === 'true');
      }
    } catch (error) {
      console.error('Failed to load theme', error);
    }
  };

  useEffect(() => {
    loadScreenOn();
  }, []);

  const toggleScreenOn = async () => {
    try {
      const newValue = !isScreenOn ? 'true' : 'false';
      await AsyncStorage.setItem('screenOn', newValue);
      setIsScreenOn(!isScreenOn);
    } catch (error) {
      console.error('Failed to save screen on value', error);
    }
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