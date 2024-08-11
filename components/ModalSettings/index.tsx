import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { BasicModal } from '../BasicModal';
import { SettingsSwitch } from '../SettingsSwitch';


export const ModalSettings = () => {
    
    const [darkMode, setDarkMode] = useState(false);
    const [keepScreenOn, setKeepScreenOn] = useState(false);
    const [trimEnd, setTrimEnd] = useState(false);


    const handleDarkModeToggle = () => {
        setDarkMode(previousState => !previousState);
    };

    const handleKeepScreenOnToggle = () => {
        setKeepScreenOn(previousState => !previousState);
    };

	return (

        <BasicModal modal={'settings'}>
            <View style={styles.modalContent}>                
                <SettingsSwitch
                    label="Dark Mode"
                    value={darkMode}
                    onValueChange={setDarkMode}
                />
                
                <SettingsSwitch
                    label="Keep Screen On"
                    value={keepScreenOn}
                    onValueChange={setKeepScreenOn}
                />

                <SettingsSwitch
                    label="Trim end"
                    value={keepScreenOn}
                    onValueChange={setTrimEnd}
                />
                </View>
      </BasicModal>

    );
};