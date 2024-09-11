import { darkTheme, lightTheme } from "@/app/colors";
import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => { 
    return StyleSheet.create({
        container: {
        },
        topRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        beatName: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#f5f5f5',
            justifyContent: 'center'
        },
        mainControls: {
            borderTopStartRadius: 30,
            borderTopEndRadius: 30

        },
        auxiliaryControls: {
            flexDirection: 'column',
            backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary,
        },
        innerAuxControls: {
            
        },
   
    });
};