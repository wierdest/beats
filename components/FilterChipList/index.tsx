import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { FilterChip } from '../FilterChip';
import { useFilter } from '@/contexts/FilterContext';

export const FilterChipList = () => {
	const { filters, setFilters } = useFilter();

	const handleFilterClick = (filter: string, type: 'genre' | 'signature') => {
		setFilters(prevFilters => {
			const currentValues = prevFilters[type].split(',').filter(value => value);
			const newValues = currentValues.includes(filter)
				? currentValues.filter(value => value !== filter)
				: [...currentValues, filter];

			return {
				...prevFilters,
				[type]: newValues.join(','),
			};
		});
	};

	const handleChipClear = (item: string) => {
		const isGenre = filters.genre.split(',').includes(item);
		const isSignature = filters.signature.split(',').includes(item);
		if (isGenre) {
			handleFilterClick(item, 'genre');
		} else if (isSignature) {
			handleFilterClick(item, 'signature');
		} else if (item === filters.tempo) {
			// Resetar o filtro de tempo para o valor padrão '50-280'
			setFilters(prevFilters => ({
			  ...prevFilters,
			  tempo: '50-280',
			}));
		  }
	};

	const selectedGenres = filters.genre.split(',').filter(g => g && g !== 'ALL');
	const selectedSignatures = filters.signature.split(',').filter(s => s && s !== 'ALL');
	const selectedTempo = filters.tempo !== '50-280' ? [filters.tempo] : [];

	const selectedFilters = [...selectedGenres, ...selectedSignatures, ...selectedTempo];

	const renderItem = ({ item }: { item: string }) => (
		<FilterChip
			label={item}
			onClear={() => handleChipClear(item)}
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={selectedFilters}
				renderItem={renderItem}
				keyExtractor={(item, index) => `${item}-${index}`}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};