import React, { useEffect, useRef, useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { styles } from './styles';
import { SliderButton } from '../SliderButton';
import { SliderControlProps } from '../SliderControl';

export const Slider = ({ value, minValue, maxValue, tag, onValueChange, volume }: SliderControlProps) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const initialPos = useRef<number>(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (containerWidth > 0) {
            initialPos.current = ((value - minValue) / (maxValue - minValue)) * (containerWidth - 32);
            setLoaded(true)
        }
    },[containerWidth])

    const handleLayout = (event: LayoutChangeEvent) => {
        setContainerWidth(event.nativeEvent.layout.width);
    };

    return (
        <View style={styles.slider} onLayout={handleLayout}>
            {loaded &&  (
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
            )}
            <View style={[styles.notch, { transform: [{ translateX: initialPos.current }] }]}>

            </View>

        </View>
    );
};
