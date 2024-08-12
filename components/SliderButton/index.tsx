import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { styles } from './styles';
import { SliderControlProps } from '../SliderControl';
import { VolumeManager } from 'react-native-volume-manager';

export interface SliderButtonProps extends SliderControlProps {
	containerWidth: number;
	initialPos: number;
}

export const SliderButton = ({ value, initialPos, minValue, maxValue, tag, containerWidth, onValueChange, volume }: SliderButtonProps) => {
	// hardcoded the buttonWidth, I know...
	const buttonWidth = 32;
	const pan = useRef(new Animated.Value(initialPos)).current;
	const initialPosRef = useRef(initialPos);

	// this is a flag to ignore the useEffect in the value for when the slider is updated via checvron buttons
	const [dragging, setDragging] = useState(false);

	// pan responder responsible for handling user interaction
	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (e, gestureState) => {
				setDragging(true);

				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 50,
					useNativeDriver: true,
				}).start();
				const newX = Math.min(Math.max(initialPosRef.current + gestureState.dx, 0), containerWidth - buttonWidth);
				const percentage = (newX / (containerWidth - buttonWidth)) * 100;
				const newValue = Math.round((percentage / 100) * (maxValue - minValue) + minValue);
				pan.setValue(newX);
				adjustVolume(newValue);
				onValueChange(newValue);

			},
			onPanResponderEnd(e, gestureState) {
				setDragging(false);

				Animated.timing(scaleAnim, {
					toValue: 0,
					duration: 50,
					useNativeDriver: true,
				}).start();


				initialPosRef.current = Math.min(initialPosRef.current + gestureState.dx, containerWidth - buttonWidth);
			},
		})
	).current;

	const adjustVolume = (volumeLevel: number) => {
		VolumeManager.setVolume(volumeLevel / 100); // Update the volume
	};


	useEffect(() => {
        if(volume) {
            const volumeListener = VolumeManager.addVolumeListener((result) => {
				setDragging(false)
                const volume = Math.round(result.volume * 100); 
                // const newX = ((volume - minValue) / (maxValue - minValue)) * (containerWidth - buttonWidth);
				// pan.setValue(newX);
				onValueChange(volume);
                
				
            });
            return () => {
            volumeListener.remove();
            }; 
        }
	}, []);

	useEffect(() => {

		if (!dragging) {
			const newX = ((value - minValue) / (maxValue - minValue)) * (containerWidth - buttonWidth);
			initialPosRef.current = newX
			pan.setValue(newX)
		}
	}, [value])


	const scaleAnim = useRef(new Animated.Value(0)).current;
	const bubbleScale = scaleAnim.interpolate({
		inputRange: [0, 2],
		outputRange: [0, 2],
	});


	return (
		<Animated.View
			style={[styles.button, { transform: [{ translateX: pan }] }]}
			{...panResponder.panHandlers}
		>

			<Animated.View style={[styles.bubble, { transform: [{ scale: bubbleScale }] }]}>
				<Text style={styles.bubbleText}>{value + ' ' + tag}</Text>
				<View style={styles.tail} />
			</Animated.View>


			<TouchableOpacity >
				<Text style={styles.value}>{value}</Text>
				{tag && <Text style={styles.tag}>{tag}</Text>}
			</TouchableOpacity>
		</Animated.View>
	);
};

