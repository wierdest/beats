import React from 'react';
import { BasicModal } from '../BasicModal';
import { HelpOutOptButton } from '../HelpOutOptButton';
import { ShareButton } from '../ShareButton'; 

export const ModalHelpOut = () => {

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
                    title='Make a donate'>
                </HelpOutOptButton>
                <ShareButton
                    title='Share with friends'>
                </ShareButton>
        </BasicModal>

    );
};