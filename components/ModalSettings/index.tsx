import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createStyles } from './styles';
import { BasicModal } from '../BasicModal';
import { SettingsSwitch } from '../SettingsSwitch';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ModalSettings = () => {

    const [keepScreenOn, setKeepScreenOn] = useState(false);
    const [trimEnd, setTrimEnd] = useState(false);

    const { isDarkMode, toggleTheme   } = useTheme();
    const styles = createStyles(isDarkMode);

    const handleDarkModeToggle = async () => {
        try {
            const newDarkMode = !isDarkMode;
            await AsyncStorage.setItem('isDarkMode', JSON.stringify(newDarkMode));
            toggleTheme(); 
        } catch (error) {
            console.error('Failed to save dark mode setting', error);
        }
    };


    const handleKeepScreenOnToggle = () => {
        setKeepScreenOn(previousState => !previousState);
    };

	return (

        <BasicModal modal={'settings'}>
            <View style={styles.modalContent}>                
                <SettingsSwitch
                    label="Dark Mode"
                    value={isDarkMode}
                    onValueChange={handleDarkModeToggle}
                />
                
                <SettingsSwitch
                    label="Keep Screen On"
                    value={keepScreenOn}
                    onValueChange={setKeepScreenOn}
                />

                <SettingsSwitch
                    label="Trim end"
                    value={trimEnd}
                    onValueChange={setTrimEnd}
                />
                </View>
      </BasicModal>

    );
};