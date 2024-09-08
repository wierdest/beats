import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Animated, PanResponder, LayoutChangeEvent, ImageBackground, ImageStyle } from 'react-native';
import { styles } from './styles';
import { SliderButtonProps } from '../SliderButton';
import { useTheme } from '@/contexts/ThemeContext';
import { useFilter } from '@/contexts/FilterContext';

type RangeSliderButton = 'min' | 'max'

interface RangeSliderButtonProps extends SliderButtonProps {
    kind: RangeSliderButton
}

const BEET = require('@/assets/images/button-image.png')


export const RangeSliderButton = ({ kind, initialPos, value, minValue, maxValue, containerWidth, onValueChange }: RangeSliderButtonProps) => {
    // hardcoded the buttonWidth, I know...
    const buttonWidth = 32;
    const pan = useRef(new Animated.Value(initialPos)).current;
    const initialPosRef = useRef(initialPos);
    const minValueRef = useRef(minValue)
    const maxValueRef = useRef(maxValue)
    const { filters } = useFilter();

    const { globalColors } = useTheme();

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const buttonScale = scaleAnim.interpolate({
        inputRange: [1, 1.5],
        outputRange: [1, 1.5],
    });


    // Levar em consideração o context tempo para atualizar 
    useEffect(() => {
        if (filters.tempo === '50-280') {
            const initialX = kind === 'min' ? 0 : containerWidth - buttonWidth;
            Animated.spring(pan, {
                toValue: initialX,
                useNativeDriver: false, // Set to false
            }).start();
            initialPosRef.current = initialX;
        }
    }, [filters.tempo]);


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
                    useNativeDriver: false,
                }).start();

                let newX = Math.min(Math.max(initialPosRef.current + gestureState.dx, 0), containerWidth - buttonWidth);

                const percentage = (newX / (containerWidth - buttonWidth)) * 100;

                const newValue = Math.round((percentage / 100) * (maxValue - minValue) + minValue);

                if (kind === 'min') {
                    if (newValue >= maxValueRef.current - buttonWidth) {
                        return;
                    }
                } else {
                    if (newValue <= minValueRef.current + buttonWidth) {
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
                    useNativeDriver: false,
                }).start();


                initialPosRef.current = Math.min(initialPosRef.current + gestureState.dx, containerWidth - buttonWidth);
            },
        })
    ).current;

    const imageStyle : ImageStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: kind === 'min' ? [{ scaleX: -1 }] : [],
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

