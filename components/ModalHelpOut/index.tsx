import React from 'react';
import { BasicModal } from '../BasicModal';
import { HelpOutOptButton } from '../HelpOutOptButton';
import { Linking, Share } from 'react-native';

export const ModalHelpOut = () => {

    const shareApp = async () => {
        try {
          const result = await Share.share({
            message: 'Confira o app mais brabo do momento! https://beats.com',
          });
      
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log('Compartilhado usando: ' + result.activityType);
            } else {
              console.log('Compartilhado com sucesso!');
            }
          } else if (result.action === Share.dismissedAction) {
            console.log('Compartilhamento cancelado');
          }
        } catch (error) {
          console.log(error);
        }
      };

      const rateApp = () => {
        const url = 'https://play.google.com/store/apps/details?id=com.mojang.minecraftpe&hl=pt_BR'; // Tem que botar o IP do nosso aplicativo na play store // Nao sei redirecionar direto pra review
        Linking.openURL(url).catch((err) => console.error("Erro ao abrir a URL da Play Store:", err));
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
                    onPress={rateApp}
                    title='Make a review'>
                </HelpOutOptButton>
                <HelpOutOptButton
                    onPress={shareApp}
                    title='Share with friends'>
                </HelpOutOptButton>
        </BasicModal>

    );
};