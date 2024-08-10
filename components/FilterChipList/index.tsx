import React, { useState } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FavoriteButton } from '../FavoriteButton';
import { Beat } from '@/types/types';
import { BeatCard } from '../BeatCard';
import { FlatList } from 'react-native-gesture-handler';
import { FilterChip } from '../FilterChip';

const data: string[] = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5'];

export const FilterChipList = () => {
	const handleClear = (filter: string) => {
		
		console.log(`${filter} cleared`);
	};

	const renderItem = ({ item }: { item: string }) => (
		<FilterChip
			label={item}
			onClear={() => handleClear(item)}
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};