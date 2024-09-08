import React, { ReactNode } from 'react';
import { View , Text} from 'react-native';
import { createStyles } from './styles';
import { SliderChevronButton } from '../SliderChevronButton';
import { Slider } from '../Slider';
import { useTheme } from '@/contexts/ThemeContext';

export interface SliderControlProps {
	value: number;
	minValue: number;
	maxValue: number;
	defaultValue?: number;
	tag?: string;
	onValueChange: (value: number) => void;
	customButton?: ReactNode;
	volume?: boolean;
}

export const SliderControl = ({ value, minValue, maxValue, defaultValue, tag, onValueChange, customButton, volume }: SliderControlProps) => {
	
	const handleValueChange = (delta: number) => {
		
		const newValue = Math.max(minValue, Math.min(maxValue, value + delta));
		onValueChange(newValue);
	};
	const { isDarkMode } = useTheme();
	const styles = createStyles(isDarkMode);

	return (
		<View style={styles.outerContainer}>
			<Text style={styles.label}>{value} {tag}</Text>
			<View style={styles.container}>
				<SliderChevronButton direction='left' onPress={() => handleValueChange(-7)} />
				<Slider
					value={value}
					minValue={minValue}
					maxValue={maxValue}
					onValueChange={onValueChange}
					volume={volume}
					defaultValue={defaultValue}
				/>
				<SliderChevronButton direction='right' onPress={() => handleValueChange(7)} />
					{customButton}
			</View>

		</View>
		
	);
};
