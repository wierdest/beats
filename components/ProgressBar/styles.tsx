import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  progressBarContainer: {
    height: 4,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 2,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 2,
  }
});