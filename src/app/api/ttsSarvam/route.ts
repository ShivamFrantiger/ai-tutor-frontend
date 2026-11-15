import { NextResponse } from 'next/server';
import { SarvamAIClient } from "sarvamai";

const client = new SarvamAIClient({
    apiSubscriptionKey: process.env.SARVAM_API_KEY
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;
    console.log("[Sarvam TTS API] Requested text:", text);
    
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const response = await client.textToSpeech.convert({
        model: "bulbul:v3",
        text,
        language_code: "en-IN",
        speaker: "aditya",
        pace: 0.85,
    } as any);

    if (response.audios && response.audios.length > 0) {
      return NextResponse.json({ audioBase64: response.audios[0] });
    } else {
      return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Sarvam TTS API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
