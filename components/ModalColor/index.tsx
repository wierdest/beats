import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, ToastAndroid } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker'

import { useTheme } from '@/contexts/ThemeContext';
import { BasicButton } from '../BasicButton';
import { BasicModal } from '../BasicModal';
import { createStyles } from './styles';
import { GlobalColorType } from '@/app/colors';

export const ModalColor = () => {
  const { 

    setCustomColor,
    globalColors, 
    resetToFactoryDefaultColors, 
    isDarkMode, 
    saveColorsToStorage, 
    resetToUserDefaultColors, 
    areColorsInSyncWithStorage 
  
  } = useTheme();
  const styles = createStyles(isDarkMode);

  const [color, setColor] = useState<string | undefined>(undefined); 
  const pickerRef = useRef<ColorPicker>(null);
  const [pickingType, setPickingType] = useState<GlobalColorType | undefined>(undefined);
  const [changeHappened, setChangeHappened] = useState<boolean>(false);

  const colorSyncCheck = async () => {
    try {
      const areInSync = await areColorsInSyncWithStorage();
      // console.log('Colors are in sync? ', areInSync)
      setChangeHappened(!areInSync);

    } catch (e) {
      console.log('Error checking color sync ', e);
    }
  }
  useEffect(() => {
    colorSyncCheck();
  }, [])

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleCancelPicker = () => {
    setColor(undefined)
    setPickingType(undefined);
  }

  const handleColorChangeComplete = (colorType?: GlobalColorType) => {

    if(pickingType === undefined) {
      setPickingType(colorType)
    } else {  

      if(color != undefined) {
        setChangeHappened(true)
        setCustomColor(pickingType, color)
        setColor(undefined)
      }
      setPickingType(undefined);

    }
  };

  const handleSaveChanges = async () => {
    try {
      await saveColorsToStorage();
      setChangeHappened(false);
      ToastAndroid.show('Saved new color theme to storage!', ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show('Something went wrong saving color changes!', ToastAndroid.SHORT);
      console.log('Something went wrong saving color changes! ', e);
    }
  }

  const handleDiscardChanges = async () => {
    try {
      await resetToUserDefaultColors();
      setChangeHappened(false);
      ToastAndroid.show('Reset to color theme in storage!', ToastAndroid.SHORT);

    } catch (e) {
      ToastAndroid.show('Something went wrong resetting the theme!', ToastAndroid.SHORT);
      console.log('Something wrong resetting the theme! ', e);
    }
  }

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
            <BasicButton title={'Cancel'} onPress={handleCancelPicker} />
          </>
        }
        {
          pickingType === undefined && changeHappened &&
          <>
            <BasicButton title='Save Changes' onPress={handleSaveChanges} />
            <BasicButton title='Discard Changes' onPress={handleDiscardChanges} />
          </>
        }
        {
          pickingType === undefined &&
          <>
            <BasicButton title='Reset to Default' onPress={resetToFactoryDefaultColors} />
          </>
         
        }
      </View>
    </BasicModal>

  );
};
