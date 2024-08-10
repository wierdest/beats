import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";

export const DrawerHeader = () => {
	const router = useRouter();
	return (

		<TouchableOpacity onPress={() => { router.navigate('/')}}>
			<View style={styles.header}>
				<Text style={styles.title}>Beats</Text>
			</View>
		</TouchableOpacity>

	);
}

