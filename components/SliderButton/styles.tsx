import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        
     
    },
    button: {
        zIndex: 1, // Ensure the text is on top of the slider container
        backgroundColor: 'red',
        padding: 4,
        borderRadius: 60,
        minWidth: 40,
        minHeight: 40,
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'column',
        
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
    bubble: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 'auto',
        minWidth: 80,
        position: 'absolute',
        bottom: 48, 
        padding: 4,
        elevation: 4, 
        zIndex: 1,
        backgroundColor: 'black',
        borderRadius: 30,

    },

    tail: {
        position: 'absolute',
        bottom: -8,
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 8,
        elevation: 4, 
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'black', // Matches the bubble background color
    }
});