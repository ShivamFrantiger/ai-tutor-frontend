"use client";

import { useEffect, useState } from "react";
import Mascot from "../Mascot";
import confetti from "canvas-confetti";

interface SuccessOverlayProps {
  onContinue: () => void;
}

const CONFETTI_COLORS = ["#58CC02", "#FFC800", "#1CB0F6", "#FF4B4B", "#A148E8", "#FF9600"];

export default function SuccessOverlay({ onContinue }: SuccessOverlayProps) {
  const [mascotBouncing, setMascotBouncing] = useState(false);

  useEffect(() => {
    // Fire canvas-confetti from bottom corners on mount
    const defaults = {
      zIndex: 100,
      colors: CONFETTI_COLORS,
    };

    // Left burst
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 80,
      angle: 60,
      startVelocity: 45,
      origin: { x: 0, y: 0.9 },
    });

    // Right burst
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 80,
      angle: 120,
      startVelocity: 45,
      origin: { x: 1, y: 0.9 },
    });

    setMascotBouncing(true);
    const t = setTimeout(() => setMascotBouncing(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
          zIndex: 40,
          animation: "fadeIn 0.25s ease forwards",
        }}
      />

      {/* Bottom panel */}
      <div
        className="anim-slide-in-up"
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          zIndex: 50,
          background: "linear-gradient(180deg, #d7ffb8 0%, #b0f060 100%)",
          borderTop: "4px solid var(--green)",
          borderRadius: "28px 28px 0 0",
          padding: "28px 28px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
        }}
      >
        {/* Mascot */}
        <div className={mascotBouncing ? "anim-mascot-bounce" : ""}>
          <Mascot mood="celebrating" size={80} />
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontSize: "2rem",
            fontWeight: 900,
            color: "#2a6600",
            margin: 0,
            lineHeight: 1,
          }}>
            Correct! 🎉
          </p>
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "#3a8800", margin: "8px 0 0" }}>
            Amazing job! Keep going! ✨
          </p>
        </div>

        {/* Stars */}
        <div style={{ display: "flex", gap: "8px" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="anim-star-pop"
              style={{
                fontSize: "1.8rem",
                animationDelay: `${0.15 + i * 0.12}s`,
                opacity: 0,
                display: "inline-block",
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Continue button */}
        <button
          className="btn-green"
          onClick={onContinue}
          style={{ width: "100%", maxWidth: "400px", fontSize: "1.2rem", padding: "1rem" }}
        >
          Continue →
        </button>
      </div>
    </>
  );
}
