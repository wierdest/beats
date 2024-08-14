import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.00)',
      },
      text: {
        fontSize: 40,
        color: '#000',
        fontWeight: 'bold',
        textShadowColor: '#000', // Shadow color
        textShadowOffset: { width: 0, height: 4 }, // Shadow offset
        textShadowRadius: 10, // Increase radius for a softer shadow
      },
});