"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Mascot from "@/components/course/Mascot";

/* ── Static data ──────────────────────────────────────────────────────────── */

const SPEECH_BUBBLES = [
  "Hi there! 👋",
  "Let's learn sounds! 🎵",
  "Ready to play? 🌟",
  "I'll teach you! 🦉",
];

const LETTER_BUBBLES: {
  letter: string;
  color: string;
  shadow: string;
  left: string;
  delay: string;
  duration: string;
  size: number;
}[] = [
  { letter: "A", color: "#58CC02", shadow: "#46A302", left: "8%",  delay: "0s",    duration: "3.6s", size: 48 },
  { letter: "B", color: "#1CB0F6", shadow: "#148CD5", left: "22%", delay: "0.7s",  duration: "4.2s", size: 44 },
  { letter: "C", color: "#FFC800", shadow: "#C29600", left: "38%", delay: "1.4s",  duration: "3.9s", size: 52 },
  { letter: "D", color: "#FF9600", shadow: "#C96B00", left: "55%", delay: "0.3s",  duration: "4.5s", size: 40 },
  { letter: "E", color: "#58CC02", shadow: "#46A302", left: "70%", delay: "1.8s",  duration: "3.4s", size: 46 },
  { letter: "F", color: "#1CB0F6", shadow: "#148CD5", left: "84%", delay: "0.9s",  duration: "4.1s", size: 42 },
  { letter: "🔊", color: "#FF9600", shadow: "#C96B00", left: "15%", delay: "2.2s", duration: "4.8s", size: 44 },
  { letter: "⭐", color: "#FFC800", shadow: "#C29600", left: "90%", delay: "1.1s", duration: "3.7s", size: 38 },
];

const STAT_CHIPS: { icon: string; label: string; value: string; bg: string; border: string; color: string }[] = [
  { icon: "⭐", label: "Stars",   value: "0",    bg: "#FFF8CC", border: "#FFC800", color: "#7A5C00" },
  { icon: "🔥", label: "Streak",  value: "0 days", bg: "#FFE8CC", border: "#FF9600", color: "#7A3800" },
  { icon: "🏆", label: "Level",   value: "1",    bg: "#DDF4FF", border: "#1CB0F6", color: "#004A7C" },
];

/* ── Background blobs ─────────────────────────────────────────────────────── */
const BLOBS = [
  { w: 340, h: 340, top: "-100px", left: "-100px",  color: "rgba(88,204,2,0.10)",   dur: "11s", delay: "0s"   },
  { w: 280, h: 280, top: "30%",    right: "-80px",  color: "rgba(28,176,246,0.09)", dur: "14s", delay: "3s"   },
  { w: 220, h: 220, bottom: "60px",left: "10%",     color: "rgba(255,200,0,0.10)",  dur: "9s",  delay: "1.5s" },
  { w: 180, h: 180, top: "55%",    right: "15%",    color: "rgba(255,150,0,0.08)",  dur: "13s", delay: "5s"   },
];

