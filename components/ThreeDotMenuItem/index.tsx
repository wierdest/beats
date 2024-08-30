import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { createStyles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { darkTheme, lightTheme } from '@/app/colors';

type ThreeDotMenuIconName = 'handshake' | 'cog' | 'information-outline'

interface ThreeDotMenuItemProps extends TouchableOpacityProps {
	label: string;
	iconName: ThreeDotMenuIconName;
};

export const ThreeDotMenuItem = ({ label, iconName, ...props }: ThreeDotMenuItemProps) => {
	const { isDarkMode, toggleTheme   } = useTheme();
    const styles = createStyles(isDarkMode);

	return (
		<TouchableOpacity style={styles.menuItem} {...props}> 
			<MaterialCommunityIcons name={iconName} size={18} color={isDarkMode ? darkTheme.accent : lightTheme.accent } />
			<Text style={styles.label}>{label}</Text>
	  	</TouchableOpacity>
	);
};