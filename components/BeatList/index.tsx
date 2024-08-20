import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { BeatCard } from '../BeatCard';
import { FlatList } from 'react-native-gesture-handler';
import { BannerCard } from '../BannerCard';
import { useFilter } from '@/contexts/FilterContext';

export interface Beat {
  id: string;
  bpm: string;
  minBPM: number;
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

const beats: Beat[] = [
  {
    id: '1',
    bpm: '120-140',
    minBPM: 120,
    maxBPM: 140,
    bars: 16,
    signature: '4/4',
    title: 'Beat 1',
    genre: 'HIP HOP',
    path: ''
  },
  {
    id: '2',
    bpm: '90-110',
    minBPM: 90,
    maxBPM: 110,
    bars: 16,
    signature: '3/4',
    title: 'Beat 2',
    genre: 'JAZZ',
    path: ''

  },
  {
    id: '3',
    bpm: '130-150',
    minBPM: 130,
    maxBPM: 150,
    bars: 16,
    signature: '4/4',
    title: 'Beat 3',
    genre: 'EDM',
    path: ''

  },
];


interface Sample {
  id: string;
  genre: string;
  bannerFilename: SampleFilename;
  soundSampleFilename: string;
}

export type SampleFilename = 'lofi-chill' | 'tropical';

const samples: Sample[] = [
  {
    id: '1',
    genre: 'jazz-hip hop-funk-lo fi-chill',
    bannerFilename: 'lofi-chill',
    soundSampleFilename: 'lofi-chill-sample.mp3'
  },

  {
    id: '2',
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

const combinedData = [...beats, ...samples];

interface BeatListProps {
  originalBeats: Beat[];
}

export const BeatList = ({ originalBeats }: BeatListProps) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { filters } = useFilter();

  // INICIO DOS FILTROS

  // Só pq os ids do sample tão colidindo com os do banco 
  const combinedDataWithUniqueKeys = combinedData.map((item, index) => ({
    ...item,
    id: `sample-${item.id}-${index}`
  }));

  const beatList = [...originalBeats, ...combinedDataWithUniqueKeys].filter(item => {
    // Filtro pelo tempo
    if (filters.tempo && isBeat(item)) {
      const [minBPM, maxBPM] = filters.tempo.split('-').map(Number);
      const itemBPM = parseFloat(item.bpm);
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

  const handlePress = (id: string) => {
    setPlayingId(id);
    // Implementar lógica usando expo-av
  };

  const renderItem = ({ item }: { item: BeatListItem }) => {
    if (isBeat(item)) {
      return (
        <BeatCard
          bpm={item.bpm}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={beatList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} // Usando o ID único
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};