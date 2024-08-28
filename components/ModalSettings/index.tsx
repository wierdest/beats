import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createStyles } from './styles';
import { BasicModal } from '../BasicModal';
import { SettingsSwitch } from '../SettingsSwitch';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BasicButton } from '../BasicButton';
import { useDatabase } from '@/contexts/DatabaseContext';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';


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

    const { clearDb } = useDatabase();

    const handleKeepScreenOnToggle = (newValue: boolean) => {
        setKeepScreenOn(newValue);
        if(newValue) {
            try {
                activateKeepAwakeAsync();
            } catch(e) {
                console.log('Erro trying to activate the screen')
                setKeepScreenOn(false);
            }
        } else {
            deactivateKeepAwake();
        }
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
                    onValueChange={handleKeepScreenOnToggle}
                />

                {/* <SettingsSwitch
                    label="Trim end"
                    value={trimEnd}
                    onValueChange={setTrimEnd}
                /> */}

                {/* <BasicButton
                    title='Clear DB'
                    onPress={clearDb} /> */}
                </View>
      </BasicModal>

    );
};