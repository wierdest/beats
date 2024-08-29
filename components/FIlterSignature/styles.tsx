import { darkTheme, lightTheme } from "@/app/colors";
import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingTop: 16,
    },
    label: {
      fontSize: 18,
      color: isDarkMode ? darkTheme.accent : lightTheme.accent,
      textAlign: 'center'
    },

  });
}