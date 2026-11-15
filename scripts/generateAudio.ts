import fs from "fs";
import path from "path";
import { SarvamAIClient } from "sarvamai";
import { courseModules } from "../src/lib/courseData";
import { fileURLToPath } from "url";
import { dirname } from "path";

const currentDir =
  typeof __dirname !== "undefined"
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

// Load .env manually
const envPath = path.resolve(currentDir, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

console.log("USING KEY:", process.env.SARVAM_API_KEY);
const client = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY || "",
});

async function main() {
  if (!process.env.SARVAM_API_KEY) {
    console.error("Error: SARVAM_API_KEY environment variable is not set.");
    process.exit(1);
  }

  let markdownContent = `# Audio Scripts Mapping\n\n`;

  let mapContent = `// Automatically generated mapping for all static audio files.\n`;
  mapContent += `// This allows the useSpeechSynthesis hook to bypass Sarvam TTS for these exact strings.\n\n`;
  mapContent += `export const pregeneratedAudioMap: Record<string, string> = {\n`;
  let entries: string[] = [];

  for (const moduleData of courseModules) {
    markdownContent += `## Module ${moduleData.id}\n\n`;
    markdownContent += `| Chapter | Audio File | Source Screen ID | Text Chunk |\n`;
    markdownContent += `|---|---|---|---|\n`;

    const outputDir = path.resolve(
      currentDir,
      `../public/chapterAudios/module${moduleData.id}`,
    );
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let audioCounter = 1;

    // Process all chapters in Module
    for (const chapterData of moduleData.chapters) {
      console.log(
        `Processing Module ${moduleData.id}, Chapter ${chapterData.id}...`,
      );

      for (const screen of chapterData.screens) {
        const script = screen.exercise.speechScript || "";
        if (!script) continue;

        // Same splitting logic as useSpeechSynthesis.ts
        const chunks = script.split(/(\/[^\/]+\/)/g).filter(Boolean);

        for (const chunk of chunks) {
          if (chunk.startsWith("/") && chunk.endsWith("/")) {
            // It's a phoneme, skip TTS generation
            continue;
          } else {
            const textChunk = chunk.trim();
            // Skip if empty or just punctuation
            if (!textChunk || /^[^a-zA-Z0-9]+$/.test(textChunk)) continue;

            const fileName = `aud${audioCounter}.wav`;
            const filePath = path.join(outputDir, fileName);

            // Check if file exists so we don't regenerate audio we already have
            if (!fs.existsSync(filePath)) {
              console.log(
                `Generating audio for chunk: "${textChunk}" -> ${fileName}`,
              );
              try {
                const response = await client.textToSpeech.convert({
                  model: "bulbul:v3",
                  text: textChunk,
                  language_code: "en-IN",
                  speaker: "aditya",
                  pace: 0.85,
                } as any);

                if (response.audios && response.audios.length > 0) {
                  const audioBase64 = response.audios[0];
                  const audioBuffer = Buffer.from(audioBase64, "base64");
                  fs.writeFileSync(filePath, audioBuffer);
                  console.log(`Saved ${fileName}`);
                } else {
                  console.error(
                    `Failed to generate audio for chunk: ${textChunk}`,
                  );
                }
              } catch (error) {
                console.error(
                  `Error from Sarvam API for chunk "${textChunk}":`,
                  error,
                );
              }
            } else {
              console.log(
                `Skipping existing audio for chunk: "${textChunk}" -> ${fileName}`,
              );
            }

            // Add to markdown mapping
            markdownContent += `| ${chapterData.id} | ${fileName} | ${screen.id} | ${textChunk} |\n`;
            // Add to TS mapping
            entries.push(
              `  ${JSON.stringify(textChunk)}: "/chapterAudios/module${moduleData.id}/${fileName}"`,
            );

            audioCounter++;
          }
        }
      }
    }
  }

  const docsDir = path.resolve(currentDir, "../docs");
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  const mdPath = path.join(docsDir, "audScript.md");
  fs.writeFileSync(mdPath, markdownContent);
  console.log(`\nMapping written to ${mdPath}`);

  mapContent += entries.join(",\n");
  mapContent += `\n};\n`;
  const tsMapPath = path.resolve(
    currentDir,
    "../src/lib/pregeneratedAudioMap.ts",
  );
  fs.writeFileSync(tsMapPath, mapContent);
  console.log(`TS Mapping written to ${tsMapPath}`);
}

main().catch(console.error);
