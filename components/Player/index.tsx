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
import { useBeat } from '@/contexts/BeatContext';

export const Player = () => {
	const { isDarkMode } = useTheme();
	const styles = createStyles(isDarkMode);

	const { toggleModal } = useModal();

	const [volume, setVolume] = useState(35);
	const [originalVolume, setOriginalVolume] = useState<number | null>(null);
	const [isVolumeMuted, setIsVolumeMuted] = useState(false);

	const { beat, play, stop, changeBpm, reloadedBeat, loopLimitRef, numberOfLoops } = useBeat();
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

	useEffect(() => {
		setIsExpanded(false);
	}, [reloadedBeat]);

	// Fetch volume & Setup volume listener (not using the listener because it breaks on samsung devices)
	useEffect(() => {
		const fetchVolume = async () => {

			try {
				const { volume } = await VolumeManager.getVolume();
				setVolume(Math.round(volume * 100));
				setIsVolumeMuted(volume === 0);
				setOriginalVolume(volume === 0 ? originalVolume : volume);

			} catch (e) {
				console.log('Erro em buscar volume do sistema com VolumeManager')
			}
		
		};
		fetchVolume();
	}, []);

	const adjustVolume = (volumeLevel: number) => {
		VolumeManager.setVolume(volumeLevel / 100);
		VolumeManager.showNativeVolumeUI({ enabled: true });
	};

	const handleMuteToggle = () => {
		if (isVolumeMuted) {
			if (originalVolume !== null) {
				adjustVolume(originalVolume);
				setVolume(originalVolume);
			}
			setIsVolumeMuted(false);
		} else {
			setOriginalVolume(volume);
			adjustVolume(0);
			setVolume(0);
			setIsVolumeMuted(true);
		}
	};

	useEffect(() => {
		adjustVolume(volume);
	}, [volume]);

	useEffect(() => {
		if (!isVolumeMuted) {
			adjustVolume(volume);
		}
	}, [volume, isVolumeMuted]);

	const getVolumeIcon = () => {
		return volume === 0 ? 'volume-off' : 'volume-high';
	};

	const handleModalTimerButton = () => {
		stop()
		toggleModal('timer')
	}

	return (
		<View style={styles.container}>
			<View style={styles.mainControls}>
				<View style={styles.topRow}>
					<PlayButton onPlay={play} onStop={stop} />
					<Text style={styles.beatName}>{beat.title}</Text>
					<PlayerExpandButton isExpanded={isExpanded} onPress={handleExpandPress} />
				</View>

				<ProgressBar />
			</View>

			{
				loopLimitRef.current != undefined && <Text>{numberOfLoops + "/" + loopLimitRef.current}</Text>
			}

			<Animated.View style={[styles.auxiliaryControls, { height: heightAnim }]}>
				{isExpanded && (
					<View style={styles.innerAuxControls}>
						<SliderControl
							tag={'bpm'}
							value={beat.bpm}
							minValue={beat.minBPM}
							maxValue={beat.maxBPM}
							defaultValue={beat.midBPM!}
							onValueChange={changeBpm}
							customButton={<SliderCustomButton iconName='clock' onPress={handleModalTimerButton} />}
							volume={false}
						/>
						<Divider />
						<SliderControl
							tag={'dB'}
							value={volume}
							minValue={0}
							maxValue={100}
							onValueChange={setVolume}
							customButton={<SliderCustomButton iconName={getVolumeIcon()} onPress={handleMuteToggle} />}
							volume={true}
						/>

					</View>
				)}
			</Animated.View>
		</View>
	);
};