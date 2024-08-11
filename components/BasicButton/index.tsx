import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

interface BasicButton extends TouchableOpacityProps {
    title: string
}

export const BasicButton = ({ title, onPress } : BasicButton) => {
    return <TouchableOpacity
	onPress={onPress}
    style={styles.button}
  >
    <Text style={styles.buttonText}>
      { title }
    </Text>
  </TouchableOpacity>
}