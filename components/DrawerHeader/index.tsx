import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";

export const DrawerHeader = () => {
	const router = useRouter();
	return (

		<TouchableOpacity onPress={() => { router.navigate('/') }}>
			<View style={styles.header}>
				<View style={styles.topPart} />
				<View style={styles.bottomPart}>
					<Text style={styles.title}>Beats</Text>
				</View>
			</View>
		</TouchableOpacity>

	);
}

