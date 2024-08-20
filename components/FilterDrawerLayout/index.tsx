import { View, TouchableOpacity, Text } from "react-native";
import { createStyles } from "./styles";
import { DrawerHeader } from "../DrawerHeader";
import { useState } from "react";
import { FilterTempo } from "../FilterTempo";
import { Divider } from "../Divider";
import { FilterGenre } from "../FilterGenre";
import { FilterSignature } from "../FIlterSignature";
import { FilterFavorite } from "../FilterFavorite";
import { useTheme } from "@/contexts/ThemeContext";
import { FilterState, useFilter } from "@/contexts/FilterContext";

export const FilterDrawerLayout = () => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const { filters, setFilters } = useFilter();

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
    <View style={styles.container}>
      <DrawerHeader />
      <View style={styles.filtersContainer}>
        <Divider />
        <FilterTempo
          selectedTempo={filters.tempo}
          onChange={(tempo) => handleFilterChange({ tempo })}
        />
        <Divider />
        <FilterGenre
          onChange={(genre) => handleFilterChange({ genre })}
        />
        <Divider />
        <FilterSignature
          onChange={(signature) => handleFilterChange({ signature })}
        />
        <Divider />
        <FilterFavorite
          isFavorite={filters.favorite}
          onChange={(favorite) => handleFilterChange({ favorite })}
        />
      </View>
    </View>
  );
}

