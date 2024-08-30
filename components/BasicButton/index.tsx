import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

interface BasicButtonProps extends TouchableOpacityProps {
    title: string,
    colorPreview?: string,
}
export const BasicButton = ({ title, colorPreview, onPress, ...props }: BasicButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, colorPreview && colorPreview != undefined? { backgroundColor: colorPreview , borderColor: 'black', borderWidth: 2} : undefined]}
      {...props}
    >
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
