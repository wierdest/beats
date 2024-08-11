import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { Share } from 'react-native';


interface ShareButtonProps extends TouchableOpacityProps {
    title: string
}

export const ShareButton = ({ title,  } : ShareButtonProps) => {

    const shareApp = async () => {
        try {
          const result = await Share.share({
            message: 'Confira o app mais brabo do momento! https://beats.com',
          });
      
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              console.log('Compartilhado usando: ' + result.activityType);
            } else {
              console.log('Compartilhado com sucesso!');
            }
          } else if (result.action === Share.dismissedAction) {
            console.log('Compartilhamento cancelado');
          }
        } catch (error) {
          console.log(error);
        }
      };

    return <TouchableOpacity
    onPress={shareApp}
    style={styles.button}
  >
    <Text style={styles.buttonText}>
      { title }
    </Text>
  </TouchableOpacity>
}