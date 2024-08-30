import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { createStyles } from './styles';
import { useTheme } from '@/contexts/ThemeContext';
import { globalColors } from '@/app/colors';

interface SettingsSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const SettingsSwitch = ({ label, value, onValueChange }: SettingsSwitchProps) => {
    const { isDarkMode, toggleTheme   } = useTheme();
    const styles = createStyles(isDarkMode);

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: 'gray', true: '#ddd' }}
        thumbColor={value ? globalColors.accent : '#f4f3f4'}
      />
    </View>
  );
};


