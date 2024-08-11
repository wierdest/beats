import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { BasicModal } from '../BasicModal';


export const ModalAbout = () => {

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