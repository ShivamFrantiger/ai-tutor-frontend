import fs from 'fs';
import path from 'path';
import { courseModules } from '../src/lib/courseData';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDir = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url));

async function main() {
    const targetModuleId = 1;
    const moduleData = courseModules.find(m => m.id === targetModuleId);
    if (!moduleData) throw new Error(`Module ${targetModuleId} not found`);

    let mapContent = `// Automatically generated mapping for Module 1 static audio files.\n`;
    mapContent += `// This allows the useSpeechSynthesis hook to bypass Sarvam TTS for these exact strings.\n\n`;
    mapContent += `export const pregeneratedAudioMap: Record<string, string> = {\n`;

    let audioCounter = 1;
    let entries: string[] = [];

    for (const chapterData of moduleData.chapters) {
        for (const screen of chapterData.screens) {
            const script = screen.exercise.speechScript || "";
            if (!script) continue;

            const chunks = script.split(/(\/[^\/]+\/)/g).filter(Boolean);
            for (const chunk of chunks) {
                if (chunk.startsWith('/') && chunk.endsWith('/')) {
                    continue;
                } else {
                    const textChunk = chunk.trim();
                    if (!textChunk || /^[^a-zA-Z0-9]+$/.test(textChunk)) continue;

                    const fileName = `aud${audioCounter}.wav`;
                    // Stringify to handle quotes automatically
                    entries.push(`  ${JSON.stringify(textChunk)}: "/chapterAudios/module1/${fileName}"`);
                    audioCounter++;
                }
            }
        }
    }

    mapContent += entries.join(',\n');
    mapContent += `\n};\n`;

    const outPath = path.resolve(currentDir, '../src/lib/pregeneratedAudioMap.ts');
    fs.writeFileSync(outPath, mapContent);
    console.log(`Wrote pregeneratedAudioMap.ts to ${outPath}`);
}

main().catch(console.error);
