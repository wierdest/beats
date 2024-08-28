import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { createStyles } from './styles';
import { BasicModal } from '../BasicModal';
import { useTheme } from '@/contexts/ThemeContext';
import { Divider } from '../Divider';


export const ModalAbout = () => {
    const { isDarkMode } = useTheme();
	const styles = createStyles(isDarkMode);

    const handleEmailPressAndre = () => {
        Linking.openURL('mailto:andrlzpt@protonmail.com');
    };
    const handleEmailPressMiguel = () => {
        Linking.openURL('mailto:guelferreirar@gmail.com');
    };

	return (

        <BasicModal modal={'about'}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>Code by</Text>
                <TouchableOpacity onPress={handleEmailPressMiguel}>
                    <Text style={styles.emailText}>guelferreirar@gmail.com</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEmailPressAndre}>
                    <Text style={styles.emailText}>andrlzpt@protonmail.com</Text>
                </TouchableOpacity>
                <Divider/>
                <Text style={styles.modalText}>Beats by</Text>
                <TouchableOpacity onPress={handleEmailPressAndre}>
                    <Text style={styles.emailText}>andrlzpt@protonmail.com</Text>
                </TouchableOpacity>
            </View>
        </BasicModal>

    );
};