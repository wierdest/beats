import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 16,
    paddingHorizontal: 32,
    paddingBottom: 32,

    gap: 12
  },

  label: {
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