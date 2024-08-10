import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { BasicModal } from '../BasicModal';


export const ModalTimer = () => {

	return (

        <BasicModal
            modal={'timer'}
            >
                <Text style={styles.modalText}>TIMER!</Text
                
                >

        </BasicModal>

    );
};