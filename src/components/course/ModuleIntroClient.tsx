"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ModuleIntroClient({ firstChapterUrl }: { firstChapterUrl: string }) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const audio = new Audio("/chapterAudios/module1/Sounds/introMusic.mp3");
    audio.loop = true;
    audio.volume = 1;
    audioRef.current = audio;

    // Attempt to play on mount
    audio.play().catch((err) => console.log("Autoplay prevented:", err));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const handleStart = () => {
    if (isFading) return;
    setIsFading(true);

    if (audioRef.current) {
      const fadeInterval = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          clearInterval(fadeInterval);
          if (audioRef.current) {
            audioRef.current.pause();
          }
          router.push(firstChapterUrl);
        }
      }, 50);
    } else {
      router.push(firstChapterUrl);
    }
  };

  return (
    <button
      onClick={handleStart}
      disabled={isFading}
      className="btn-green anim-pop-in"
      style={{
        fontSize: "1.3rem",
        padding: "1.1rem 3rem",
        textDecoration: "none",
        animationDelay: "0.35s",
        opacity: 0,
        fontFamily: "inherit",
        border: "none",
        cursor: isFading ? "default" : "pointer",
        width: "100%",
        maxWidth: "320px",
      }}
    >
      {isFading ? "Loading..." : "Start Learning! 🚀"}
    </button>
  );
}
