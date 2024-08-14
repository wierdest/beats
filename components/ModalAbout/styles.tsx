import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => { 
   return StyleSheet.create({
        modalContent: {
          padding: 20,
          alignItems: 'center',
        },
        modalText: {
          fontSize: 24,
          marginBottom: 10,
          color: isDarkMode ? 'white' : 'black',
        },
        emailText: {
          fontSize: 16,
          textDecorationLine: 'none',
          color: isDarkMode ? 'white' : 'black',
        },
    });
}
