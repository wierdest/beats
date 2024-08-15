import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => { 
    return StyleSheet.create({
    modalContent: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24
            
    },    
});
}
