import { View } from "react-native";
import { createStyles } from "./styles";
import { DrawerHeader } from "../DrawerHeader";
import { FilterTempo } from "../FilterTempo";
import { Divider } from "../Divider";
import { FilterGenre } from "../FilterGenre";
import { FilterSignature } from "../FIlterSignature";
import { FilterFavorite } from "../FilterFavorite";
import { useTheme } from "@/contexts/ThemeContext";
import {  useFilter } from "@/contexts/FilterContext";

export const FilterDrawerLayout = () => {
  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);
  const { filters, handleFilterChange } = useFilter();

  return (
    <View style={styles.container}>
      <DrawerHeader />
      <View style={styles.filtersContainer}>
        <FilterTempo
          selectedTempo={filters.tempo}
          onChange={(tempo) => handleFilterChange({ tempo })}
        />
        <Divider />
        <FilterGenre
          selectedGenres={filters.genre.split(',').filter(g => g)}
          onChange={(genre) => handleFilterChange({ genre })}
        />
        <Divider />
        <FilterSignature
          selectedSignature={filters.signature.split(',').filter(g => g)}
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

