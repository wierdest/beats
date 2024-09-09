import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => { 
    return StyleSheet.create({
        container: {
            padding: 6,
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
        },
        topRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        beatName: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#f5f5f5',
            justifyContent: 'center'
        },
        mainControls: {

        },
        auxiliaryControls: {
            flexDirection: 'column',

        },
        innerAuxControls: {
            
        },
   
    });
};