import React, { useEffect, useRef, useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { styles } from './styles';
import { SliderButton } from '../SliderButton';
import { SliderControlProps } from '../SliderControl';

export const Slider = ({ value, minValue, maxValue, defaultValue, tag, onValueChange, volume }: SliderControlProps) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [loaded, setLoaded] = useState(false);
    const calculateInitialPos = (value: number) => {
        return ((value - minValue) / (maxValue - minValue)) * (containerWidth - 40);

    }
    const initialPos = useRef<number>(0);

    const handleLayout = (event: LayoutChangeEvent) => {
        setContainerWidth(event.nativeEvent.layout.width);
    };

     useEffect(() => {
        if (containerWidth > 0) {
            initialPos.current = calculateInitialPos(volume ? value : defaultValue!);
            setLoaded(true)
        }
    },[containerWidth])

    useEffect(() => {
        if(!volume) {
            if (containerWidth > 0) {
                initialPos.current = calculateInitialPos(volume ? value : defaultValue!);
            }
        }
        console.log('SLIDER DEFAULT VALUE CHANGED: ', defaultValue)
       
    },[defaultValue])

    // otimização sliders
    // useEffect(() => {
    //     if (containerWidth > 0) {
    //         if (volume) {
    //             initialPos.current = calculateInitialPos(value);
    //         } else {
    //             initialPos.current = calculateInitialPos(defaultValue!);
    //         }
    //         setLoaded(true);
    //     }
    // }, [containerWidth, volume, value, defaultValue]);

    return (
        <View style={styles.slider} onLayout={handleLayout}>
            {loaded &&  (
                <>
                 <SliderButton
                    value={value}
                    initialPos={initialPos.current}
                    minValue={minValue}
                    maxValue={maxValue}
                    onValueChange={onValueChange}
                    tag={tag}
                    containerWidth={containerWidth}
                    volume={volume}
                    />
                    <View style={[styles.notch, { transform: [{ translateX: initialPos.current }] }]}/>
                </>
            )}
        
        </View>
    );
};
