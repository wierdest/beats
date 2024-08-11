import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { BasicModal } from '../BasicModal';
import { BasicButton } from '../BasicButton';


export const ModalTimer = () => {
    const [duration, setDuration] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
  
    const handleDurationChange = (text: string) => {
      setDuration(text);
      if (!isNaN(Number(text)) && Number(text) >= 0) {
        setError(null);
      }
    };
  
    const handleSetTimer = () => {
      const durationNumber = Number(duration);
      if (isNaN(durationNumber) || durationNumber <= 0) {
        setError('Please enter a valid positive number.');
        return;
      }
      console.log(`Timer set for ${durationNumber} seconds.`);
    };
  
    return (
      <BasicModal modal={'timer'}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>How many seconds do you want the beat to loop?</Text>
          
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={handleDurationChange}
            placeholder="Enter duration in seconds"
          />
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <BasicButton title="Set Timer" onPress={handleSetTimer} />
        </View>
      </BasicModal>
    );
};