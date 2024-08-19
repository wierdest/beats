import { Beat } from '@/components/BeatList';
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useDatabase } from '../DatabaseContext';
import beatsAssetsMap from "@/beatsAssets";


interface BeatContextProps {
  beat: Beat;
  audio: Audio.Sound | undefined;
  playing: boolean;
  selectBeat: (id: number) => Promise<void>;
  play: () => void;
	stop: () => void;
  changeBpm: (newBpm: number) => Promise<void>;
  reloadedBeat: boolean;
};

const BeatContext = createContext<BeatContextProps | undefined>(undefined);

export const BeatProvider = ({ children }: { children: React.ReactNode }) => {

  const { initialized, beats } = useDatabase();

  const [beat, setBeat] = useState<Beat>(beats[0]);
  const [reloadedBeat, setReloadedBeat] = useState<boolean>(false);

  const [audio, setAudio] = useState<Audio.Sound | undefined>(undefined);
  const [playing, setPlaying] = useState<boolean>(false);

  const loadCurrentBeat = async () => {
    const currentBeatId = await AsyncStorage.getItem('currentBeat');
    if (currentBeatId) {
      await selectBeat(parseInt(currentBeatId, 10));
    } else {
      await selectBeat(1);
    }
  };

  useEffect(() => {
    console.log('loading beat!')
    loadCurrentBeat();
    
  }, [initialized]);

  const selectBeat = async (id: number) => {
    if(beat && beat.id === id) {
      console.log('Tried to select the same beat!')
      return;
    }

    const beatToPlay = beats.find((b) => b.id === id);

    if (!beatToPlay) {
      console.log('Beat not found in the db beats array!');
      return;
    }
    setReloadedBeat(prev => !prev)
    setBeat(beatToPlay);

    // Save the currentBeat ID in AsyncStorage
    await AsyncStorage.setItem('currentBeat', id.toString());

    // Unload previous audio if it exists
    if (audio) {
      await audio.stopAsync();
      await audio.unloadAsync();
      setAudio(undefined);
    }
    setPlaying(false)

    // Load the new audio
    const asset = beatsAssetsMap[beatToPlay.title.split("_")[0]]

    // Calculate the current rate from the bpm
    const rate = beatToPlay.bpm / beatToPlay.midBPM!

    const newAudio = await Audio.Sound.createAsync(asset, { isLooping: true, rate: rate});
    setAudio(newAudio.sound);
    console.log('new audio loaded ', newAudio.status)
    

  };

  const play = () => {
    if(audio) {
      audio.playAsync();
      setPlaying(true);
    } else {
      console.log('Não há beat carregada para tocar, como pode?')
    }
  }

  const changeBpm = async (newBpm: number) => {

    if(beat === undefined) {
      console.log('Não há beat data carregada para mudar o bpm!')
      return;
    }
    if(audio === undefined) {
      console.log('Não há audio de beat carregado para mudar o rate!')
      return;
    }

    if(!audio._loaded) {
      console.log('Áudio não carregado!')
      return
    }

    const rate = newBpm / beat.midBPM!;

    console.log(newBpm, ' bpm to rate ', rate)

    setBeat(prevBeat => {
      if (!prevBeat) return prevBeat;
  
      return {
        ...prevBeat,
        bpm: newBpm
      };
    });


    try {
      await audio.setRateAsync(rate, true);
    } catch (error) {
      console.log(audio.getStatusAsync())
      console.log('Erro em atualizar rate! ', error)
    }
  }

  const stop  = () => {
    if(audio) {
      audio.stopAsync();
      setPlaying(false);
    } else {
      console.log("Não há beat para parar de tocar, como pode?")
    }
  }
  
  return (
    <BeatContext.Provider
      value={{
        beat,
        audio,
        playing,
        selectBeat,
        play,
        stop,
        changeBpm,
        reloadedBeat
      }}
    >
      {children}
    </BeatContext.Provider>
  );
};

export const useBeat = () => {
  const context = useContext(BeatContext);
  if (context === undefined) {
    throw new Error('useBeat must be used within a BeatProvider!');
  }
  return context;
};