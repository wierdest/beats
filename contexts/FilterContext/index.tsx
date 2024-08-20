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
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    tempo: '',
    genre: '',
    signature: '',
    favorite: false,
  });

  const handleFilterChange = (newFilter: Partial<FilterState>) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        ...newFilter
      };
      console.log('Updated Filters:', updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, handleFilterChange }}>
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