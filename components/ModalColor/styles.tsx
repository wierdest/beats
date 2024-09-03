import { darkTheme, lightTheme } from "@/app/colors";
import { StyleSheet } from "react-native";

export const createStyles = (isDarkMode: boolean) => {
    
    return StyleSheet.create({
	modalContent: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end',
		alignItems: 'center',
        gap: 12,
            
    },
    instructionText: {
        fontSize: 18,
        color: isDarkMode ? darkTheme.accent : lightTheme.accent,

    },
	colorPickerContainer: {
		height: 220,
	}
})};