import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FilterChipProps = {
	label: string;
	onClear: () => void;
};

export const FilterChip = ({ label, onClear }: FilterChipProps) => {
	return (
		<View style={styles.chip}>
		  <Text style={styles.label}>{label}</Text>
		  <TouchableOpacity onPress={onClear} style={styles.clearButton}>
			<MaterialCommunityIcons name="close-circle" size={20} color="black" />
		  </TouchableOpacity>
		</View>
	);
};