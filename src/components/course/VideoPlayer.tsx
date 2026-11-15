"use client";

import { useRef, useState, useEffect } from "react";

export type VideoLayoutMode = "full" | "bubble";

interface VideoPlayerProps {
  title: string;
  subtitle?: string;
  isPlaying?: boolean;
  videoUrl?: string;
  onVideoEnded?: () => void;
  isTutorTalking?: boolean;
  layoutMode?: VideoLayoutMode;
  captionText?: string;
  onBubbleClick?: () => void;
  splitCaptionLayout?: boolean;
}

export default function VideoPlayer({
  title,
  subtitle,
  isPlaying = true,
  videoUrl,
  onVideoEnded,
  isTutorTalking = false,
  layoutMode = "full",
  captionText,
  onBubbleClick,
  splitCaptionLayout = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [prevLayoutMode, setPrevLayoutMode] = useState<VideoLayoutMode>(layoutMode);
  const [isAnimatingToBubble, setIsAnimatingToBubble] = useState(false);

  // Trigger mount animation
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  // Detect layout mode transitions for animation
  useEffect(() => {
    if (prevLayoutMode !== layoutMode) {
      if (layoutMode === "bubble") {
        setIsAnimatingToBubble(true);
        const t = setTimeout(() => setIsAnimatingToBubble(false), 600);
        return () => clearTimeout(t);
      }
      setPrevLayoutMode(layoutMode);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutMode]);

  useEffect(() => {
    setIsEnded(false);
  }, [videoUrl]);

  const handleEnded = () => {
    setIsEnded(true);
    if (onVideoEnded) onVideoEnded();
  };

  const handleReplay = () => {
    setIsEnded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((e) => console.log("Replay error", e));
    }
  };

  // ── BUBBLE MODE ────────────────────────────────────────────────────────────
  if (layoutMode === "bubble") {
    return (
      <div
        onClick={onBubbleClick}
        title="AI Tutor"
        style={{
          position: "absolute",
          top: "72px",
          right: "14px",
          width: "clamp(100px, 26vw, 130px)",
          height: "clamp(100px, 26vw, 130px)",
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid ${isTutorTalking ? "var(--green)" : "rgba(255,255,255,0.9)"}`,
          boxShadow: isTutorTalking
            ? "0 0 0 5px rgba(88,204,2,0.3), 0 6px 20px rgba(0,0,0,0.2)"
            : "0 6px 20px rgba(0,0,0,0.18), 0 0 0 3px rgba(255,255,255,0.5)",
          cursor: onBubbleClick ? "pointer" : "default",
          transition:
            "border-color 0.3s ease, box-shadow 0.3s ease",
          zIndex: 20,
          animation: isAnimatingToBubble
            ? "tutorBubblePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
            : undefined,
          flexShrink: 0,
        }}
      >
        {/* Idle video */}
        <video
          src="/tutorAnimations/idle.mp4"
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isTutorTalking ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        />
        {/* Talking video */}
        <video
          src="/tutorAnimations/talking.mp4"
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isTutorTalking ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />

        {/* Pulsing ring when talking */}
        {isTutorTalking && (
          <>
            <div className="record-pulse-ring" style={{ background: "rgba(88,204,2,0.25)" }} />
            <div className="record-pulse-ring" style={{ background: "rgba(88,204,2,0.15)", animationDelay: "0.4s" }} />
          </>
        )}
      </div>
    );
  }

  // ── FULL MODE: Explicit video URL (e.g. "Listen" chapters) ─────────────────
  if (videoUrl) {
    return (
      <div
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          playsInline
          onEnded={handleEnded}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Caption overlay */}
        {captionText && (
          <div
            key={captionText}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.72))",
              padding: "32px 20px 20px",
              animation: "captionFadeUp 0.3s ease-out forwards",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
                textAlign: "center",
                lineHeight: 1.35,
                fontFamily: "var(--font-display)",
              }}
            >
              {captionText}
            </p>
          </div>
        )}

        {/* Listen Again overlay */}
        {isEnded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.5)",
              zIndex: 20,
            }}
          >
            <button
              onClick={handleReplay}
              style={{
                padding: "12px 24px",
                borderRadius: "999px",
                background: "#fff",
                color: "#000",
                fontWeight: 800,
                border: "none",
                cursor: "pointer",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                fontFamily: "inherit",
                fontSize: "1rem",
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>↺</span> Listen Again
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── FULL MODE: Animated tutor avatar (default / text lessons) ──────────────
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          flex: splitCaptionLayout ? 0.6 : 1,
          background: "linear-gradient(180deg, #e8f4ff 0%, #f8fbff 100%)",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Idle video */}
        <video
          src="/tutorAnimations/idle.mp4"
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isTutorTalking ? 0 : 1,
            transition: "opacity 0.2s ease",
            zIndex: 1,
          }}
        />
        {/* Talking video */}
        <video
          src="/tutorAnimations/talking.mp4"
          autoPlay
          loop
          playsInline
          muted
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isTutorTalking ? 1 : 0,
            transition: "opacity 0.2s ease",
            zIndex: 1,
          }}
        />

        {/* Caption overlay in full mode (only if NOT split) */}
        {!splitCaptionLayout && captionText && (
          <div
            key={captionText}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              padding: "36px 20px 18px",
              zIndex: 4,
              animation: "captionFadeUp 0.3s ease-out forwards",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "1.35rem",
                fontWeight: 800,
                color: "#fff",
                textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                textAlign: "center",
                lineHeight: 1.35,
                fontFamily: "var(--font-display)",
              }}
            >
              {captionText}
            </p>
          </div>
        )}

        {/* Talking glow */}
        {isTutorTalking && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 50px rgba(88,204,2,0.12)",
              borderRadius: "inherit",
              zIndex: 2,
              pointerEvents: "none",
              animation: "pulseRing 1.8s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* Split caption area */}
      {splitCaptionLayout && (
        <div
          style={{
            flex: 0.4,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            position: "relative",
          }}
        >
          {captionText && (
            <div
              key={captionText}
              style={{
                animation: "captionFadeUp 0.3s ease-out forwards",
                width: "100%",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "2.2rem",
                  fontWeight: 900,
                  color: "var(--green)",
                  textAlign: "center",
                  lineHeight: 1.4,
                  fontFamily: "var(--font-display)",
                }}
              >
                {captionText}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
