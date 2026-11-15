import { pregeneratedAudioMap } from "./pregeneratedAudioMap";

// In-memory cache for TTS audio (Base64 strings)
// Key: The exact text string used to generate the audio
const cache = new Map<string, string>();

// Track requests currently in-flight to prevent duplicate API calls
const inFlight = new Set<string>();

/**
 * Prefetch TTS audio for a given string of text and store it in the cache.
 * If the audio is already cached or in-flight, this is a no-op.
 */
export async function prefetchTTS(text: string): Promise<void> {
  const key = text.trim();
  
  // Skip if empty, already cached, or currently being fetched
  if (!key || cache.has(key) || inFlight.has(key)) {
    return;
  }
  
  // Skip if it is a pregenerated audio chunk
  if (pregeneratedAudioMap[key]) {
    return;
  }
  
  inFlight.add(key);
  
  try {
    const res = await fetch("/api/ttsSarvam", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: key }),
    });
    
    if (!res.ok) {
      console.error(`Failed to prefetch TTS for: "${key}"`);
      return;
    }
    
    const data = await res.json();
    if (data.error) {
      console.error(`TTS API Error during prefetch: ${data.error}`);
      return;
    }
    
    if (data.audioBase64) {
      cache.set(key, data.audioBase64);
    }
  } catch (error) {
    console.error(`Error prefetching TTS for: "${key}"`, error);
  } finally {
    inFlight.delete(key);
  }
}

/**
 * Get the cached TTS audio (Base64 string) for a given text.
 * Returns undefined if not found.
 */
export function getCachedTTS(text: string): string | undefined {
  return cache.get(text.trim());
}
