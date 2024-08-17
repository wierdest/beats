import { BeatList } from "@/components/BeatList";
import { FilterButton } from "@/components/FilterButton";
import { FilterChipList } from "@/components/FilterChipList";
import { ModalAbout } from "@/components/ModalAbout";
import { ModalHelpOut } from "@/components/ModalHelpOut";
import { ModalSettings } from "@/components/ModalSettings";
import { ModalTimer } from "@/components/ModalTimer";
import { Player } from "@/components/Player";
import { useModal } from "@/contexts/ModalContext";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";
import { lightTheme, darkTheme } from './styles';
import { useEffect, useState } from "react";
import { useDatabase } from "@/contexts/DatabaseContext";
import { Audio } from 'expo-av';
import beatsAssetsMap from "@/beatsAssets";

export default function Index() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { activeModal } = useModal();

  const { initialized, beats, findBeatById: getBeatById } = useDatabase();
  
  const [beatPlaying, setBeatPlaying] = useState<Audio.Sound | undefined>( undefined)

  const handleSelectBeatToPlay = async (id: number) => {
    console.log('Pressed to play beat ', id)
    // para o playback
    if(beatPlaying != undefined) {
      await beatPlaying.stopAsync();
      await beatPlaying.unloadAsync();
      setBeatPlaying(undefined);
    }

    // todo carregar a beat a partir do id
    const beatToPlay = await getBeatById(id);
    if (!beatToPlay) {
      console.log('Beat não encontrada!!');
      return;
    } else {
      console.log(beatToPlay)
    }
    // constroi o path correto
    const uri = beatsAssetsMap[beatToPlay.title.split("_")[0]];
    console.log('Loading sound from:', uri);

    try {
      // Create a new instance of Sound with Expo-AV
      const { sound } = await Audio.Sound.createAsync(uri);

      await sound.playAsync();

      setBeatPlaying(sound);
    } catch (error) {
      console.error('Error loading or playing sound:', error);
    }
  }
    useEffect(() => {
    console.log('DATABASE INITIALIZED? ', initialized)
    console.log('THERE SHOULD BE 1 BEAT: ', beats.length)
  }, [initialized])

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <FilterButton/>
        <FilterChipList/>
        <BeatList originalBeats={beats} onPress={handleSelectBeatToPlay}/>
        <Player/>
      </View>

      {
        activeModal === 'helpout' &&
        <ModalHelpOut/>
      }

      {
        activeModal === 'settings' &&
        <ModalSettings/>
      }

      {
        activeModal === 'about' &&
        <ModalAbout/>
      }

      {
        activeModal === 'timer' &&
        <ModalTimer/>
      }

    </>
   
  );
}
