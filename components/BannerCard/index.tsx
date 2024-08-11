import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text} from 'react-native';
import { styles } from './styles';
import { SampleFilename } from '../BeatList';

interface BannerCardProps {
  bannerFilename: SampleFilename;
  soundSampleFilename: string;
}

const images: Record<SampleFilename, any> = {
  'lofi-chill': require('../../assets/images/samples/lofi-chill.png'),
  'tropical': require('../../assets/images/samples/tropical.png'),
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

	const selectImage = (filename: SampleFilename) => {
		return images[filename];
	  };
	
	return (
	<TouchableOpacity style={styles.container} onPress={handleBuy}>
		<Image
		source={selectImage(bannerFilename)}
		style={styles.image}
		resizeMode="cover"
		/>
	</TouchableOpacity>
	);

};