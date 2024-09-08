import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    button: {
        zIndex: 1,
        borderRadius: 60,
        minWidth: 32,
        minHeight: 32,
        flex: 1,
        position: 'absolute',
      
        
    },
    value: {
        fontSize: 12,
        alignSelf: 'center'
    },
    tag: {
        fontSize: 12,
    },
    bubbleText: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'lightgray'
    },
});