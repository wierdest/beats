import * as fs from 'fs';
import * as path from 'path';

const beatsDirectory = path.join(__dirname, 'assets/sounds/beats');
const outputFilePath = path.join(__dirname, 'beatsList.json');
const outputTsPath = path.join(__dirname, 'beatsAssets.ts');

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
        filePath: `./assets/sounds/beats/${file}`,  
    }));

    fs.writeFileSync(outputFilePath, JSON.stringify(beatsList, null, 2));
    console.log('Beats list generated:', beatsList);

    const assetsTsContent = `
    const beatsAssetsMap: Record<string, any> = {
        ${beatsList.map(beat => `'${beat.title.split('_')[0]}': require('${beat.filePath}'),`).join('\n        ')}
    };

    export default beatsAssetsMap;
    `;

    fs.writeFileSync(outputTsPath, assetsTsContent);
    console.log('Beats assets file generated:', outputTsPath);

};

generateBeatsList();
