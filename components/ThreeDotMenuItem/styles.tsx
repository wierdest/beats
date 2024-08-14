import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 10
    },
    label: {
      fontSize: 18,
      color: isDarkMode ? 'white' : 'black',
      textAlign: 'left',
    },
  });
}
