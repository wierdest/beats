import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { BasicModal } from '../BasicModal';


export const ModalHelpOut = () => {
	return (
        <BasicModal
            modal={'helpout'}
            >
                <Text style={styles.modalText}>HELP OUT!</Text
                
                >
        </BasicModal>

    );
};