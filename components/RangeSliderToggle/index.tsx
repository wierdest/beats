import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Animated, PanResponder, LayoutChangeEvent } from 'react-native';
import { styles } from './styles';
import { SliderButtonProps } from '../SliderButton';

type RangeSliderToggle = 'min' | 'max'

interface RangeSliderToggleProps extends SliderButtonProps {
    kind: RangeSliderToggle
}

export const RangeSliderToggle = ({ kind, initialPos, value, minValue, maxValue, containerWidth, onValueChange }: RangeSliderToggleProps) => {
    // hardcoded the buttonWidth, I know...
    const buttonWidth = 32;
    const pan = useRef(new Animated.Value(initialPos)).current;
    const initialPosRef = useRef(initialPos);
    const minValueRef = useRef(minValue)
    const maxValueRef = useRef(maxValue)


    useEffect(() => {
        
        minValueRef.current = minValue
        maxValueRef.current = maxValue

	}, [minValue, maxValue])

    // pan responder responsible for handling user interaction
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
               
                Animated.timing(scaleAnim, {
                    toValue: 1.5,
                    duration: 50,
                    useNativeDriver: true,
                }).start();

                let newX = Math.min(Math.max(initialPosRef.current + gestureState.dx, 0), containerWidth - buttonWidth);                
                
                const percentage = (newX / (containerWidth - buttonWidth)) * 100;

                const newValue = Math.round((percentage / 100) * (maxValue - minValue) + minValue);

                if(kind === 'min') {
                    if(newValue >= maxValueRef.current - buttonWidth) {
                        return;
                    }
                } else {
                    if(newValue <= minValueRef.current + buttonWidth) {
                        return;
                    }
                }
                pan.setValue(newX);
                onValueChange(newValue);
            
                
            },
            onPanResponderEnd(e, gestureState) {

                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                }).start();


                initialPosRef.current = Math.min(initialPosRef.current + gestureState.dx, containerWidth - buttonWidth);
            },
        })
    ).current;


    const scaleAnim = useRef(new Animated.Value(1)).current;
    const buttonScale = scaleAnim.interpolate({
        inputRange: [1, 1.5],
        outputRange: [1, 1.5],
    });


	return (
        <Animated.View
            style={[styles.button, { transform: [{ translateX: pan }, { scale: buttonScale }] }]}
            {...panResponder.panHandlers}
        >
        </Animated.View>
    );
};

