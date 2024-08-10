import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { RangeSlider } from '../RangeSlider';
import { Divider } from '../Divider';
;

export const FilterTempo = () => {
	const [min, setMin] = useState(50)
	const [max, setMax] = useState(280)

	return (
		<View style={styles.container}>
			<Text style={styles.label}>TEMPO</Text>
			<View style={styles.textContainer}>
				<Text style={styles.label}>{min}</Text>
				<Text >-</Text>
				<Text style={styles.label}>{max}</Text>
			</View>

			<View >
				<RangeSlider
					minValue={min}
					maxValue={max}
					onValueChangeMin={setMin}
					onValueChangeMax={setMax}
				/>

			</View>




		</View>
	)
};