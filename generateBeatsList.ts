import * as fs from 'fs';
import * as path from 'path';

const beatsDirectory = path.join(__dirname, 'assets/sounds/beats');
const outputFilePath = path.join(__dirname, 'beatsList.json');

interface Beat {
    id: number;
    title: string;
    filePath: string;
}

const generateBeatsList = () => {
    const files = fs.readdirSync(beatsDirectory).filter(file => {
        return file.endsWith('.mp3')
    });

    const beatsList: Beat[] = files.map((file, index) => ({
        id: index + 1,
        title: path.basename(file, path.extname(file)),
        filePath: `../assets/sounds/beats/${file}`,  
    }));

    fs.writeFileSync(outputFilePath, JSON.stringify(beatsList, null, 2));
    console.log('Beats list generated:', beatsList);
};

generateBeatsList();
