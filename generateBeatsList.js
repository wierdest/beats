"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var beatsDirectory = path.join(__dirname, 'assets/sounds/beats');
var outputFilePath = path.join(__dirname, 'beatsList.json');
var outputTsPath = path.join(__dirname, 'beatsAssets.ts');
var generateBeatsList = function () {
    var files = fs.readdirSync(beatsDirectory).filter(function (file) {
        return file.endsWith('.mp3');
    });
    var beatsList = files.map(function (file, index) { return ({
        id: index + 1,
        title: path.basename(file, path.extname(file)),
        filePath: "./assets/sounds/beats/".concat(file),
    }); });
    fs.writeFileSync(outputFilePath, JSON.stringify(beatsList, null, 2));
    console.log('Beats list generated:', beatsList);
    var assetsTsContent = "\n    const beatsAssetsMap: Record<string, any> = {\n        ".concat(beatsList.map(function (beat) { return "'".concat(beat.title.split('_')[0], "': require('").concat(beat.filePath, "'),"); }).join('\n        '), "\n    };\n\n    export default beatsAssetsMap;\n    ");
    fs.writeFileSync(outputTsPath, assetsTsContent);
    console.log('Beats assets file generated:', outputTsPath);
};
generateBeatsList();
