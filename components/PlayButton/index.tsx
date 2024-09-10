import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated, ImageBackground, ViewProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useBeat } from '@/contexts/BeatContext';
import { useTheme } from '@/contexts/ThemeContext';

interface PlayButtonProps extends ViewProps {
    onPlay: () => void;
	onStop: () => void;
}

const BEET = require('@/assets/images/button-image.png')

export const PlayButton = ({onPlay, onStop, ...props} : PlayButtonProps) => {

    const {playing} = useBeat();
    const [spinValue] = useState(new Animated.Value(0));

    const { globalColors } = useTheme();
	const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
	
    const togglePlay = () => {
        if(playing) {
            onStop()
        }  else {
            onPlay()
        }
        animate();
    };

    const animate = () => {
        Animated.timing(spinValue, {
            toValue: playing ? 0 : 1,
            duration: 300, // Duration of the spin animation
            useNativeDriver: true,
        }).start(() => {
            // Reset the spin value after animation completes
            if (playing) {
                spinValue.setValue(0);
            }
        });
    }

    useEffect(() => {
        
        animate()
    }, [playing])

    return (
        <TouchableOpacity onPress={togglePlay} {...props}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <ImageBackground source={BEET} style={[styles.button, { transform: [{ scaleX: playing ? -1 : 1 }] }]}>
                    <MaterialCommunityIcons
                        name={playing ? 'stop' : 'play'}
                        size={32}
                        style={{transform: [{translateX: -10}, {translateY: 9}]}}
                        color='white'
                    />
                </ImageBackground>
            </Animated.View>
        </TouchableOpacity>
    );
};