/* ── Component ────────────────────────────────────────────────────────────── */
export default function Home() {
  const router = useRouter();

  /* Cycling speech bubble */
  const [bubbleIdx, setBubbleIdx] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => {
        setBubbleIdx((i) => (i + 1) % SPEECH_BUBBLES.length);
        setBubbleVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const handleStart = () => router.push("/course/module/1");

  return (
    <main
      id="soundbird-home"
      style={{
        minHeight: "100dvh",
        width: "100%",
        background: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-display)",
        padding: "32px 20px 40px",
        gap: 0,
      }}
    >
      {/* ── Drifting background blobs ───────────────────────────────────────── */}
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="anim-blob-drift"
          style={{
            position: "absolute",
            width: b.w,
            height: b.h,
            top: b.top,
            left: (b as any).left,
            right: (b as any).right,
            bottom: (b as any).bottom,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            animationDuration: b.dur,
            animationDelay: b.delay,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Floating letter bubbles (bottom strip) ──────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "160px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {LETTER_BUBBLES.map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: "0px",
              left: b.left,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: b.color,
              boxShadow: `0 4px 0 ${b.shadow}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: b.size * 0.46,
              fontWeight: 900,
              color: "#fff",
              animation: `letterFloat ${b.duration} ease-in-out ${b.delay} infinite`,
              userSelect: "none",
            }}
          >
            {b.letter}
          </div>
        ))}
      </div>

      {/* ── Content stack ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "420px",
          gap: 0,
        }}
      >
        {/* ── App wordmark ──────────────────────────────────────────────────── */}
        <h1
          className="anim-fade-in"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 3.8rem)",
            fontWeight: 900,
            letterSpacing: "-1px",
            lineHeight: 1,
            margin: "0 0 4px",
            textAlign: "center",
            background:
              "linear-gradient(90deg, #58CC02 0%, #1CB0F6 35%, #FFC800 65%, #58CC02 100%)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "wordmarkShimmer 4s linear infinite, fadeIn 0.5s ease forwards",
            animationDelay: "0s, 0s",
          }}
        >
          SoundBird
        </h1>

        {/* ── Tagline ───────────────────────────────────────────────────────── */}
        <p
          className="anim-fade-in"
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#afafaf",
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: "0 0 32px",
            animationDelay: "0.12s",
          }}
        >
          Learn phonetics & sounds 🎵
        </p>

        {/* ── Mascot + speech bubble ────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          {/* Speech bubble */}
          <div
            style={{
              position: "absolute",
              top: "-18px",
              right: "-30px",
              background: "#fff",
              border: "3px solid #58CC02",
              borderRadius: "20px",
              padding: "8px 14px",
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "#2a6600",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(88,204,2,0.18)",
              opacity: bubbleVisible ? 1 : 0,
              transform: bubbleVisible ? "scale(1)" : "scale(0.92)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
              zIndex: 3,
            }}
          >
            {SPEECH_BUBBLES[bubbleIdx]}
            {/* Bubble tail */}
            <span
              style={{
                position: "absolute",
                bottom: "-13px",
                left: "20px",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "13px solid #58CC02",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "-9px",
                left: "22px",
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "10px solid #fff",
              }}
            />
          </div>

          {/* Mascot */}
          <div className="anim-float-bounce" style={{ animationDuration: "3.2s" }}>
            <Mascot mood="happy" size={190} />
          </div>
        </div>

        {/* ── CTA Button ────────────────────────────────────────────────────── */}
        <div
          className="anim-bubble-in"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "320px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "28px",
            animationDelay: "0.35s",
          }}
        >
          {/* Glow ring behind button */}
          <div
            className="anim-glow-pulse"
            style={{
              position: "absolute",
              inset: "-8px",
              borderRadius: "999px",
              background: "rgba(88,204,2,0.18)",
              pointerEvents: "none",
            }}
          />
          <button
            id="start-learning-btn"
            onClick={handleStart}
            className="btn-green"
            style={{
              width: "100%",
              fontSize: "1.5rem",
              padding: "1.1rem 2rem",
              borderRadius: "999px",
              letterSpacing: "0.5px",
              position: "relative",
              zIndex: 1,
            }}
          >
            🚀 START LEARNING!
          </button>
        </div>

        {/* ── Stat chips ────────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {STAT_CHIPS.map((chip, i) => (
            <div
              key={chip.label}
              className="anim-bubble-in"
              style={{
                background: chip.bg,
                border: `2.5px solid ${chip.border}`,
                borderRadius: "999px",
                padding: "8px 18px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                animationDelay: `${0.5 + i * 0.12}s`,
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{chip.icon}</span>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: chip.color, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {chip.label}
                </span>
                <span style={{ fontSize: "1rem", fontWeight: 900, color: chip.color }}>
                  {chip.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
