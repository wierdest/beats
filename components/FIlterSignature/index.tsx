import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { createStyles } from './styles';

import { TextButtonGridList } from '../TextButtonGridList';
import { useTheme } from '@/contexts/ThemeContext';

const data: string[] = ['ALL', '4/4', '3/4', '2/4', '6/8', '9/8', '12/8', '5/4', '7/8', '3/8'];

type FilterSignatureProps = {
    selectedSignature: string[];
    onChange: (signature: string) => void;
};

export const FilterSignature = ({ selectedSignature, onChange }: FilterSignatureProps) => {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(["ALL"]));

    const { isDarkMode } = useTheme();
	const styles = createStyles(isDarkMode);

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
                    if (updatedItems.size === 0) {
                        updatedItems.add('ALL');
                    }
                } else {
                    updatedItems.add(item);
                }
            }
            return updatedItems;
        });
    };

    useEffect(() => {
        const signaturesSet = new Set(selectedSignature);
        if (signaturesSet.size === 0) {
            signaturesSet.add("ALL");
        }
        setSelectedItems(signaturesSet);
    }, [selectedSignature]);

    useEffect(() => {
        // Filtrar valores vazios ou nulos, se necessário
        const filteredItems = Array.from(selectedItems).filter(item => item.trim() !== '');

        // Unir os itens com vírgulas
        const signature = filteredItems.join(',');
        onChange(signature);
    }, [selectedItems]);


    return (
        <View style={styles.container}>
            <Text style={styles.label}>TIME SIGNATURES</Text>
            <TextButtonGridList
                data={data}
                numberOfCols={5}
                selectedItems={selectedItems}
                handlePress={handlePress}

            />
        </View>
    )
};