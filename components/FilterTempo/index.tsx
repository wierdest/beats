import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from './styles';
import { RangeSlider } from '../RangeSlider';
import { Divider } from '../Divider';
;

export type FilterTempoProps = {
	selectedTempo: string;
	onChange: (tempo: string) => void;
  };

  export const FilterTempo = ({ selectedTempo, onChange } : FilterTempoProps)  => {
	const [min, setMin] = useState<number>(50);
	const [max, setMax] = useState<number>(280);
  
	useEffect(() => {
	  const [minTempo, maxTempo] = selectedTempo.split('-').map(Number);
	  if (!isNaN(minTempo) && !isNaN(maxTempo)) {
		setMin(minTempo);
		setMax(maxTempo);
	  }
	}, [selectedTempo]);
  
	useEffect(() => {
	  onChange(`${min}-${max}`);
	}, [min, max]);
  
	return (
	  <View style={styles.container}>
		<Text style={styles.label}>TEMPO</Text>
		<View style={styles.textContainer}>
		  <Text style={styles.label}>{min}</Text>
		  <Text>-</Text>
		  <Text style={styles.label}>{max}</Text>
		</View>
		<View>
		  <RangeSlider
			minValue={min}
			maxValue={max}
			onValueChangeMin={setMin}
			onValueChangeMax={setMax}
		  />
		</View>
	  </View>
	);
  };