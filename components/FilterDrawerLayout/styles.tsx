import { darkTheme, lightTheme } from '@/app/colors';
import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? darkTheme.primary : lightTheme.primary, 
      borderTopRightRadius: 60,
      borderBottomRightRadius: 60,
    },
    filtersContainer: {
      paddingLeft: 12,
    },
    item: {
      fontSize: 18,
      marginVertical: 10,
      color: isDarkMode ? '#fff' : '#000', 
    },
  });
};