import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import { useTheme } from '@/contexts/ThemeContext';

interface TextButtonProps extends TouchableOpacityProps {
	label: string;
	selected: boolean;
};

export const TextButton = ({ label, selected, ...props }: TextButtonProps) => {

	const {globalColors} = useTheme();

	return (
		<TouchableOpacity style={[styles.textButton, { backgroundColor: selected ? globalColors.accent : 'lightgray'}]} {...props}>
			<Text style={styles.label}>{label}</Text>
	  	</TouchableOpacity>
	);
};