import beatsList from '@/beatsList.json';
import { fileExistsInDatabase, insertBeat } from '../Database';

export class BeatFilenameService {

  public static extractInfo(filename: string) {
    const parts = filename.split('_');
    if (parts.length !== 7) {
      throw new Error('Filename does not match the expected format');
    }

    const [title, genre, bpm, minBPM, maxBPM, signature, bars] = parts;

    return {
      bpm: parseInt(bpm, 10),
      minBPM: parseInt(minBPM, 10),
      maxBPM: parseInt(maxBPM, 10),
      signature, // todo -> process time signature
      bars: parseInt(bars, 10),
      genre,
      title
    };
  }

}