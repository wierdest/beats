import React, { createContext, useState, ReactNode, useContext } from 'react';

// Defina o tipo FilterState aqui
export type FilterState = {
  tempo: string;
  genre: string;
  signature: string;
  favorite: boolean;
};

// Defina o tipo do contexto
type FilterContextType = {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    tempo: '',
    genre: '',
    signature: '',
    favorite: false,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
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