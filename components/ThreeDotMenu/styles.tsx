import { darkTheme, lightTheme } from "@/app/colors";
import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => {
  return  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalBackground: {
      flex: 1,
    },
    menu: {
      backgroundColor: isDarkMode ? darkTheme.backgroundModal : lightTheme.backgroundModal,
      borderRadius: 8,
      padding: 10,
      elevation: 5,
      width: 150, 
      position: 'absolute',
      top: 0, 
      right: 0,
    },

  });
};