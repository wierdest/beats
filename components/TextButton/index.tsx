import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TextButtonProps extends TouchableOpacityProps {
	label: string;
	selected: boolean;

	
};

export const TextButton = ({ label, selected, ...props }: TextButtonProps) => {

	return (
		<TouchableOpacity style={[styles.textButton, { backgroundColor: selected ? 'red' : 'lightgray'}]} {...props}>
			<Text style={styles.label}>{label}</Text>
	  	</TouchableOpacity>
	);
};