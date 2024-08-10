import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'lightgray',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    beatName: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    mainControls: {

    },
    auxiliaryControls: {
        flexDirection: 'column',
        marginTop: 24,
        
    },
    innerAuxControls: {
        gap: 12
    },
   
});