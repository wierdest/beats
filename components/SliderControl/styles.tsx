import { darkTheme, lightTheme } from "@/app/colors";

import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
    return StyleSheet.create({
    outerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        height: 'auto'
      
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    label: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 16    ,
        minWidth: 50,
        textAlign: 'center'
      },
    });
}