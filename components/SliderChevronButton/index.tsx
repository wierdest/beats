import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Direction = 'left' | 'right'
	
interface SliderChevronButtonProps extends TouchableOpacityProps {
	direction: Direction;
}

export const SliderChevronButton = ({ direction, ...props }: SliderChevronButtonProps) => {
	return (
		<TouchableOpacity {...props } style={styles.chevronButton}>
			<MaterialCommunityIcons 
			name={direction === 'left' ? "chevron-left" : "chevron-right"}
			size={32} color="black" />
		</TouchableOpacity>
	);
};