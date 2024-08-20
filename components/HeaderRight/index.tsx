import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ThreeDotMenu } from '../ThreeDotMenu';
import { FavoriteButton } from '../FavoriteButton';
import { useFilter } from '@/contexts/FilterContext';


export const HeaderRight = () => {
	const [favorite, setFavorite] = useState(false);
	const { handleFilterChange } = useFilter();

	const handleFavorite = () => {
		handleFilterChange({'favorite': !favorite})
		setFavorite(prev => !prev);
	}



	return (
		<View style={styles.container}>
			
			<FavoriteButton selected={favorite} onPress={handleFavorite}/>

			<ThreeDotMenu />
			
		</View>
	);
};