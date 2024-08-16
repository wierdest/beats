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
import getStyles, { lightTheme, darkTheme } from './styles';
import { useEffect } from "react";
import { useDatabase } from "@/contexts/DatabaseContext";

export default function Index() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { activeModal } = useModal();

  const { initialized, beats } = useDatabase();

  useEffect(() => {
    console.log('DATABASE INITIALIZED? ', initialized)
    console.log('THERE SHOULD BE 1 BEAT: ', beats.length)


  }, [initialized])

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <FilterButton/>
        <FilterChipList/>
        <BeatList originalBeats={beats}/>
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
