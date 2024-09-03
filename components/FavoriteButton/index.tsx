import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useTheme } from '@/contexts/ThemeContext';

interface FavoriteButtonProps {
    animate?: boolean;
    size?: number;
    selected: boolean;
    onPress: () => void;
    heartBorderColor: string
};

export const FavoriteButton = ({ animate, size, selected, onPress, heartBorderColor }: FavoriteButtonProps) => {
    const { globalColors } = useTheme();

    const spinValue = useRef(new Animated.Value(0)).current;

    // Trigger animation when `selected` prop changes
    useEffect(() => {
        if (animate) {
            // Reset the spin value
            spinValue.setValue(0);

            // Define the spin animation
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [selected, animate]);

    const toggleFavorite = () => {
        onPress(); 
    };
	// interpolação para o spin
	const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

	return (
		<TouchableOpacity style={styles.heartButton} onPress={toggleFavorite}>
			<Animated.View style={{ transform: [{ rotate: spin }] }}>
                <MaterialCommunityIcons
                    name={selected ? "heart" : "heart-outline"}
                    size={size ?? 24}
                    color={selected ? globalColors.accent : heartBorderColor }
                />
            </Animated.View>
		</TouchableOpacity>
	);
};