import { Beat } from '@/components/BeatList';
import React, { createContext, MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { useDatabase } from '../DatabaseContext';
import beatsAssetsMap from "@/beatsAssets";



interface BeatContextProps {
  beat: Beat;
  audio: Audio.Sound | undefined;
  playing: boolean;
  selectBeat: (id: number) => Promise<void>;
  play: (loopLimit?: number) => void;
  stop: () => void;
  changeBpm: (newBpm: number) => Promise<void>;
  reloadedBeat: boolean;
  durationMillis: number;
  favoriteBeat: (id: number) => Promise<void>;
  durationSecs: number;
  loopLimitRef: MutableRefObject<number | undefined>;
  numberOfLoops: number;
};

const BeatContext = createContext<BeatContextProps | undefined>(undefined);

export const BeatProvider = ({ children }: { children: React.ReactNode }) => {

  const { initialized, beats, findBeatById, updateAndReload } = useDatabase();

  const [beat, setBeat] = useState<Beat>(beats[0]);
  const [reloadedBeat, setReloadedBeat] = useState<boolean>(false);

  const [audio, setAudio] = useState<Audio.Sound | undefined>(undefined);
  const [durationMillis, setDurationMillis] = useState<number>(0);
  const [durationSecs, setDurationSecs] = useState<number>(Math.round(durationMillis / 1000));

  const [playing, setPlaying] = useState<boolean>(false);

  const [numberOfLoops, setNumberOfLoops] = useState<number>(0);
  const loopLimitRef = useRef<number | undefined>(undefined);

  const loadCurrentBeat = async () => {
    const currentBeatId = await AsyncStorage.getItem('currentBeat');
    if (currentBeatId) {
      await selectBeat(parseInt(currentBeatId, 10));
    } else {
      await selectBeat(1);
    }
  };

  useEffect(() => {
    loadCurrentBeat();

  }, [initialized]);


  const selectBeat = async (id: number) => {
    if (beat && beat.id === id) {
      // console.log('Tried to select the same beat!')
      return;
    }

    try {
      const beatToPlay = await findBeatById(id);

      if (!beatToPlay) {
        // console.log('Beat not found in the db!');
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

      try {15 
        const { sound, status } = await Audio.Sound.createAsync(asset, {
          isLooping: true,
          rate: beatToPlay.bpm / beatToPlay.midBPM!,
        });
    
        if (!status.isLoaded) {
          console.log('Audio failed to load!');
          return;
        }
    
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        setAudio(sound);
        setDurationMillis(status.durationMillis || 0);
        setDurationSecs(Math.round((status.durationMillis || 0) / 1000));
        setNumberOfLoops(0);
    
      } catch (error) {
        console.error('Error loading audio:', error);
      }

    } catch (e) {
      console.error('Não foi possível encontrar beat no db!')
    }
  };

  const play = (loopLimitParam?: number) => {
    if (audio) {
      if (loopLimitParam !== undefined) {
        // console.log('setting loop limit!', loopLimitParam)
        loopLimitRef.current = loopLimitParam; 
        setNumberOfLoops(0);
      } else {
        loopLimitRef.current = undefined;
      }
      audio.setIsLoopingAsync(true);
      audio.playAsync();
      setPlaying(true);
    } else {
      console.log('No beat loaded to play!');
    }
  };

  const onPlaybackStatusUpdate = (playbackStatus: any) => {
    if (playbackStatus.didJustFinish) {
      setNumberOfLoops(prev => {
        const newLoopCount = prev + 1;
        return newLoopCount;
      });
    }
  };

  useEffect(() => {
    if (loopLimitRef.current && numberOfLoops >= loopLimitRef.current) {
      stop();
    }
  }, [numberOfLoops]);

  const changeBpm = async (newBpm: number) => {

    if (beat === undefined) {
      // console.log('Não há beat data carregada para mudar o bpm!')
      return;
    }
    if (audio === undefined) {
      // console.log('Não há audio de beat carregado para mudar o rate!')
      return;
    }

    if (!audio._loaded) {
      // console.log('Áudio não carregado!')
      return
    }

    const rate = newBpm / beat.midBPM!;

    // console.log(newBpm, ' bpm to rate ', rate)

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
      // console.log(audio.getStatusAsync())
      console.log('Erro em atualizar rate! ', error)
    }
  }

  const favoriteBeat = async (id: number) => {
    try {
      const beatToUpdate = await findBeatById(id);
      if (!beatToUpdate) {
        // console.log('Beat not found in the db beats db!');
        return;
      }

      // console.log('beat found! ', beatToUpdate.title, beatToUpdate.favorite)

      // Toggle the favorite status
      const newFavoriteStatus = beatToUpdate.favorite === 0 ? 1 : 0;
      // console.log('new status ', newFavoriteStatus)

      // Update the beat with the new favorite status
      const updatedBeat = { ...beatToUpdate, favorite: newFavoriteStatus };
      await updateAndReload(updatedBeat.id, updatedBeat);

      console.log('Beat favorite status updated!');
    } catch (e) {
      console.log('Error updating favorite beat: ', e);
    }
  };

  const stop = () => {
    if (audio) {
      audio.stopAsync();
      if(loopLimitRef.current != undefined) {
        loopLimitRef.current = undefined
        setNumberOfLoops(0);
      }
      setPlaying(false);
    } else {
      // console.log("Não há beat para parar de tocar, como pode?")
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
        reloadedBeat,
        durationMillis,
        favoriteBeat,
        durationSecs,
        loopLimitRef,
        numberOfLoops
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