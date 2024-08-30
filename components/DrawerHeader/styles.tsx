import { globalColors } from "@/app/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    height: 100, 
    borderTopRightRadius: 60,
    overflow: 'hidden', 
  },
  topPart: {
    flex: 0.9,
    backgroundColor: globalColors.secondary,
  },
  bottomPart: {
    flex: 2,
    backgroundColor: globalColors.primary, 
    justifyContent: 'center', 
    paddingLeft: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
});