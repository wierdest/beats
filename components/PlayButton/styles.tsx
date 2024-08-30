import { globalColors } from "@/app/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: globalColors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
  },
});