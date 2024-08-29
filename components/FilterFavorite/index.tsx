import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { RangeSlider } from '../RangeSlider';
import { Divider } from '../Divider';
import { TextButtonGridList } from '../TextButtonGridList';
import { TextButton } from '../TextButton';
import { FavoriteButton } from '../FavoriteButton';
import { useTheme } from '@/contexts/ThemeContext';
import { darkTheme, lightTheme } from '@/app/colors';

type FavoriteFilter = 'all' | 'fav'
interface FilterFavoriteProps  {
	isFavorite: boolean,
	onChange: (favorite: boolean) => void;
};

export const FilterFavorite = ({ isFavorite, onChange }: FilterFavoriteProps )   => {
	const {isDarkMode} = useTheme();
	const handlePress = () => {
		onChange(!isFavorite);
	};

	return (
		<View style={styles.container}>
			<TextButton
				label="ALL"
				selected={!isFavorite}
				onPress={() => onChange(false)}
			/>
			<FavoriteButton
				heartBorderColor={isDarkMode ? darkTheme.accent : lightTheme.accent} 
				animate
				selected={isFavorite}
				size={36}
				onPress={handlePress}
			/>
		</View>
	);
};
