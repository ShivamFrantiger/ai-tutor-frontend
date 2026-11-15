"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getCachedTTS } from "@/lib/ttsCache";
import { pregeneratedAudioMap } from "@/lib/pregeneratedAudioMap";

export function useSpeechSynthesis(text?: string, autoPlay: boolean = false) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(async (textToSpeak: string = text || "") => {
    cancel();

    if (!textToSpeak) {
      setIsSpeaking(false);
      setHasEnded(true);
      return;
    }

    setIsSpeaking(false);
    setHasEnded(false);
    setCharIndex(0);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      // Split text into chunks, separating /phoneme/ patterns
      const chunks = textToSpeak.split(/(\/[^\/]+\/)/g).filter(Boolean);
      let cumulativeLength = 0;

      for (const chunk of chunks) {
        if (abortController.signal.aborted) return;

        if (chunk.startsWith('/') && chunk.endsWith('/')) {
          // It's a phoneme
          const phonemeSymbol = chunk.slice(1, -1);
          let fileName = phonemeSymbol;
          if (phonemeSymbol === 'æ') fileName = 'ae';
          // Add other mappings here if needed

          const audio = new Audio(`/audios/sounds/${fileName}.m4a`);
          audioRef.current = audio;

          await new Promise<void>((resolve) => {
            const abortHandler = () => {
               audio.pause();
               resolve();
            };
            abortController.signal.addEventListener('abort', abortHandler);

            audio.onplay = () => {
              setIsSpeaking(true);
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
                  const progress = audio.currentTime / audio.duration;
                  setCharIndex(cumulativeLength + Math.floor(progress * chunk.length));
                }
              }, 100);
            };

            audio.onended = () => {
              abortController.signal.removeEventListener('abort', abortHandler);
              resolve();
            };
            audio.onerror = (e) => {
              console.error("Local audio playback error", e);
              abortController.signal.removeEventListener('abort', abortHandler);
              resolve(); 
            };

            audio.play().catch(() => {
              abortController.signal.removeEventListener('abort', abortHandler);
              resolve();
            });
          });

          cumulativeLength += chunk.length;
          setCharIndex(cumulativeLength);
        } else {
          // Normal text TTS
          const textChunk = chunk.trim();
          // Skip TTS if it's just punctuation or empty space
          if (!textChunk || /^[^a-zA-Z0-9]+$/.test(textChunk)) {
             cumulativeLength += chunk.length;
             setCharIndex(cumulativeLength);
             continue;
          }

          let audioUrl: string;

          if (pregeneratedAudioMap[textChunk]) {
            audioUrl = pregeneratedAudioMap[textChunk];
          } else {
            const cached = getCachedTTS(textChunk);
            let audioBase64: string;

            if (cached) {
              audioBase64 = cached;
            } else {
              const res = await fetch("/api/ttsSarvam", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: textChunk }),
                signal: abortController.signal,
              });

              if (!res.ok) throw new Error("Failed to fetch TTS");
              const data = await res.json();
              if (data.error) throw new Error(data.error);
              if (abortController.signal.aborted) return;
              audioBase64 = data.audioBase64;
            }
            audioUrl = `data:audio/wav;base64,${audioBase64}`;
          }

          const audio = new Audio(audioUrl);
          audioRef.current = audio;

          await new Promise<void>((resolve) => {
            const abortHandler = () => {
               audio.pause();
               resolve();
            };
            abortController.signal.addEventListener('abort', abortHandler);

            audio.onplay = () => {
              setIsSpeaking(true);
              if (intervalRef.current) clearInterval(intervalRef.current);
              intervalRef.current = setInterval(() => {
                if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
                  const progress = audio.currentTime / audio.duration;
                  setCharIndex(cumulativeLength + Math.floor(progress * chunk.length));
                }
              }, 100);
            };

            audio.onended = () => {
              abortController.signal.removeEventListener('abort', abortHandler);
              resolve();
            };
            audio.onerror = (e) => {
              console.error("TTS audio playback error", e);
              abortController.signal.removeEventListener('abort', abortHandler);
              resolve();
            };

            audio.play().catch(() => {
              abortController.signal.removeEventListener('abort', abortHandler);
              resolve();
            });
          });

          cumulativeLength += chunk.length;
          setCharIndex(cumulativeLength);
        }
      }

      if (abortController.signal.aborted) return;
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCharIndex(textToSpeak.length);
      setIsSpeaking(false);
      setHasEnded(true);

    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.error("Speech synthesis error", err);
      setIsSpeaking(false);
      setHasEnded(true);
    }
  }, [text, cancel]);

  useEffect(() => {
    if (autoPlay && text) {
      speak();
    }
    return () => cancel();
  }, [autoPlay, text, speak, cancel]);

  return { 
    speak, 
    cancel, 
    isSpeaking, 
    hasEnded, 
    charIndex, 
    reset: () => { 
      setHasEnded(false); 
      setCharIndex(0); 
    } 
  };
}
