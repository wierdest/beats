import React from 'react';
import { View, Animated } from 'react-native';
import { styles } from './styles';


interface ProgressBarProps {
    progress: number; 
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
	const clampedProgress = Math.min(1, Math.max(0, progress));
	return (
		<View style={styles.progressBarContainer}>
			<Animated.View
				style={[
					styles.progressBarFill,
					{ width: `${clampedProgress * 100}%` } // Width as a percentage
				]}
			/>
		</View>
	);
};
