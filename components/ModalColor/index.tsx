import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker'

import { useTheme } from '@/contexts/ThemeContext';
import { BasicButton } from '../BasicButton';
import { BasicModal } from '../BasicModal';
import { createStyles } from './styles';
import { GlobalColorType } from '@/app/colors';

export const ModalColor = () => {
  const { setCustomColor, globalColors, resetToFactoryDefaultColors, isDarkMode } = useTheme();
  const styles = createStyles(isDarkMode);

  const [color, setColor] = useState<string | undefined>(undefined); // Default to white
  const pickerRef = useRef<ColorPicker>(null);
  const [pickingType, setPickingType] = useState<GlobalColorType | undefined>(undefined);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleResetPicker = () => {
    setColor('#FFFFFF');
  }

  const handleCancelPicker = () => {
    setPickingType(undefined);
  }

  const handleColorChangeComplete = (colorType?: GlobalColorType) => {

    if(pickingType === undefined) {
      setPickingType(colorType)
    } else {  

      if(color != undefined) {
        setCustomColor(pickingType, color);
        setColor(undefined)
      }
      setPickingType(undefined);

    }
    
  };

  return (
    <BasicModal modal={'color'}>
      <View style={styles.modalContent}>
        {
          pickingType &&
          <View style={styles.colorPickerContainer}>
            <Text style={styles.instructionText}>Hit the color preview button to change the {pickingType} color</Text>
            <ColorPicker
              ref={pickerRef}
              color={color === undefined ? '#FFFFFF' : color}
              onColorChange={handleColorChange}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
              wheelLoadingIndicator={<ActivityIndicator size={40} />}
              sliderLoadingIndicator={<ActivityIndicator size={20} />}
              useNativeDriver={false}
              useNativeLayout={false}
              sliderHidden={true}
              swatches={false}
            />
        </View>
        }
        
        {
          (pickingType === undefined || pickingType === 'primary') &&
          <BasicButton colorPreview={globalColors.primary} title={'Primary'} onPress={() => handleColorChangeComplete('primary')} />
        }
        {
          (pickingType === undefined || pickingType === 'secondary') &&
          <BasicButton colorPreview={globalColors.secondary} title={'Secondary'} onPress={() => handleColorChangeComplete('secondary')} />

        }
        {
          (pickingType === undefined || pickingType === 'accent') &&
          <BasicButton colorPreview={globalColors.accent} title={'Accent'} onPress={() => handleColorChangeComplete('accent')} />
        }
        {
          pickingType != undefined &&
          <>
            <BasicButton title={'Reset'} onPress={handleResetPicker} />
            <BasicButton title={'Cancel'} onPress={handleCancelPicker} />
          </>
        }
        {
          pickingType === undefined &&
          <BasicButton title='Reset Color Scheme' onPress={resetToFactoryDefaultColors} />

        }
      </View>
    </BasicModal>

  );
};
