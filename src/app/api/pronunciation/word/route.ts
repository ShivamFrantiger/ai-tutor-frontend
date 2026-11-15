/* eslint-disable @typescript-eslint/no-explicit-any, prefer-const, @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from "next/server";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import _ from "lodash";
// @ts-ignore
import difflib from "difflib";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const word = formData.get("word") as string;
        const audioFile = formData.get("audio") as Blob;
        // const realSpeech = formData.get("real_speech") === "true"; // from the frontend demo, we can use it to toggle real speech if needed

        if (!word || !audioFile) {
            return NextResponse.json({ error: "Missing word or audio file" }, { status: 400 });
        }

        const arrayBuffer = await audioFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Load into AudioConfig
        let audioConfig: sdk.AudioConfig;
        try {
            audioConfig = sdk.AudioConfig.fromWavFileInput(buffer as any);
        } catch (e: any) {
            console.error("Failed to parse WAV file. Using push stream fallback.", e);
            // Fallback for non-wav or custom headers
            const pushStream = sdk.AudioInputStream.createPushStream();
            pushStream.write(arrayBuffer);
            pushStream.close();
            audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
        }

        const subscriptionKey = process.env.AZURE_RESOURCE_KEY;
        const region = process.env.AZURE_REGION || "centralindia";

        if (!subscriptionKey) {
            return NextResponse.json({ error: "Azure credentials not configured" }, { status: 500 });
        }

        // Configure speech
        const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);
        speechConfig.speechRecognitionLanguage = "en-US";

        const pronunciationAssessmentConfig = sdk.PronunciationAssessmentConfig.fromJSON(JSON.stringify({
            referenceText: word,
            gradingSystem: "HundredMark",
            granularity: "Phoneme",
            phonemeAlphabet: "IPA",
            nBestPhonemeCount: 5,
            enableMiscue: true,
            enableProsodyAssessment: true
        }));

        const reco = new sdk.SpeechRecognizer(speechConfig, audioConfig);
        pronunciationAssessmentConfig.applyTo(reco);

        return await new Promise<NextResponse>((resolve, reject) => {
            const scoreNumber = {
                accuracyScore: 0,
                fluencyScore: 0,
                compScore: 0,
                prosodyScore: 0,
                pronScore: 0,
            };
            const allWords: any[] = [];
            let currentText: string[] = [];
            let startOffset = 0;
            const recognizedWords: any[] = [];
            const fluencyScores: number[] = [];
            const prosodyScores: number[] = [];
            const durations: number[] = [];
            let jo: any = {};

            reco.recognized = function (s, e) {
                if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
                    jo = JSON.parse(e.result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult));
                    if (jo["NBest"] && jo["NBest"].length > 0) {
                        const nb = jo["NBest"][0];
                        if (nb.Words && nb.Words.length > 0) {
                            startOffset = nb.Words[0].Offset;
                        }
                        const localtext = _.map(nb.Words || [], (item: any) => item.Word.toLowerCase());
                        currentText = currentText.concat(localtext);

                        if (nb.PronunciationAssessment) {
                            fluencyScores.push(nb.PronunciationAssessment.FluencyScore);
                            prosodyScores.push(nb.PronunciationAssessment.ProsodyScore);
                        }

                        const isSucceeded = jo.RecognitionStatus === 'Success';
                        const nBestWords = jo.NBest[0].Words || [];
                        const durationList: number[] = [];

                        _.forEach(nBestWords, (w: any) => {
                            recognizedWords.push(w);
                            durationList.push(w.Duration);
                        });

                        if (durationList.length > 0) {
                            durations.push(_.sum(durationList));
                        }

                        if (isSucceeded && nBestWords) {
                            allWords.push(...nBestWords);
                        }
                    }
                }
            };

            function calculateOverallPronunciationScore() {
                const resText = currentText.join(" ");
                let wholelyricsArry: string[] = [];
                let resTextArray: string[] = [];

                let resTextProcessed = (resText.toLocaleLowerCase() ?? "").replace(new RegExp("[!\"#$%&()*+,-./:;<=>?@[\\^_`{|}~]+", "g"), "").replace(new RegExp("]+", "g"), "");
                let wholelyrics = (word.toLocaleLowerCase() ?? "").replace(new RegExp("[!\"#$%&()*+,-./:;<=>?@[\\^_`{|}~]+", "g"), "").replace(new RegExp("]+", "g"), "");
                wholelyricsArry = wholelyrics.split(" ");
                resTextArray = resTextProcessed.split(" ");

                const wholelyricsArryRes = _.map(
                    _.filter(wholelyricsArry, (item) => !!item),
                    (item) => item.trim()
                );

                const diff = new difflib.SequenceMatcher(null, wholelyricsArryRes, resTextArray);
                const lastWords: any[] = [];
                for (const d of diff.getOpcodes()) {
                    if (d[0] == "insert" || d[0] == "replace") {
                        for (let j = d[3]; j < d[4]; j++) {
                            if (allWords && allWords.length > 0 && allWords[j] && allWords[j].PronunciationAssessment && allWords[j].PronunciationAssessment.ErrorType !== "Insertion") {
                                allWords[j].PronunciationAssessment.ErrorType = "Insertion";
                            }
                            if (allWords[j]) {
                                lastWords.push(allWords[j]);
                            }
                        }
                    }
                    if (d[0] == "delete" || d[0] == "replace") {
                        if (
                            d[2] == wholelyricsArryRes.length &&
                            !(
                                jo.RecognitionStatus == "Success" ||
                                jo.RecognitionStatus == "Failed"
                            )
                        )
                            continue;
                        for (let i = d[1]; i < d[2]; i++) {
                            const word = {
                                Word: wholelyricsArryRes[i],
                                PronunciationAssessment: {
                                    ErrorType: "Omission",
                                    AccuracyScore: 0
                                },
                            };
                            lastWords.push(word);
                        }
                    }
                    if (d[0] == "equal") {
                        for (let k = d[3], count = 0; k < d[4]; count++) {
                            if (allWords[k]) {
                                lastWords.push(allWords[k]);
                            }
                            k++;
                        }
                    }
                }

                let reference_words = wholelyricsArryRes;

                let recognizedWordsRes: any[] = [];
                _.forEach(recognizedWords, (w: any) => {
                    if (w && w.PronunciationAssessment && w.PronunciationAssessment.ErrorType == "None") {
                        recognizedWordsRes.push(w)
                    }
                });

                let compScore = 0;
                if (reference_words.length > 0) {
                    compScore = Number(((recognizedWordsRes.length / reference_words.length) * 100).toFixed(0));
                }
                if (compScore > 100) {
                    compScore = 100;
                }
                scoreNumber.compScore = compScore;

                const accuracyScores: number[] = [];
                _.forEach(lastWords, (w: any) => {
                    if (w && w?.PronunciationAssessment?.ErrorType != "Insertion") {
                        accuracyScores.push(Number(w?.PronunciationAssessment?.AccuracyScore ?? 0));
                    }
                });
                scoreNumber.accuracyScore = accuracyScores.length > 0 ? Number((_.sum(accuracyScores) / accuracyScores.length).toFixed(0)) : 0;

                if (startOffset && durations.length > 0 && _.sum(durations) > 0) {
                    const sumRes: number[] = [];
                    _.forEach(fluencyScores, (x, index) => {
                        sumRes.push(x * durations[index]);
                    });
                    scoreNumber.fluencyScore = _.sum(sumRes) / _.sum(durations);
                } else if (fluencyScores.length > 0) {
                    scoreNumber.fluencyScore = Number((_.sum(fluencyScores) / fluencyScores.length).toFixed(0));
                }
                scoreNumber.prosodyScore = prosodyScores.length > 0 ? Number((_.sum(prosodyScores) / prosodyScores.length).toFixed(0)) : 0;

                const scoreKeys = ['accuracyScore', 'fluencyScore', 'compScore', 'prosodyScore'];
                const sortScore = scoreKeys.sort(function (a: string, b: string) {
                    return (scoreNumber as any)[a] - (scoreNumber as any)[b];
                });
                if (
                    jo.RecognitionStatus == "Success" ||
                    jo.RecognitionStatus == "Failed"
                ) {
                    scoreNumber.pronScore = Number(
                        (
                            (scoreNumber as any)[sortScore[0]] * 0.4 +
                            (scoreNumber as any)[sortScore[1]] * 0.2 +
                            (scoreNumber as any)[sortScore[2]] * 0.2 +
                            (scoreNumber as any)[sortScore[3]] * 0.2
                        ).toFixed(0)
                    );
                } else {
                    scoreNumber.pronScore = Number(
                        (scoreNumber.accuracyScore * 0.5 + scoreNumber.fluencyScore * 0.5).toFixed(0)
                    );
                }

                const targetWord = lastWords.find(w => w.Word.toLowerCase() === word.toLowerCase()) || lastWords[0];
                if (!targetWord) {
                    return {
                        word: word,
                        score: 0,
                        phonemes: []
                    };
                }

                const phonemes = (targetWord.Phonemes || []).map((p: any) => {
                    const expected = p.Phoneme;
                    const nbest = p.PronunciationAssessment?.NBestPhonemes || [];
                    const spoken = nbest.length > 0 ? nbest[0].Phoneme : expected;
                    const score = p.PronunciationAssessment?.AccuracyScore || 0;
                    return { expected, spoken, score };
                });

                return {
                    word: targetWord.Word,
                    score: targetWord.PronunciationAssessment?.AccuracyScore || 0,
                    phonemes: phonemes
                };
            }

            reco.canceled = function (s, e) {
                if (e.reason === sdk.CancellationReason.Error) {
                    console.error("Speech recognition error:", e.reason, e.errorDetails);
                    reco.stopContinuousRecognitionAsync();
                    resolve(NextResponse.json({ error: "Speech recognition error", details: e.errorDetails }, { status: 500 }));
                } else {
                    // EndOfStream or other non-error cancellation
                    reco.stopContinuousRecognitionAsync();
                }
            };

            reco.sessionStopped = function (s, e) {
                reco.stopContinuousRecognitionAsync();
                reco.close();
                try {
                    const finalScores = calculateOverallPronunciationScore();
                    resolve(NextResponse.json(finalScores));
                } catch (err: any) {
                    console.error("Error calculating score:", err);
                    resolve(NextResponse.json({ error: "Error calculating score", details: err.message }, { status: 500 }));
                }
            };

            reco.startContinuousRecognitionAsync();
        });

    } catch (error: any) {
        console.error("Error in pronunciation API:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
