import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    container: {
        flexDirection: 'column',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Pra deixar transparente
        borderRadius: 8,
        padding: 20,
        elevation: 5,
        width: width * 0.8,
        maxHeight: height * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
