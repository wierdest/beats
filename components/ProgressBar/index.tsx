import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { styles } from './styles';
import { useBeat } from '@/contexts/BeatContext';
import { useTheme } from '@/contexts/ThemeContext';

export const ProgressBar = () => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const { playing, durationMillis } = useBeat();
  const { globalColors } = useTheme();

  useEffect(() => {
    if (playing) {
      Animated.loop(
        Animated.timing(animatedWidth, {
          toValue: 1, 
          duration: durationMillis, 
          useNativeDriver: false, 
        }),
        {
          resetBeforeIteration: true,
        }
      ).start();
    } else {
  
      animatedWidth.setValue(0);
    }
    return () => animatedWidth.stopAnimation();
  }, [playing, durationMillis]);

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBarFill,
          {
            backgroundColor: globalColors.accent,
          },
          {
            width: animatedWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};
