import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { DrawerHeader } from "../DrawerHeader";
import { useState } from "react";
import { FilterTempo } from "../FilterTempo";
import { Divider } from "../Divider";
import { FilterGenre } from "../FilterGenre";
import { FilterMeter } from "../FilterMeter";
import { FilterFavorite } from "../FilterFavorite";

export const FilterDrawerLayout = ( ) => {
  
  const [filter, setFilter] = useState<string>('all');

	const handleFilterChange = (newFilter: string) => {
		setFilter(newFilter);
	};


  return (
    <View style={styles.container}>

      <DrawerHeader/>

      <View style={styles.filtersContainer}>
        <Divider/>
        <FilterTempo/>
        <Divider/>
        <FilterGenre/>
        <Divider/>
        <FilterMeter/>
        <Divider/>
        <FilterFavorite/>
      </View>
     
    </View>
  );

}

