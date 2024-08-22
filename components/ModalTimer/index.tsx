import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { createStyles } from './styles';
import { BasicModal } from '../BasicModal';
import { BasicButton } from '../BasicButton';
import { useTheme } from '@/contexts/ThemeContext';
import { useBeat } from '@/contexts/BeatContext';
import { useModal } from '@/contexts/ModalContext';

export const ModalTimer = () => {
  const [duration, setDuration] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loops, setLoops] = useState<number>(0);

  const { beat, durationSecs, play } = useBeat(); // Access play function
  const {toggleModal} = useModal()

  const { isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  const handleDurationChange = (text: string) => {
    if (!isNaN(Number(text)) && Number(text) >= 0) {
      setError(null);
    }

    const durationNumber = Number(text);
    setLoops(Math.round(durationNumber / durationSecs));
    setDuration(text);
  };

  const handleSetTimer = () => {
    const durationNumber = Number(duration);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }
    play(loops);
    toggleModal(undefined)
  };

  return (
    <BasicModal modal={'timer'}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Beat is about {durationSecs} seconds long.</Text>
        <Text style={styles.modalText}>Beat is {beat.signature} and has got {beat.bars} bars.</Text>
        <Text style={styles.modalText}>How many seconds do you want the beat to loop?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={duration}
          onChangeText={handleDurationChange}
          placeholder={`Enter duration in seconds (min: ${durationSecs} seconds)`}
        />
        {loops > 0 && (
          <Text style={styles.modalText}>
            Beat will loop {loops} {loops > 1 ? "times" : "time"}.
          </Text>
        )}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <BasicButton title="Set Timer" onPress={handleSetTimer} />
      </View>
    </BasicModal>
  );
};
