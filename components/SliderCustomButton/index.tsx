import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = 'volume-high' | 'volume-off' | 'map-clock'

interface SliderCustomButton extends TouchableOpacityProps {
	iconName: IconName;
}

export const SliderCustomButton = ({ iconName, ...props }: SliderCustomButton) => {
	return (
		<TouchableOpacity {...props }style={styles.button}>
			<MaterialCommunityIcons 
			name={iconName}
			size={32} color="white" />
		</TouchableOpacity>
	);
};