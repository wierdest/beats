import { BeatList } from "@/components/BeatList";
import { FilterButton } from "@/components/FilterButton";
import { FilterChipList } from "@/components/FilterChipList";
import { ModalAbout } from "@/components/ModalAbout";
import { ModalHelpOut } from "@/components/ModalHelpOut";
import { ModalSettings } from "@/components/ModalSettings";
import { ModalTimer } from "@/components/ModalTimer";
import { Player } from "@/components/Player";
import { useModal } from "@/contexts/ModalContext";
import { View } from "react-native";

export default function Index() {

  const { activeModal } = useModal();

  return (
    <>
      <View style={{ flex: 1 }}>
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
