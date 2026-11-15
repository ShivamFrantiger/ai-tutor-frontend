"use client";

import Mascot from "../Mascot";

interface FailOverlayProps {
  onRetry: () => void;
}

export default function FailOverlay({ onRetry }: FailOverlayProps) {
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
          background: "linear-gradient(180deg, #ffd9d9 0%, #ffb3b3 100%)",
          borderTop: "4px solid var(--red)",
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
        <Mascot mood="encouraging" size={80} />

        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontSize: "2rem",
            fontWeight: 900,
            color: "#8a0000",
            margin: 0,
            lineHeight: 1,
          }}>
            Almost there! 💪
          </p>
          <p style={{ fontSize: "1rem", fontWeight: 700, color: "#b33300", margin: "8px 0 0" }}>
            Don&apos;t worry — try again, you&apos;ve got this!
          </p>
        </div>

        {/* Retry button */}
        <button
          className="btn-red"
          onClick={onRetry}
          style={{ width: "100%", maxWidth: "400px", fontSize: "1.2rem", padding: "1rem" }}
        >
          Try Again ↺
        </button>
      </div>
    </>
  );
}
