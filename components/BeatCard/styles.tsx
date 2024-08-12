import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => { 
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: isDarkMode ? '#333' : 'white',
      borderRadius: 8,
      padding: 10,
      elevation: 5,
      margin: 10,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginBottom: 10, 
    },
    bpmText: {
      fontSize: 12,
      color: isDarkMode ? '#bbb' : 'gray',
    },
    genreText: {
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      flex: 1,
      textAlign: 'center', 
    },
    tempoText: {
      fontSize: 12,
      color: isDarkMode ? '#bbb' : 'gray',
    },
    favoriteButton: {
      padding: 5,
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginTop: 10,
      alignSelf: 'center'
    },
  });
};
