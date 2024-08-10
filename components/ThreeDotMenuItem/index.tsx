import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ThreeDotMenuIconName = 'handshake' | 'cog' | 'information-outline'

interface ThreeDotMenuItemProps extends TouchableOpacityProps {
	label: string;
	iconName: ThreeDotMenuIconName;
};

export const ThreeDotMenuItem = ({ label, iconName, ...props }: ThreeDotMenuItemProps) => {

	return (
		<TouchableOpacity style={styles.menuItem} {...props}>
			<MaterialCommunityIcons name={iconName} size={18} color="black" />
			<Text style={styles.label}>{label}</Text>
	  	</TouchableOpacity>
	);
};