import { defaultGlobalColors } from '@/app/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextProps {
  initialized: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
  globalColors: typeof defaultGlobalColors;
  setCustomColor: (colorKey: keyof typeof defaultGlobalColors, colorValue: string) => void;
  saveColorsToStorage: () => Promise<void>;
  resetToUserDefaultColors: () => Promise<void>;
  resetToFactoryDefaultColors: () => void;
  areColorsInSyncWithStorage: () => Promise<boolean>;

}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children } :  { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [globalColorsInUse, setGlobalColorsInUse] = useState<typeof defaultGlobalColors>(defaultGlobalColors)

  const initializeTheme = async () => {
    try {

      await loadTheme();
      await loadCustomColors();
      setInitialized(true);

    } catch (e) {
      console.log('Falha ao carregar temas!', e)
    }
    
  };

  useEffect(() => {
    initializeTheme();
  }, []);
  
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme', error);
    }
  };

  const loadCustomColors = async () => {
    try {
      const storedColors = { ...defaultGlobalColors };
      for (const key of Object.keys(defaultGlobalColors) as Array<keyof typeof defaultGlobalColors>) {
        const storedColor = await AsyncStorage.getItem(key);
        if (storedColor) {
          storedColors[key] = storedColor;
        }
      }
      setGlobalColorsInUse(storedColors);
    } catch (error) {
      console.error('Failed to load custom colors', error);
    }
  };

  const setCustomColor = (colorKey: keyof typeof defaultGlobalColors, colorValue: string) => {
    setGlobalColorsInUse((prevColors) => ({
      ...prevColors,
      [colorKey]: colorValue,
    }));
  };

  const saveColorsToStorage = async () => {
    try {
      await AsyncStorage.multiSet(
        Object.entries(globalColorsInUse).map(([key, value]) => [key, value])
      );
    } catch (error) {
      console.error('Failed to save colors to storage', error);
    }
  };

  const areColorsInSyncWithStorage = async (): Promise<boolean> => {
    try {
      const storedColors = { ...defaultGlobalColors };
      
      for (const key of Object.keys(defaultGlobalColors) as Array<keyof typeof defaultGlobalColors>) {
        const storedColor = await AsyncStorage.getItem(key);
        if (storedColor) {
          storedColors[key] = storedColor;
        }
      }
  
      // Compare stored colors with the currently in-use colors
      for (const key of Object.keys(storedColors) as Array<keyof typeof defaultGlobalColors>) {
        if (storedColors[key] !== globalColorsInUse[key]) {
          return false; // Mismatch found
        }
      }
  
      return true; 
    } catch (error) {
      console.error('Failed to compare colors with storage', error);
      return false;
    }
  };

  const resetToUserDefaultColors = async () => {
    try {
      await loadCustomColors();
      // console.log('Colors reset to user default values.');
    } catch (error) {
      console.error('Failed to reset colors to user default', error);
    }
  };

  const resetToFactoryDefaultColors = async () => {
    try {
      await AsyncStorage.multiRemove(Object.keys(defaultGlobalColors));
      setGlobalColorsInUse(defaultGlobalColors);
    } catch (error) {
      console.error('Failed to reset colors to factory default', error);
    }
  };
  
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode ? 'dark' : 'light';
      await AsyncStorage.setItem('theme', newTheme);
      setIsDarkMode(!isDarkMode);
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      initialized, 
      isDarkMode, 
      toggleTheme, 
      globalColors: globalColorsInUse, 
      setCustomColor,  
      saveColorsToStorage,
      resetToUserDefaultColors,
      resetToFactoryDefaultColors,
      areColorsInSyncWithStorage
      
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};