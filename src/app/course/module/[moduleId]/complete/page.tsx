"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Mascot from "@/components/course/Mascot";

interface ConfettiParticle {
  id: number;
  color: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  isCircle: boolean;
}

const COLORS = ["#58CC02", "#FFC800", "#1CB0F6", "#FF4B4B", "#A148E8", "#FF9600"];

export default function ModuleCompletePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const [starsVisible, setStarsVisible] = useState(false);
  const [trophyVisible, setTrophyVisible] = useState(false);
  const [mascotBounce, setMascotBounce] = useState(false);

  useEffect(() => {
    new Audio("/chapterAudios/module1/Sounds/moduleOver.mp3").play().catch(e => console.log("Audio play error:", e));

    // Stagger the celebrations
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: Math.random() * 100,
        delay: Math.random() * 1.8,
        duration: 2 + Math.random() * 1.5,
        size: 8 + Math.random() * 10,
        isCircle: i % 3 !== 0,
      }))
    );

    const t1 = setTimeout(() => setTrophyVisible(true), 200);
    const t2 = setTimeout(() => setStarsVisible(true), 600);
    const t3 = setTimeout(() => setMascotBounce(true), 800);
    const t4 = setTimeout(() => setMascotBounce(false), 1700);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div style={{
      height: "100dvh",
      width: "100%",
      background: "linear-gradient(160deg, #fff8cc 0%, #ffeaa7 40%, #dff9fb 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 24px",
      fontFamily: "var(--font-display)",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Confetti */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10, overflow: "hidden" }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute", top: "-20px",
              left: `${p.left}%`,
              width: p.size, height: p.isCircle ? p.size : p.size * 0.45,
              borderRadius: p.isCircle ? "50%" : "3px",
              background: p.color,
              animation: `confettiFall ${p.duration}s linear ${p.delay}s forwards, confettiWiggle 0.5s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div style={{ zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

        {/* Trophy */}
        <div
          style={{
            fontSize: "6rem",
            lineHeight: 1,
            opacity: trophyVisible ? 1 : 0,
            animation: trophyVisible ? "trophy 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" : "none",
          }}
        >
          🏆
        </div>

        {/* Stars */}
        <div style={{ display: "flex", gap: "10px", height: "48px", alignItems: "center" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                fontSize: "2.5rem",
                display: "inline-block",
                opacity: starsVisible ? 1 : 0,
                animation: starsVisible ? `starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + i * 0.15}s both` : "none",
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Heading */}
        <h1
          className="anim-fade-in"
          style={{
            fontSize: "clamp(2rem, 7vw, 3rem)",
            fontWeight: 900,
            color: "#5a3a00",
            textAlign: "center",
            margin: "8px 0 0",
            lineHeight: 1.1,
            animationDelay: "0.4s",
          }}
        >
          Module Complete! 🎉
        </h1>

        {/* Subheading */}
        <p
          className="anim-fade-in"
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#7a5700",
            textAlign: "center",
            margin: 0,
            maxWidth: "320px",
            lineHeight: 1.4,
            animationDelay: "0.5s",
          }}
        >
          You&apos;ve mastered the &apos;A&apos; sound! Amazing work! 🍎
        </p>

        {/* Mascot */}
        <div className={mascotBounce ? "anim-mascot-bounce" : ""} style={{ marginTop: "4px" }}>
          <Mascot mood="celebrating" size={110} />
        </div>

        {/* XP badge */}
        <div
          className="anim-pop-in"
          style={{
            background: "var(--yellow)",
            borderRadius: "20px",
            padding: "12px 28px",
            boxShadow: "0 6px 0 var(--yellow-shadow)",
            textAlign: "center",
            animationDelay: "0.8s",
            opacity: 0,
          }}
        >
          <p style={{ margin: 0, fontSize: "0.8rem", fontWeight: 800, color: "#5a3a00", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            XP Earned
          </p>
          <p style={{ margin: "2px 0 0", fontSize: "2.2rem", fontWeight: 900, color: "#3a2000", lineHeight: 1 }}>
            +100
          </p>
        </div>

        {/* Next Module button (disabled — coming soon) */}
        <div style={{ marginTop: "8px", width: "100%", maxWidth: "360px" }}>
          <button
            className="btn-green"
            disabled
            style={{ width: "100%", fontSize: "1.15rem", padding: "1rem", position: "relative" }}
          >
            Next Module
            <span style={{
              position: "absolute", top: "-10px", right: "12px",
              background: "var(--blue)",
              color: "#fff",
              fontSize: "0.65rem",
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: "999px",
              letterSpacing: "0.5px",
            }}>
              COMING SOON
            </span>
          </button>
        </div>

        {/* Back to home */}
        <Link
          href="/"
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#afafaf",
            textDecoration: "none",
          }}
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
