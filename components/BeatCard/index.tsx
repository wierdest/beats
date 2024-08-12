import React, { useState } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import { createStyles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FavoriteButton } from '../FavoriteButton';
import { useTheme } from '@/contexts/ThemeContext';

interface BeatCardProps {
	bpm: string;
	genre: string;
	tempo: string;
	title: string;
	onPress: () => void;
	playing: boolean;
}

export const BeatCard = ({ bpm, genre, tempo, title, onPress, playing }: BeatCardProps) => {
	const { isDarkMode } = useTheme();
	const styles = createStyles(isDarkMode);
	const [favorite, setFavorite] = useState(false);

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View style={styles.topRow}>
				<Text style={styles.bpmText}>{bpm}</Text>
				<Text style={styles.genreText}>{genre}</Text>
				<Text style={styles.tempoText}>{tempo}</Text>
				<FavoriteButton animate selected={favorite} onPress={() => {setFavorite(prev => !prev)}}/>
			</View>
			<Text style={[styles.title, { color: playing ? 'red' : 'black' }]}>{title}</Text>
		</TouchableOpacity>
	  );
};