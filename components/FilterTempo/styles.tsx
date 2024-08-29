import { darkTheme, lightTheme } from "@/app/colors";
import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingTop: 16,
      paddingHorizontal: 32,
      paddingBottom: 32,

      gap: 12
    },

    label: {
      color: isDarkMode ? darkTheme.accent : lightTheme.accent,
      fontSize: 18,
      minWidth: 50,
      textAlign: 'center'
    },

    textContainer: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      gap: 12,
      marginBottom: 12
    },
  });
};