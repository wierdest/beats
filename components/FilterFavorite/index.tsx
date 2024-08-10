import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { RangeSlider } from '../RangeSlider';
import { Divider } from '../Divider';
import { TextButtonGridList } from '../TextButtonGridList';
import { TextButton } from '../TextButton';
import { FavoriteButton } from '../FavoriteButton';

type FavoriteFilter = 'all' | 'fav'

export const FilterFavorite = () => {

	const [selected, setSelected] = useState<FavoriteFilter>('all')

	const selectFilter = (type: FavoriteFilter) => {
		setSelected(type)
	}
	
	return (
		<View style={styles.container}>
			<TextButton 
				label={'ALL'}  
				selected={selected === 'all'} 
				onPress={() => { selectFilter('all')}}
				/>
			<FavoriteButton 
				animate 
				selected={selected === 'fav'}
				size={36} 
				onPress={() => { selected === 'fav' ? selectFilter('all') : selectFilter('fav')}}
				/>

		</View>
	)
};