import { StyleSheet } from 'react-native';


export const createStyles = (isDarkMode: boolean) => { 
  return StyleSheet.create({
      switchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',     
        minWidth: 220,
      },
      switchLabel: {
        fontSize: 18,
        textAlign: 'left',
        flex: 1,
        color: isDarkMode ? 'white' : 'black'
      },
  });
}