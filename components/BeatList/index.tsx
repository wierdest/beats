import React, { useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { BeatCard } from '../BeatCard';
import { FlatList } from 'react-native-gesture-handler';
import { BannerCard } from '../BannerCard';

interface Beat {
	id: string;
	bpm: string;
	minBPM: number;
	maxBPM: number;
	midBPM: number;
	genre: string;
	tempo: string;
	title: string;
}

const beats: Beat[] = [
    {
        id: '1',
        bpm: '120-140',
        minBPM: 120,
        maxBPM: 140,
        midBPM: 130,
        tempo: '4/4',
        title: 'Beat 1',
        genre: 'Hip Hop',
    },
    {
        id: '2',
        bpm: '90-110',
        minBPM: 90,
        maxBPM: 110,
        midBPM: 100,
        tempo: '3/4',
        title: 'Beat 2',
        genre: 'Jazz',
    },
    {
        id: '3',
        bpm: '130-150',
        minBPM: 130,
        maxBPM: 150,
        midBPM: 140,
        tempo: '4/4',
        title: 'Beat 3',
        genre: 'EDM',
    },
];


interface Sample {
  id: string;
  genre: string;
  bannerFilename: string;
  soundSampleFilename: string;
}

const samples: Sample[] = [
    {
      id: '4',
      genre: 'jazz hip hop funk',
      bannerFilename: 'lofi-chill.png',
      soundSampleFilename: 'lofi-chill-sample.mp3'
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

export const BeatList = () => {
	const [playingId, setPlayingId] = useState<string | null>(null);

	const handlePress = (id: string) => {
		setPlayingId(id);
	};

	const renderItem = ({ item }: { item: BeatListItem }) => {
    if (isBeat(item)) {
     
      return (
        <BeatCard
          bpm={item.bpm}
          genre={item.genre}
          tempo={item.tempo}
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
      data={combinedData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};