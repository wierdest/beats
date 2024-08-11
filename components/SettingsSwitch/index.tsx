import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { styles } from './styles';

interface SettingsSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const SettingsSwitch = ({ label, value, onValueChange }: SettingsSwitchProps) => {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: 'gray', true: '#ddd' }}
        thumbColor={value ? 'red' : '#f4f3f4'}
      />
    </View>
  );
};


