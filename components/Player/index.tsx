import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { styles } from './styles';
import { PlayButton } from '../PlayButton';
import { PlayerExpandButton } from '../PlayerExpandButton';
import { ProgressBar } from '../ProgressBar';
import { SliderControl } from '../SliderControl';
import { SliderCustomButton } from '../SliderCustomButton';
import { Divider } from '../Divider';
import { useModal } from '@/contexts/ModalContext';


export const Player = () => {

	const { toggleModal } = useModal();

	const [bpm, setBpm] = useState(190);
	const [volume, setVolume] = useState(40);

	const [isExpanded, setIsExpanded] = useState(false);
	const heightAnim = useRef(new Animated.Value(0)).current;
	const handleExpandPress = () => {
		setIsExpanded(prev => !prev);
		
	};
	useEffect(() => {
		Animated.timing(heightAnim, {
			toValue: isExpanded ? 140 : 0,
			duration: 80,
			useNativeDriver: false,
		}).start();
	}, [isExpanded]);

	return (
		<View style={styles.container}>
			<View style={styles.mainControls}>
				<View style={styles.topRow}>
					<PlayButton />
					<Text style={styles.beatName}>Beat Name</Text>
					<PlayerExpandButton isExpanded={isExpanded} onPress={handleExpandPress} />
				</View>
				<ProgressBar progress={0.5} />

			</View>

			<Animated.View style={[styles.auxiliaryControls, { height: heightAnim }]}>
				{isExpanded && (
					<View style={styles.innerAuxControls}>
						<SliderControl 
							tag={'bpm'} 
							value={bpm} 
							minValue={180} 
							maxValue={220} 
							onValueChange={setBpm}
							customButton={

							<SliderCustomButton iconName='clock' onPress={() => toggleModal('timer')}/>
						
							}
							
							/>
						<Divider/>
						<SliderControl 
							tag={'dB'} 
							value={volume} 
							minValue={0} 
							maxValue={100} 
							onValueChange={setVolume}
							customButton={<SliderCustomButton iconName='volume-off'/>}
							
							/>
					</View>
				)}
			</Animated.View>
		</View>
	);
};