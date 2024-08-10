import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useFilterDrawer } from '@/contexts/FilterDrawerContext';

export const FilterButton = () => {
	const { toggleDrawer } = useFilterDrawer();
	return (
		<TouchableOpacity style={styles.filterButton} onPress={toggleDrawer}>
		  <MaterialCommunityIcons
				name={"filter-outline"}
				size={24}
				color={"black"}
			/>
			<Text style={styles.label}>Filters</Text>
		</TouchableOpacity>
	);
};