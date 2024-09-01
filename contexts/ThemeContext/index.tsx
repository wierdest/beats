import { defaultGlobalColors } from '@/app/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextProps {
  initialized: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
  globalColors: typeof defaultGlobalColors;
  setCustomColor: (colorKey: keyof typeof defaultGlobalColors, colorValue: string) => void;
  resetToFactoryDefaultColors: () => void;
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

  const setCustomColor = async (colorKey: keyof typeof defaultGlobalColors, colorValue: string) => {
    try {
      await AsyncStorage.setItem(colorKey, colorValue);
      setGlobalColorsInUse((prevColors) => ({
        ...prevColors,
        [colorKey]: colorValue,
      }));
    } catch (error) {
      console.error('Failed to save custom color', error);
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
    <ThemeContext.Provider value={{ initialized, isDarkMode, toggleTheme, globalColors: globalColorsInUse, setCustomColor, resetToFactoryDefaultColors }}>
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