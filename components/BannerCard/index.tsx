import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text} from 'react-native';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FavoriteButton } from '../FavoriteButton';

interface BannerCardProps {
	bannerFilename: string;
	soundSampleFilename: string;

}

const images = {
	'lofi-chill.png': require('../../assets/images/samples/lofi-chill.png'),
};

export const BannerCard = ({ bannerFilename, soundSampleFilename }: BannerCardProps) => {
	const [sampled, setSampled] = useState(false);

	const handleBuy = () => {

		if(!sampled) {
			setSampled(true);
			console.log('play the sample file!')
		}
		console.log('proceed to the buying option!')
	}
	
	return (
	<TouchableOpacity style={styles.container} onPress={handleBuy}>
		<Image
		source={images['lofi-chill.png']}
		style={styles.image}
		resizeMode="cover"
		/>
	</TouchableOpacity>
	);

};