import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";


interface HelpOutOptButtonProps extends TouchableOpacityProps {
    title: string
}

export const HelpOutOptButton = ({ title } : HelpOutOptButtonProps) => {
    return <TouchableOpacity
    style={styles.button}
  >
    <Text style={styles.buttonText}>
      { title }
    </Text>
  </TouchableOpacity>
}