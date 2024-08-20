import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { RangeSlider } from '../RangeSlider';
import { Divider } from '../Divider';
import { TextButtonGridList } from '../TextButtonGridList';
import { TextButton } from '../TextButton';
import { FavoriteButton } from '../FavoriteButton';

type FavoriteFilter = 'all' | 'fav'

export type FilterFavoriteProps = {
	isFavorite: boolean;
	onChange: (favorite: boolean) => void;
};

export const FilterFavorite: React.FC<FilterFavoriteProps> = ({ isFavorite, onChange }) => {
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
				animate
				selected={isFavorite}
				size={36}
				onPress={handlePress}
			/>
		</View>
	);
};
