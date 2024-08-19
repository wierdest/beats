import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { styles } from './styles';
import { useBeat } from '@/contexts/BeatContext';

export const ProgressBar = () => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const { playing, durationMillis } = useBeat();

  useEffect(() => {
    if (playing) {
      Animated.loop(
        Animated.timing(animatedWidth, {
          toValue: 1, // Animate to 1 (100%)
          duration: durationMillis, // Duration of the animation
          useNativeDriver: false, // Width animation does not support native driver
        }),
        {
          resetBeforeIteration: true, // Reset to 0 before starting the next iteration
        }
      ).start();
    } else {
      // Reset the progress bar to 0
      animatedWidth.setValue(0);
    }

    // Clean up animation when not playing
    return () => animatedWidth.stopAnimation();
  }, [playing, durationMillis]);

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View
        style={[
          styles.progressBarFill,
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
