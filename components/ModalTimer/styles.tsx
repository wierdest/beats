import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContent: {
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
      },
      input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      errorText: {
        color: 'red',
        marginBottom: 10,
      },
});