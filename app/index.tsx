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

export default function Index() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { activeModal } = useModal();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <FilterButton/>
        <FilterChipList/>
        <BeatList/>
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
