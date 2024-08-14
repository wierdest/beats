import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => { 
  return StyleSheet.create({
      modalContent: {
          padding: 20,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        },
        modalText: {
          fontSize: 18,
          marginBottom: 20,
          color: isDarkMode ? 'white' : 'black'
        },
        input: {
          height: 40,
          width: 200,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingHorizontal: 10,
          color: isDarkMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.95)',
        },
        errorText: {
          color: 'red',
          marginBottom: 10,
        },
  });
}