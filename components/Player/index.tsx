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
import { debounce } from '@/utils';

export const Player = () => {
	const { isDarkMode } = useTheme();
	const styles = createStyles(isDarkMode);

	const { toggleModal } = useModal();

	const [volume, setVolume] = useState(35);
	const [originalVolume, setOriginalVolume] = useState(35);
	const [isVolumeMuted, setIsVolumeMuted] = useState(false);

	const { beat, play, stop, changeBpm, reloadedBeat, loopLimitRef, numberOfLoops } = useBeat();
	const [isExpanded, setIsExpanded] = useState(false);

	const { globalColors } = useTheme()

	const heightAnim = useRef(new Animated.Value(0)).current;

	const handleExpandPress = () => {
		setIsExpanded(prev => !prev);
	};

	useEffect(() => {
		Animated.timing(heightAnim, {
			toValue: isExpanded ? 160 : 0,
			duration: 80,
			useNativeDriver: false,
		}).start();
	}, [isExpanded]);

	useEffect(() => {
		setIsExpanded(false);
	}, [reloadedBeat]);

	const debounceSetVolume = debounce((volumePercent: number) => {
		setVolume(volumePercent);
		setIsVolumeMuted(volumePercent === 0);
	}, 200);

	// Fetch volume & Setup volume listener (not using the listener because it breaks on samsung devices)
	useEffect(() => {
		const fetchVolume = async () => {
			try {
				const { volume } = await VolumeManager.getVolume();
				const volumePercent = Math.round(volume * 100);
				setVolume(volumePercent);
				setIsVolumeMuted(volumePercent === 0);
			} catch (e) {
				console.log('Erro em buscar volume do sistema com VolumeManager');
			}
		};
		fetchVolume();

		const volumeListener = VolumeManager.addVolumeListener(({ volume }) => {
			const volumePercent = Math.round(volume * 100);
			console.log('PRESSED THE VOLUME SYSTEM BUTTON')
			setVolume(volumePercent);
			setIsVolumeMuted(volumePercent === 0);
		});

		return () => {
			volumeListener.remove(); // Cleanup listener on component unmount
		};


	}, []);



	const adjustVolume = (volumeLevel: number) => {
		VolumeManager.setVolume(volumeLevel / 100);
		VolumeManager.showNativeVolumeUI({ enabled: true });
	};

	const handleMuteToggle = () => {
		if (volume > 0) {
			setOriginalVolume(volume);
			setIsVolumeMuted(true);
			setVolume(0);
			adjustVolume(0);
		} else if (volume === 0 && originalVolume !== null) {
			console.log(originalVolume, isVolumeMuted, volume, "Restaurando volume");
			setIsVolumeMuted(false);
			setVolume(originalVolume);
			adjustVolume(originalVolume);
		}
	};

	// nao é necessário 
	// useEffect(() => {
	// 	adjustVolume(volume);
	// }, [volume]);

	useEffect(() => {
		if (!isVolumeMuted) {
			adjustVolume(volume);
		}
	}, [volume, isVolumeMuted]);

	const getVolumeIcon = () => {
		return volume === 0 ? 'volume-off' : 'volume-high';
	};

	const handleModalTimerButton = () => {
		stop();
		toggleModal('timer');
	};



	return (
		<View style={styles.container}>
			<View style={[styles.mainControls, { backgroundColor: globalColors.primary, }]}>
				<View style={styles.topRow}>
					<PlayButton onPlay={play} onStop={stop} style={[{ transform: [{ translateY: -16 }] }]} />
					<Text style={styles.beatName}>{beat ? beat.title : 'No beat selected'}</Text>
					<PlayerExpandButton isExpanded={isExpanded} onPress={handleExpandPress} />
				</View>

				<ProgressBar />
			</View>

			{
				loopLimitRef.current != undefined && <Text>{numberOfLoops + "/" + loopLimitRef.current}</Text>
			}

			<Animated.View style={[styles.auxiliaryControls, { height: heightAnim }]}>
				{beat && isExpanded && (
					<View style={styles.innerAuxControls}>
						<SliderControl
							tag={' BPM'}
							value={beat.bpm}
							minValue={beat.minBPM}
							maxValue={beat.maxBPM}
							defaultValue={beat.midBPM!}
							onValueChange={changeBpm}
							customButton={<SliderCustomButton iconName='map-clock' onPress={handleModalTimerButton} />}
						/>
						<SliderControl
							tag={' DB'}
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