import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { BeatCard } from '../BeatCard';
import { FlatList } from 'react-native-gesture-handler';
import { BannerCard } from '../BannerCard';
import { useFilter } from '@/contexts/FilterContext';

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
  path: string;
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
    return true;
  });

  // FINAL DOS FILTROS

	const handlePress = async (id: number) => {
		
    await onPress(id);
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
      <FlatList
        data={beatList}
        renderItem={renderItem}
        keyExtractor={(item) => extractKey(item)}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};