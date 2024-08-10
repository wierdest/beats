import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { BasicModal } from '../BasicModal';


export const ModalSettings = () => {

	return (

        <BasicModal
            modal={'settings'}
            >
                <Text style={styles.modalText}>SETTINGS!</Text
                
                >

        </BasicModal>

    );
};