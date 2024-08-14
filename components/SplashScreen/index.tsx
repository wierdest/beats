import { styles } from './sytles'; 
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withRepeat } from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';

export const SplashScreenComponent = ({ onFinish }: { onFinish: () => void }) => {
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);
    const translateY = useSharedValue(0);
  
    useEffect(() => {
      SplashScreen.preventAutoHideAsync();

      opacity.value = withTiming(0, { duration: 1200 }, () => onFinish());
  
      translateY.value = withRepeat(
        withSpring(-30, { damping: 1, stiffness: 120 }),
        -1, // Infinite repeat
        true // Reverse animation
      );
  
      // Hide splash screen after animation
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 1200);
    }, []);
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [
          { translateY: translateY.value },
        ],
      };
    });
  
    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.text}>BEATS</Text>
      </Animated.View>
    );
  };