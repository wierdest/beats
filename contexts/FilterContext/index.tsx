import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina o tipo FilterState aqui
export type FilterState = {
  tempo: string;
  genre: string;
  signature: string;
  favorite: boolean;
};

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  handleFilterChange: (newFilter: Partial<FilterState>) => void;
  checkEmpty: () => boolean;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({
    tempo: '50-280',
    genre: 'ALL',
    signature: 'ALL',
    favorite: false,
  });

  const handleFilterChange = (newFilter: Partial<FilterState>) => {
    setFilters((prevFilters) => {
      const shouldUpdate = Object.keys(newFilter).some(
        (key) => prevFilters[key as keyof FilterState] !== newFilter[key as keyof FilterState]
      );
  
      if (shouldUpdate) {
        return {
          ...prevFilters,
          ...newFilter
        };
      }
      // console.log("Filtros atualizados:", prevFilters);
      return prevFilters;
    });
  };

  const checkEmpty = () => {
    return filters.genre === 'ALL' && filters.signature === 'ALL' && filters.tempo === '50-280' && !filters.favorite;
  }


  return (
    <FilterContext.Provider value={{ filters, setFilters, handleFilterChange, checkEmpty }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};