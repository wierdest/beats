import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles} from './styles';
import { ThreeDotMenuItem } from '../ThreeDotMenuItem';
import { ModalIdentifier, useModal } from '@/contexts/ModalContext';
import { useTheme } from '@/contexts/ThemeContext';


export const ThreeDotMenu = () => {
	const { isDarkMode } = useTheme();
  	const styles = createStyles(isDarkMode);

	const [visible, setVisible] = useState<boolean>(false);

	const { toggleModal } = useModal();
	
	const handleOptionSelect = (option: ModalIdentifier) => {
		// console.log('Selected option:', option);
		setVisible(false);
		toggleModal(option)

	};

	const toggleMenu = () => setVisible(!visible);

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={toggleMenu}>
				<MaterialCommunityIcons name="dots-vertical" size={24} color='white' />
			</TouchableOpacity>
			<Modal
				transparent={true}
				visible={visible}
				animationType='none'
			>
				<Pressable
					style={styles.modalBackground}
					onPress={() => setVisible(false)}
				>
					<View style={styles.menu}>
						{/* <ThreeDotMenuItem
							label={'Help out!'}
							iconName='handshake'
							onPress={() => {
								handleOptionSelect('helpout');
							}}
						/> */}
						<ThreeDotMenuItem
							label={'Settings'}
							iconName='cog'
							onPress={() => {
								handleOptionSelect('settings');
							}}
						/>
						<ThreeDotMenuItem
							label={'About'}
							iconName='information-outline'
							onPress={() => {
								handleOptionSelect('about');
							}}
						/>
					</View>
				</Pressable>
			</Modal>
		</View>
	);
};