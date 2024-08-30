import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";

export const DrawerHeader = () => {
	const router = useRouter();
	const {globalColors} = useTheme();
	return (

		<TouchableOpacity onPress={() => { router.navigate('/') }}>
			<View style={styles.header}>
				<View style={[styles.topPart, {backgroundColor: globalColors.secondary,}]} />
				<View style={[styles.bottomPart, {backgroundColor: globalColors.primary,}]}>
					<Text style={styles.title}>Beats</Text>
				</View>
			</View>
		</TouchableOpacity>

	);
}

