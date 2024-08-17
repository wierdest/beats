import beatsList from '@/beatsList.json';
import { fileExistsInDatabase, insertBeat } from '../Database';

export class Mp3Service {

  private static extractInfoFromFilename(filename: string) {
    const parts = filename.split('_');
    if (parts.length !== 7) {
      throw new Error('Filename does not match the expected format');
    }

    const [bpm, minBPM, maxBPM, signature, bars, genre, title] = parts;

    return {
      bpm: parseInt(bpm, 10),
      minBPM: parseInt(minBPM, 10),
      maxBPM: parseInt(maxBPM, 10),
      signature,
      bars: parseInt(bars, 10),
      genre,
      title: title, // Remover a extensão .mp3 do título
    };
  }


  public static async processMp3Files() {
    try {      
      for (const file of beatsList) {
      const fileId = Number(file.id);
      const exists = await fileExistsInDatabase(fileId);
      if (!exists) {
        Mp3Service.extractInfoFromFilename(file.title);
      } else {
        console.log(`Arquivo com ID ${fileId} já existe no banco de dados.`);
      }
    }
    } catch (error) {
      console.error('Error processing files:', error);
    }
  }

}