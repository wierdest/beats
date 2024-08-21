import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useFilter } from '@/contexts/FilterContext';

export const FilterButton = () => {
	const navigation = useNavigation();

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

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