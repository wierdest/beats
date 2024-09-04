import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from './styles';
import { BeatCard } from '../BeatCard';
import { FlatList } from 'react-native-gesture-handler';
import { BannerCard } from '../BannerCard';
import { useFilter } from '@/contexts/FilterContext';
import { Loadingindicator } from '../LoadingIndicator';
import { useBeat } from '@/contexts/BeatContext';
import { useTheme } from '@/contexts/ThemeContext';
import { AntDesign } from '@expo/vector-icons';

export interface Beat {
	id: number;
	bpm: number;
	minBPM: number;
  midBPM?: number;
	maxBPM: number;
  bars: number;
  genre: string;
  signature: string;
  title: string;
  favorite: number;
}

export interface FilterState {
  tempo: string;
  genre: string;
  signature: string;
  favorite: boolean;
}

interface Sample {
  id: number;
  genre: string;
  bannerFilename: SampleFilename;
  soundSampleFilename: string;
}
// todo: isso tem que ter um samplesList.json e um samplesAssets.ts, da mesma forma que o beatsList.json e o beatsAssets.ts
export type SampleFilename = 'lofi-chill' | 'tropical';

const samples: Sample[] = [
  {
    id: 1,
    genre: 'jazz-hip hop-funk-lo fi-chill',
    bannerFilename: 'lofi-chill',
    soundSampleFilename: 'lofi-chill-sample.mp3'
  },

  {
    id: 2,
    genre: 'jazz-samba-bossa',
    bannerFilename: 'tropical',
    soundSampleFilename: 'tropical-sample.mp3'
  },

]

type BeatListItem = Beat | Sample

const isBeat = (item: BeatListItem): item is Beat => {
  return (item as Beat).bpm !== undefined;
};

const isSample = (item: BeatListItem): item is Sample => {
  return (item as Sample).bannerFilename !== undefined;
};

interface BeatListProps {
  originalBeats: Beat[],
  onPress: (id: number) => Promise<void>
}

export const BeatList = ({ originalBeats, onPress }: BeatListProps) => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const { filters } = useFilter();
  const [isLoading, setIsLoading] = useState(true);
  const { beat , play, stop, changeBpm, reloadedBeat, loopLimitRef, numberOfLoops } = useBeat();
  const {globalColors} = useTheme();
  // INICIO DOS FILTROS
  const beatList = [...originalBeats, ...samples].filter(item => {
    // Filtro pelo tempo
    if (filters.tempo && isBeat(item)) {
      const [minBPM, maxBPM] = filters.tempo.split('-').map(Number);
      const itemBPM = item.bpm
      if (isNaN(itemBPM) || itemBPM < minBPM || itemBPM > maxBPM) {
        return false;
      }
    }

    if (filters.genre !== 'ALL') {
      const selectedGenres = filters.genre.split(',').map(g => g.trim().toLocaleUpperCase());
      const itemGenres = item.genre.split(',').map(g => g.trim().toLocaleUpperCase());

      const hasAtLeastOneGenre = selectedGenres.some(selectedGenre =>
        itemGenres.includes(selectedGenre)
      );

      if (!hasAtLeastOneGenre) {
        return false;
      }
    }

    // Filtro pela assinatura (signature)
    if (filters.signature !== 'ALL') {
      const selectedSignatures = filters.signature.split(',').map(signature => signature.trim());

      if (isBeat(item)) {
        const isSignatureMatch = selectedSignatures.includes(item.signature);

        if (!isSignatureMatch) {
          return false;
        }
      }
    }

    if(filters.favorite === true && isBeat(item)) {
      return item.favorite != 0;
    }

    return true;
  });

  // FINAL DOS FILTROS

  const loadData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 250); 
  };

  useEffect(() => {
    loadData();
  }, []);

	const handlePress = (id: number) => {
		// console.log('pressed to sleect beat ', id)
    onPress(id);
    setPlayingId(id);

	};

  const renderItem = ({ item }: { item: BeatListItem }) => {
    if (isBeat(item)) {
      return (
        <BeatCard
          bpm={item.bpm.toString()}
          genre={item.genre}
          tempo={item.signature}
          title={item.title}
          onPress={() => handlePress(item.id)}
          playing={item.id === playingId}
          isFavorite={item.favorite != 0}
          id={item.id}
        />
      );
    } else if (isSample(item)) {
      return (
        <BannerCard
          bannerFilename={item.bannerFilename}
          soundSampleFilename={item.soundSampleFilename}
        />
      );
    }
    return null;
  };

  const extractKey = (item: BeatListItem) => {
    return isBeat(item) ? item.id.toString() : `sample_${item.id}`
  }

  return (
    <View style={styles.container}>
      {Array.isArray(beatList) && beatList.length === 0 ? (
        <View style={styles.noContent}>
          <AntDesign name="frowno" size={40} color={globalColors.accent} />
          <Text style={[styles.text, { color: globalColors.accent }]}>No content</Text>
        </View>
      ) : (
        isLoading ? (
          <Loadingindicator size="large" color={globalColors.accent} />
        ) : (
          <FlatList
            data={beatList}
            renderItem={renderItem}
            keyExtractor={(item) => extractKey(item)}
            contentContainerStyle={styles.contentContainer}
          />
        )
      )}
    </View>
  );
};