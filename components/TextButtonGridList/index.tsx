import React, { useState } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import { styles } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { FilterChip } from '../FilterChip';
import { TextButton } from '../TextButton';

interface TextButtonGridListProps {
	data: string[],
	selectedItems: Set<string>
	numberOfCols?: number,
	handlePress: (item: string) => void
}

export const TextButtonGridList = ({data, selectedItems, numberOfCols, handlePress} : TextButtonGridListProps) => {

	const renderItem = ({ item }: { item: string }) => (
		<TextButton
			label={item}
			onPress={() => handlePress(item)}
			selected={selectedItems.has(item)}
		/>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item}
				numColumns={numberOfCols ?? 4}
				columnWrapperStyle={styles.columnWrapper}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};