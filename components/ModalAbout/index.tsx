import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { BasicModal } from '../BasicModal';


export const ModalAbout = () => {

	return (

        <BasicModal
            modal={'about'}
            >
                <Text style={styles.modalText}>ABOUT!</Text
                
                >

        </BasicModal>

    );
};