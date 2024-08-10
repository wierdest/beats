import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { ThreeDotMenu } from '../ThreeDotMenu';
import { FavoriteButton } from '../FavoriteButton';


export const HeaderRight = () => {
	const [favorite, setFavorite] = useState(false);

	return (
		<View style={styles.container}>
			
			<FavoriteButton selected={favorite} onPress={() => {setFavorite(prev => !prev)}}/>

			<ThreeDotMenu />
			
		</View>
	);
};