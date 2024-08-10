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
	customButton?: ReactNode
}

export const SliderControl = ({ value, minValue, maxValue, tag, onValueChange, customButton }: SliderControlProps) => {
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
			/>
			<SliderChevronButton direction='right' onPress={() => handleValueChange(1)} />
				{customButton}
		</View>
	);
};
