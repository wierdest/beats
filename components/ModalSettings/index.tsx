import React, { useState } from 'react';
import { Text, ToastAndroid, View } from 'react-native';
import { createStyles } from './styles';
import { BasicModal } from '../BasicModal';
import { SettingsSwitch } from '../SettingsSwitch';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BasicButton } from '../BasicButton';
import { useDatabase } from '@/contexts/DatabaseContext';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { useModal } from '@/contexts/ModalContext';


export const ModalSettings = () => {
    const [keepScreenOn, setKeepScreenOn] = useState(false);
    const [trimEnd, setTrimEnd] = useState(false);

    const { isDarkMode, toggleTheme   } = useTheme();
    const [isDark, setIsDark] = useState<boolean>(isDarkMode);
    const styles = createStyles(isDarkMode);
    const { toggleModal } = useModal();

    const handleDarkModeToggle = async () => {
        try {
            setIsDark(!isDark)
            toggleTheme(); 
        } catch (error) {
            console.error('Failed to save dark mode setting', error);
        }
    };

    const handleResetDb = async () => {
        try {
            await clearDb();
            ToastAndroid.show('DB reset! Restart the app, please!', ToastAndroid.LONG);
        } catch (e) {
            console.log('Error clearing the DB');
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
                    value={isDark}
                    onValueChange={handleDarkModeToggle}
                />
                
                <SettingsSwitch
                    label="Keep Screen On"
                    value={keepScreenOn}
                    onValueChange={handleKeepScreenOnToggle}
                />

                <BasicButton title='Edit Color Scheme' onPress={() => toggleModal('color')} />
                {/* <SettingsSwitch
                    label="Trim end"
                    value={trimEnd}
                    onValueChange={setTrimEnd}
                /> */}

                 <BasicButton
                    title='Reset DB'
                    onPress={handleResetDb} /> 
                </View>
      </BasicModal>

    );
};