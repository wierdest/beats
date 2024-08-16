import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { BeatCard } from '../BeatCard';
import { FlatList } from 'react-native-gesture-handler';
import { BannerCard } from '../BannerCard';

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

const beats: Beat[] = [
    {
        id: '1',
        bpm: '120-140',
        minBPM: 120,
        maxBPM: 140,
        bars: 16,
        signature: '4/4',
        title: 'Beat 1',
        genre: 'Hip Hop',
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
        genre: 'Jazz',
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

const combinedData = [...beats, ...samples]

// originalBeats são os beats que estão de fábrica no db
interface BeatListProps {
  originalBeats: Beat[]
}

export const BeatList = ({originalBeats}: BeatListProps) => {
	const [playingId, setPlayingId] = useState<string | null>(null);

  const beatList = [...originalBeats, ...combinedData]

	const handlePress = (id: string) => {
		setPlayingId(id);
    // todo implementar essa lógica usando expo-av

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
      // Render BannerCard for Sample items
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
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};