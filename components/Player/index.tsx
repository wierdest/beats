import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import { createStyles } from './styles';
import { PlayButton } from '../PlayButton';
import { PlayerExpandButton } from '../PlayerExpandButton';
import { ProgressBar } from '../ProgressBar';
import { SliderControl } from '../SliderControl';
import { SliderCustomButton } from '../SliderCustomButton';
import { Divider } from '../Divider';
import { useModal } from '@/contexts/ModalContext';
import { VolumeManager } from 'react-native-volume-manager';
import { useTheme } from '@/contexts/ThemeContext';
import { Beat } from '../BeatList';

interface PlayerProps {
	beat: Beat;
	audioPlaying: boolean;
	onPlay: () => void;
	onStop: () => void;
	onBpmChange: (newBpm: number) => Promise<void>
}

export const Player = ({ beat, onBpmChange, onPlay, onStop }: PlayerProps) => {
	const { isDarkMode } = useTheme();
	const styles = createStyles(isDarkMode);

	const { toggleModal } = useModal();

	const [volume, setVolume] = useState(35);

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

	// Setup volume listener
	useEffect(() => {
		const fetchVolume = async () => {
			const { volume } = await VolumeManager.getVolume();
			setVolume(Math.round(volume * 100));
		};
		fetchVolume();

		// const volumeListener = VolumeManager.addVolumeListener((result) => {
		// 	setVolume(Math.round(result.volume * 100));
		// });
		// return () => {
		// 	volumeListener.remove();
		// };
	}, []);

	const adjustVolume = (volumeLevel: number) => {
		VolumeManager.setVolume(volumeLevel / 100);
		VolumeManager.showNativeVolumeUI({ enabled: true })
	};

	useEffect(() => {
		adjustVolume(volume);
	}, [volume]);

	return (
		<View style={styles.container}>
			<View style={styles.mainControls}>
				<View style={styles.topRow}>
					<PlayButton onPlay={onPlay} onStop={onStop} />
					<Text style={styles.beatName}>{beat.title}</Text>
					<PlayerExpandButton isExpanded={isExpanded} onPress={handleExpandPress} />
				</View>
				<ProgressBar progress={0.5} />

			</View>

			<Animated.View style={[styles.auxiliaryControls, { height: heightAnim }]}>
				{isExpanded && (
					<View style={styles.innerAuxControls}>
						<SliderControl
							tag={'bpm'}
							value={beat.bpm}
							minValue={beat.minBPM}
							maxValue={beat.maxBPM}
							defaultValue={beat.midBPM!}
							onValueChange={onBpmChange}
							customButton={<SliderCustomButton iconName='clock' onPress={() => toggleModal('timer')} />}
							volume={false}

						/>
						<Divider />
						<SliderControl
							tag={'dB'}
							value={volume}
							minValue={0}
							maxValue={100}
							onValueChange={setVolume}
							customButton={<SliderCustomButton iconName='volume-off' />}
							volume={true}

						/>
					</View>
				)}
			</Animated.View>
		</View>
	);
};