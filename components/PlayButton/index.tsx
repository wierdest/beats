import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useBeat } from '@/contexts/BeatContext';

interface PlayButtonProps {
    onPlay: () => void;
	onStop: () => void;
}

export const PlayButton = ({onPlay, onStop} : PlayButtonProps) => {

    const {playing} = useBeat();
	const [isPlaying, setIsPlaying] = useState(playing);
    const [spinValue] = useState(new Animated.Value(0));
	const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
	
    const togglePlay = () => {
        if(isPlaying) {
            onStop()
        }  else {
            onPlay()
        }
        setIsPlaying(prev => !prev);

        Animated.timing(spinValue, {
            toValue: isPlaying ? 0 : 1,
            duration: 300, // Duration of the spin animation
            useNativeDriver: true,
        }).start(() => {
            // Reset the spin value after animation completes
            if (isPlaying) {
                spinValue.setValue(0);
            }
        });
    };

    useEffect(() => {

        setIsPlaying(playing);

    }, [playing])



    return (
        <TouchableOpacity style={styles.button} onPress={togglePlay}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <MaterialCommunityIcons
                    name={isPlaying ? 'stop' : 'play'}
                    size={60}
                    color="white"
                />
            </Animated.View>
        </TouchableOpacity>
    );
};