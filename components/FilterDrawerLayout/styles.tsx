import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#333' : 'lightgray', 
      borderTopRightRadius: 60,
      borderBottomRightRadius: 60,
    },
    filtersContainer: {
      paddingLeft: 12,
    },
    item: {
      fontSize: 24,
      marginVertical: 10,
      color: isDarkMode ? '#fff' : '#000', 
    },
  });
};