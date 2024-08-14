import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { SliderChevronButton } from '../SliderChevronButton';
import { Slider } from '../Slider';

export interface SliderControlProps {
	value: number;
	minValue: number;
	maxValue: number;
	tag?: string;
	onValueChange: (value: number) => void;
	customButton?: ReactNode;
	volume?: boolean;
}

export const SliderControl = ({ value, minValue, maxValue, tag, onValueChange, customButton, volume }: SliderControlProps) => {
	
	const handleValueChange = (delta: number) => {
		const newValue = Math.max(minValue, Math.min(maxValue, value + delta));
		onValueChange(newValue);
	};
	return (
		<View style={styles.container}>
			<SliderChevronButton direction='left' onPress={() => handleValueChange(-1)} />
			<Slider
				value={value}
				minValue={minValue}
				maxValue={maxValue}
				onValueChange={onValueChange}
				tag={tag}
				volume={volume}
			/>
			<SliderChevronButton direction='right' onPress={() => handleValueChange(1)} />
				{customButton}
		</View>
	);
};
