import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

interface PlayerExpandButtonProps extends TouchableOpacityProps {
    isExpanded: boolean;
}

export const PlayerExpandButton = ({ isExpanded, ...props } : PlayerExpandButtonProps) => {

    return (
        <TouchableOpacity {...props} style={styles.button}>
           
            <MaterialCommunityIcons
                name={isExpanded ? 'chevron-down' : 'chevron-up'}
                size={48}
                color="white"
            />
          
        </TouchableOpacity>
    );
};
