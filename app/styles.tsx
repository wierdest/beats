import { StyleSheet } from 'react-native';

interface Theme {
  backgroundColor?: string;
  color?: string;
}

export const darkTheme: Theme = {
  backgroundColor: 'rgb(15 15 15);',
  color: '#FFFFFF',
};

export const lightTheme: Theme = {
  backgroundColor: 'rgba(0, 0, 0, 0.00)',
  color: '#000000',
};


const getStyles = (theme: Theme = {}): Record<string, any> =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor || '#FFFFFF', 
    },
    text: {
      color: theme.color || '#000000', 
    },
  });

export default getStyles;