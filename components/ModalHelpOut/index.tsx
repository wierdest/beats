import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { BasicModal } from '../BasicModal';
import { HelpOutOptButton } from '../HelpOutOptButton';
import Share from 'react-native-share';


export const ModalHelpOut = () => {

    const shareApp = () => {
        const shareOptions = {
          title: 'Compartilhe este app',
          message: 'Confira este app incrível!',
          url: 'https://seuapp.com', // URL do seu app
        };
    
        Share.open(shareOptions)
          .then((res) => console.log(res))
          .catch((err) => err && console.log(err));
      };

	return (
        <BasicModal
            modal={'helpout'}
            >
                <HelpOutOptButton
                    title='Buy beats'>
                </HelpOutOptButton>
                <HelpOutOptButton
                    title='Donate'>
                </HelpOutOptButton>
                <HelpOutOptButton
                    title='Make a review'>
                </HelpOutOptButton>
                <HelpOutOptButton
                    onPress={shareApp}
                    title='sShare with firends'>
                </HelpOutOptButton>

        </BasicModal>

    );
};