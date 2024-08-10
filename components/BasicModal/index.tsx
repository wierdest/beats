import React, { useEffect, useRef } from 'react';
import { Modal, Pressable, Animated } from 'react-native';
import { styles } from './styles';
import { ModalIdentifier, useModal } from '@/contexts/ModalContext';

interface BasicModalProps {
    modal: ModalIdentifier;
    children: React.ReactNode
}

export const BasicModal = ({modal, children} : BasicModalProps) => {
	const { activeModal, toggleModal } = useModal();
    const scaleAnim = useRef(new Animated.Value(0)).current; 
    useEffect(() => {
        if (activeModal != undefined) {
            Animated.spring(scaleAnim, {
                toValue: 1, 
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scaleAnim, {
                toValue: 0, 
                useNativeDriver: true,
            }).start();
        }
    }, [activeModal]);

	const handleClose = () => {
		toggleModal(undefined)
	}
	return (
        <Modal
            transparent={true}
            visible={activeModal === modal}
            animationType='fade' //
            onRequestClose={handleClose}
        >
            <Pressable
                style={styles.modalBackground}
                onPress={handleClose}
                android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
            >
                <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
                
                >
                    {children}
                </Animated.View>
            </Pressable>
        </Modal>
    );
};