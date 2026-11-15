"use client";

import { useEffect } from "react";
import { MCQData } from "@/lib/courseData";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

interface MCQExerciseProps {
  data: MCQData;
  selectedAnswer: string | null;
  onSelect: (id: string) => void;
  onSubmit: () => void;
  phase: "lesson" | "success" | "fail";
  isShaking: boolean;
  isLocked?: boolean;
  onTutorStateChange?: (isTalking: boolean) => void;
}

export default function MCQExercise({
  data,
  selectedAnswer,
  onSelect,
  onSubmit,
  phase,
  isShaking,
  isLocked,
  onTutorStateChange,
}: MCQExerciseProps) {
  const { speak, isSpeaking, hasEnded } = useSpeechSynthesis(
    data.speechScript || data.question,
    !isLocked
  );

  useEffect(() => {
    if (onTutorStateChange) onTutorStateChange(isSpeaking);
  }, [isSpeaking, onTutorStateChange]);

  const isInteractionDisabled = isLocked || isSpeaking || !hasEnded;
  const canSubmit =
    selectedAnswer !== null && phase === "lesson" && !isInteractionDisabled;

  const getOptionStyle = (optionId: string): React.CSSProperties => {
    const isSelected = selectedAnswer === optionId;

    if (phase === "fail" && isSelected) {
      return {
        background: "var(--red-light)",
        borderColor: "var(--red)",
        color: "var(--red-shadow)",
        boxShadow: "0 5px 0 var(--red-shadow)",
        transform: "scale(1)",
      };
    }

    if (isSelected) {
      return {
        background: "var(--blue-light)",
        borderColor: "var(--blue)",
        color: "#0060a8",
        boxShadow: "0 5px 0 var(--blue-shadow)",
        transform: "scale(1.04)",
      };
    }

    return {
      background: "#fff",
      borderColor: "#e5e5e5",
      color: "#4b4b4b",
      boxShadow: "0 5px 0 #d0d0d0",
    };
  };

  return (
    <div
      className={`anim-fade-in ${isShaking ? "anim-shake" : ""}`}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "16px 18px 24px",
        gap: "14px",
      }}
    >
      {/* ── Instruction bubble ─────────────────────────────────────────────── */}
      <div className="exercise-instruction" style={{ marginTop: "48px" }}>
        <p>{data.question}</p>
        <button
          onClick={() => speak()}
          disabled={isSpeaking || !!isLocked}
          style={{
            flexShrink: 0,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background: isSpeaking || isLocked ? "#e5e5e5" : "var(--blue)",
            color: "#fff",
            fontSize: "1.1rem",
            cursor: isSpeaking || isLocked ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isSpeaking || isLocked ? "none" : "0 3px 0 var(--blue-shadow)",
            transition: "all 0.2s",
            opacity: isSpeaking || isLocked ? 0.5 : 1,
          }}
          title="Replay Audio"
        >
          🔊
        </button>
      </div>

      {/* ── Option grid ────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          alignContent: "center",
        }}
      >
        {data.options.map((option, i) => {
          const isSelected = selectedAnswer === option.id;
          const showCheck  = isSelected && phase !== "fail";
          const showCross  = isSelected && phase === "fail";

          return (
            <button
              key={option.id}
              onClick={() => {
                if (option.audioUrl) {
                  const audio = new Audio(option.audioUrl);
                  audio.play().catch((e) => console.error("Audio play failed", e));
                }
                if (phase === "lesson") onSelect(option.id);
              }}
              disabled={phase !== "lesson" || isInteractionDisabled}
              style={{
                ...getOptionStyle(option.id),
                borderWidth: "2.5px",
                borderStyle: "solid",
                borderRadius: "20px",
                padding: "14px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor:
                  phase === "lesson" && !isInteractionDisabled
                    ? "pointer"
                    : "not-allowed",
                opacity: isInteractionDisabled ? 0.6 : 1,
                transition:
                  "all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
                fontFamily: "var(--font-display)",
                minHeight: "88px",
                position: "relative",
                animation: `optionCardIn 0.35s ease ${i * 0.07}s both`,
              }}
            >
              {/* Feedback badge */}
              {showCheck && (
                <div
                  className="anim-checkmark-pop"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--blue)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    zIndex: 5,
                  }}
                >
                  ✓
                </div>
              )}
              {showCross && (
                <div
                  className="anim-checkmark-pop"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "var(--red)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    zIndex: 5,
                  }}
                >
                  ✕
                </div>
              )}

              {option.emoji && (
                <span style={{ fontSize: "2.4rem", lineHeight: 1 }}>
                  {option.emoji}
                </span>
              )}
              <span style={{ fontWeight: 800, fontSize: "1.2rem" }}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Submit button ──────────────────────────────────────────────────── */}
      <div className="exercise-action-bar">
        <button
          className={`btn-green${canSubmit ? " anim-continue-glow" : ""}`}
          onClick={onSubmit}
          disabled={!canSubmit}
          style={{
            width: "100%",
            fontSize: "1.15rem",
            padding: "1rem",
          }}
        >
          {phase === "lesson" ? "CHECK ✓" : "✓"}
        </button>
      </div>
    </div>
  );
}
