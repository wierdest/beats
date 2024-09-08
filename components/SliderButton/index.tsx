import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder, ImageBackground, ImageStyle } from 'react-native';
import { styles } from './styles';
import { SliderControlProps } from '../SliderControl';
import { VolumeManager } from 'react-native-volume-manager';
import { useTheme } from '@/contexts/ThemeContext';

export interface SliderButtonProps extends SliderControlProps {
	containerWidth: number;
	initialPos: number;
}

const BEET = require('@/assets/images/button-image.png')


export const SliderButton = ({ value, initialPos, minValue, maxValue, containerWidth, onValueChange }: SliderButtonProps) => {
	// hardcoded the buttonWidth, I know...
	const buttonWidth = 32;
	const pan = useRef(new Animated.Value(initialPos)).current;
	const initialPosRef = useRef(initialPos);

	// this is a flag to ignore the useEffect in the value for when the slider is updated via checvron buttons
	const [dragging, setDragging] = useState(false);

	const {globalColors} = useTheme();

	const [panValue, setPanValue] = useState(0);

	// pan responder responsible for handling user interaction
	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (e, gestureState) => {
				setDragging(true);

				Animated.timing(scaleAnim, {
                    toValue: 1.5,
                    duration: 50,
                    useNativeDriver: false,
                }).start();

				const newX = Math.min(Math.max(initialPosRef.current + gestureState.dx, 0), containerWidth - buttonWidth);
				const percentage = (newX / (containerWidth - buttonWidth)) * 100;
				const newValue = Math.round((percentage / 100) * (maxValue - minValue) + minValue);
				setPanValue(newValue);
				pan.setValue(newX);
				onValueChange(newValue);
			},
			onPanResponderEnd(e, gestureState) {
				setDragging(false);

				Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: false,
                }).start();


				initialPosRef.current = Math.min(initialPosRef.current + gestureState.dx, containerWidth - buttonWidth);
			},
		})
	).current;

	useEffect(() => {
		if (!dragging) {
			const newX = ((value - minValue) / (maxValue - minValue)) * (containerWidth - buttonWidth);
			initialPosRef.current = newX
			pan.setValue(newX)
			setPanValue(newX)
		}
	}, [value])


	const scaleAnim = useRef(new Animated.Value(1)).current;
	 const buttonScale = scaleAnim.interpolate({
        inputRange: [1, 1.5],
        outputRange: [1, 1.5],
    });

	const imageStyle : ImageStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
		transform: panValue < containerWidth / 2 ? [{ scaleX: -1 }] : [],
    };


	return (
		<Animated.View
			style={[styles.button, { transform: [{ translateX: pan }, { scale: buttonScale }] }]}
			{...panResponder.panHandlers}
		>
			<ImageBackground
				source={BEET}
				style={imageStyle}
			>
			</ImageBackground>
		</Animated.View>
	);
};

