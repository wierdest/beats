import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { TextButtonGridList } from '../TextButtonGridList';

const data: string[] = ['ALL', 'Rock', 'Pop', 'Hip Hop', 'Jazz', 'Blues', 'Funk', 'Folk','EDM', 'Other'];

export const FilterGenre = () => {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(['ALL']));
    const handlePress = (item: string) => {
        setSelectedItems(prevSelectedItems => {
            const updatedItems = new Set(prevSelectedItems);
            if (item === 'ALL') {
                if (updatedItems.has('ALL') && updatedItems.size > 1) {
                    return updatedItems;
                } else {
                    updatedItems.clear(); 
                    updatedItems.add('ALL');    
                }
            } else {

                if (updatedItems.has('ALL')) {
                    updatedItems.clear();
                }

                if (updatedItems.has(item)) {
                    updatedItems.delete(item);
					if(updatedItems.size === 0) {
                        updatedItems.add('ALL')
                    }
                } else {
                    updatedItems.add(item);
                }
            }
            return updatedItems;
        });
    };

	return (
		<View style={styles.container}>
			<Text style={styles.label}>GENRE</Text>
			<TextButtonGridList
				data={data}
				selectedItems={selectedItems}
				handlePress={handlePress}
			
			/>
		</View>
	)
};