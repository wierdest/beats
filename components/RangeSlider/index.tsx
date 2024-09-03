import React, { useEffect, useRef, useState } from 'react';
import { View, LayoutChangeEvent, Text } from 'react-native';
import { styles } from './styles';
import { SliderControlProps } from '../SliderControl';
import { RangeSliderToggle } from '../RangeSliderToggle';


interface RangeSliderProps {
    minValue: number;
    maxValue: number;
    onValueChangeMin: (value: number) => void;
    onValueChangeMax: (value: number) => void;
}

export const RangeSlider = ({ minValue, maxValue, onValueChangeMin, onValueChangeMax }: RangeSliderProps) => {
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const initialPosA = useRef<number>(0);
    const initialPosB = useRef<number>(0);

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (containerWidth > 0) {
            initialPosB.current = containerWidth - 16;
            setLoaded(true)
        }
    }, [containerWidth])

    const handleLayout = (event: LayoutChangeEvent) => {
        setContainerWidth(event.nativeEvent.layout.width);

    };

    return (
        <View style={styles.slider} onLayout={handleLayout} >

            {loaded &&
                <>
                    <RangeSliderToggle
                        kind={'min'}
                        value={minValue}
                        initialPos={initialPosA.current}
                        minValue={minValue}
                        maxValue={maxValue}
                        onValueChange={onValueChangeMin}
                        containerWidth={containerWidth}
                    />

                    <RangeSliderToggle
                        kind={'max'}
                        value={maxValue}
                        initialPos={initialPosB.current}
                        minValue={minValue}
                        maxValue={maxValue}
                        onValueChange={onValueChangeMax}
                        containerWidth={containerWidth}
                    />

                </>

            }
        </View>
    );
};
