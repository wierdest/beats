import beatsList from '@/beatsList.json';
import { existsInDatabase, insertBeat } from '../Database';

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
      signature: this.parseTimeSignature(signature),
      bars: parseInt(bars, 10),
      genre,
      title
    };
  }

  private static parseTimeSignature(t: string) {
    const timeSignatures: { [key: string]: string } = {
      '44': '4/4',
      '34': '3/4',
      '24': '2/4',
      '68': '6/8',
      '98': '9/8',
      '128': '12/8',
      '54': '5/4',
      '78': '7/8',
      '38': '3/8'
    };
    return timeSignatures[t] || 'Unknown time signature'; 
  }
  

}