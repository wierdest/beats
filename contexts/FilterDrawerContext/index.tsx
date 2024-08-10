import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

interface FilterDrawerContextProps {
    selectedFilters: string[];
    toggleDrawer: () => void;
    addFilter: (filter: string) => void;
    removeFilter: (filter: string) => void;
};

const FilterDrawerContext = createContext<FilterDrawerContextProps | undefined>(undefined);

export const FilterDrawerProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const navigation = useNavigation();

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const addFilter = (filter: string) => {
        setSelectedFilters(prev => [...prev, filter]);
    };
    
    
    const removeFilter = (filter: string) => {
     setSelectedFilters(prev => prev.filter(f => f !== filter));
    };

    const loadFilters = async () => {
        try {
            const filters = await AsyncStorage.getItem('selectedFilters');
            if (filters) {
                setSelectedFilters(JSON.parse(filters));
            }
        } catch (error) {
            console.error('Failed to load filters from AsyncStorage:', error);
        }
    };

    const saveFilters = async () => {
        try {
            await AsyncStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
        } catch (error) {
            console.error('Failed to save filters to AsyncStorage:', error);
        }
    };

    useEffect(() => {
        loadFilters();
    }, []);

    useEffect(() => {
        saveFilters();
    }, [selectedFilters])

    return (
        <FilterDrawerContext.Provider
          value={{ selectedFilters, toggleDrawer, addFilter, removeFilter }}
        >
          {children}
        </FilterDrawerContext.Provider>
    );
}

export const useFilterDrawer = () => {
    const context = useContext(FilterDrawerContext);
    if (context === undefined) {
      throw new Error('useFilterDrawer must be used within a FilterDrawerProvider');
    }
    return context;
  };