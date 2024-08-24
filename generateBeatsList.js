"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");

// Directory and output file paths
const beatsDirectory = path.join(__dirname, 'assets/sounds/beats');
const outputFilePath = path.join(__dirname, 'beatsList.json');
const outputTsPath = path.join(__dirname, 'beatsAssets.ts');

// Function to convert camelCase to Sentence Case
const parseTitle = (title) => {
    const words = title.replace(/([A-Z])/g, ' $1').trim();
    return words.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Function to generate the beats list
const generateBeatsList = () => {
    const files = fs.readdirSync(beatsDirectory).filter((file) => {
        return file.endsWith('.mp3');
    });

    const beatsList = files.map((file, index) => { 
        const title = path.basename(file, path.extname(file));
        return {
            id: index + 1,
            title: title,
            filePath: `./assets/sounds/beats/${file}`,
        };
    });

    // Write the JSON file
    fs.writeFileSync(outputFilePath, JSON.stringify(beatsList, null, 2));
    console.log('Beats list generated:', beatsList);

    // Generate the TypeScript content
    const assetsTsContent = `
    const beatsAssetsMap: Record<string, any> = {
        ${beatsList.map((beat) => { 
            const parsedTitle = parseTitle(beat.title.split('_')[0]); // Apply parseTitle here
            return `'${parsedTitle}': require('${beat.filePath}'),`; 
        }).join('\n        ')}
    };

    export default beatsAssetsMap;
    `;

    // Write the TypeScript file
    fs.writeFileSync(outputTsPath, assetsTsContent);
    console.log('Beats assets file generated:', outputTsPath);
};

// Generate the list and TypeScript file
generateBeatsList();
