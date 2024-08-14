import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => { 
    return StyleSheet.create({
        container: {
            padding: 16,
            backgroundColor: isDarkMode ? '#1e1e1e' : 'lightgray',
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
        },
        topRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative', // Para possibilitar a centralização absoluta do texto
        },
        centeredTextContainer: {
            flex: 1,
            alignItems: 'center', // Centraliza o texto horizontalmente
            position: 'relative',
        },
        beatName: {
            fontSize: 36,
            fontWeight: 'bold',
            color: isDarkMode ? '#f5f5f5' : '#333',
            position: 'absolute',
            left: '50%',
            transform: [{ translateX: "-50%" }],
        },
        mainControls: {},
        auxiliaryControls: {
            flexDirection: 'column',
            marginTop: 24,
        },
        innerAuxControls: {
            gap: 12,
        },
   
    });
};