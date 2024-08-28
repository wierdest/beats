import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { createStyles } from './styles';
import { BasicModal } from '../BasicModal';
import { BasicButton } from '../BasicButton';
import { useTheme } from '@/contexts/ThemeContext';
import { useBeat } from '@/contexts/BeatContext';
import { useModal } from '@/contexts/ModalContext';

export const ModalTimer = () => {
  const [duration, setDuration] = useState<string>('');
  const [silence, setSilence] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [loops, setLoops] = useState<number>(0);
  const [delay, setDelay] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);

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

  const handleSilenceChange = (text: string) => {
    if (!isNaN(Number(text)) && Number(text) >= 0) {
      setError(null);
    }
    setSilence(text);
  };


  const handleSetTimer = () => {
    const durationNumber = Number(duration);
    if (isNaN(durationNumber) || durationNumber <= 0) {
      setError('Please enter a valid positive number for the duration.');
      return;
    }
    const silenceNumber = Number(silence);

    if(isNaN(silenceNumber)) {
      setError('Please enter a valid positive number for the silence, or leave it blank.')
      return;
    }

    if(silenceNumber > 0) {
      setDelay(silenceNumber);
      setRemainingTime(silenceNumber);
      return;
    }
    // play immediately
    play(loops);
    toggleModal(undefined);
  };

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        play(loops);
        toggleModal(undefined);
      }, delay * 1000);

      const countdown = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdown);
      }; 
    }
  }, [delay]);

  return (
    <BasicModal modal={'timer'}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Beat is about {durationSecs} seconds long.</Text>
        <Text style={styles.modalText}>Beat is {beat.signature} and has got {beat.bars} {beat.bars > 1 ? 'bars' : 'bar'}.</Text>
        
        <Text style={styles.modalText}>How many seconds do you want the beat to loop before stopping? min: {durationSecs} {durationSecs > 1 ? 'seconds' : 'second'}. </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={duration}
          onChangeText={handleDurationChange}
          placeholder={`Enter duration in seconds`}
        />
        {loops > 0 && (
          <>
            <Text style={styles.modalText}>
              Beat will loop {loops} {loops > 1 ? "times" : "time"}.
            </Text>

            <Text style={styles.modalText}>How many seconds to wait before starting the beat? Leave it blank to start right away.</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={silence}
              onChangeText={handleSilenceChange}
              placeholder={`Enter duration in seconds`}
            />
          </>
        )}
        {
          delay > 0 && 
          <>
            <Text style={styles.modalText}>
              Beat will start automatically in {remainingTime} {remainingTime > 1 ? 'seconds' : 'second'}.
            </Text>
            <Text style={styles.modalText}>
              Close the modal to cancel it.
            </Text>
          </>
        }
        {
          delay <= 0 &&
          <BasicButton title="PLAY!" onPress={handleSetTimer} />
        }
        
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </BasicModal>
  );
};
