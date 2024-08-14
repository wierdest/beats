import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
import { BasicModal } from '../BasicModal';
import { useTheme } from '@/contexts/ThemeContext';


export const ModalAbout = () => {
    const { isDarkMode } = useTheme();
	const styles = createStyles(isDarkMode);

    const handleEmailPress = () => {
        Linking.openURL('mailto:andrlzpt@protonmail.com');
    };

	return (

        <BasicModal modal={'about'}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Code & Beats by</Text>
                <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.emailText}>andrlzpt@protonmail.com</Text>
                </TouchableOpacity>
            </View>
        </BasicModal>

    );
};