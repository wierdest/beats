import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { BeatCard } from '../BeatCard';
import { FlatList } from 'react-native-gesture-handler';
import { BannerCard } from '../BannerCard';

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
}

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


// originalBeats são os beats que estão de fábrica no db
interface BeatListProps {
  originalBeats: Beat[],
  onPress: (id: number) => Promise<void>
}

export const BeatList = ({originalBeats, onPress}: BeatListProps) => {
	const [playingId, setPlayingId] = useState<number | undefined>(undefined);

  const beatList = [...originalBeats, ...samples]

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