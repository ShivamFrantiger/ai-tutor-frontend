"use client";

import { useEffect } from "react";
import { TapWordData } from "@/lib/courseData";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

interface TapWordExerciseProps {
  data: TapWordData;
  selectedWords: string[];
  onToggleWord: (id: string) => void;
  onSubmit: () => void;
  phase: "lesson" | "success" | "fail";
  isShaking: boolean;
  isLocked?: boolean;
  onTutorStateChange?: (isTalking: boolean) => void;
}

export default function TapWordExercise({
  data,
  selectedWords,
  onToggleWord,
  onSubmit,
  phase,
  isShaking,
  isLocked = false,
  onTutorStateChange,
}: TapWordExerciseProps) {
  const { speak, isSpeaking, hasEnded } = useSpeechSynthesis(
    data.speechScript || data.instruction,
    !isLocked
  );

  useEffect(() => {
    if (onTutorStateChange) onTutorStateChange(isSpeaking);
  }, [isSpeaking, onTutorStateChange]);

  const isInteractionDisabled = isLocked || isSpeaking || !hasEnded;
  const canSubmit =
    selectedWords.length > 0 && phase === "lesson" && !isInteractionDisabled;

  const getChipStyle = (wordId: string): React.CSSProperties => {
    const isSelected = selectedWords.includes(wordId);
    const isCorrect  = data.correctIds.includes(wordId);

    if (phase === "fail") {
      if (isSelected && !isCorrect) {
        return {
          background: "var(--red-light)",
          borderColor: "var(--red)",
          color: "var(--red-shadow)",
          boxShadow: "0 4px 0 var(--red-shadow)",
        };
      }
      if (isCorrect) {
        return {
          background: "var(--green-light)",
          borderColor: "var(--green)",
          color: "#2a6600",
          boxShadow: "0 4px 0 var(--green-shadow)",
        };
      }
    }

    if (isSelected) {
      return {
        background: "var(--blue-light)",
        borderColor: "var(--blue)",
        color: "#0060a8",
        boxShadow: "0 4px 0 var(--blue-shadow)",
        transform: "scale(1.06)",
      };
    }

    return {
      background: "#fff",
      borderColor: "#e5e5e5",
      color: "#4b4b4b",
      boxShadow: "0 4px 0 #d0d0d0",
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
        gap: "12px",
      }}
    >
      {/* ── Instruction bubble ─────────────────────────────────────────────── */}
      <div className="exercise-instruction" style={{ marginTop: "48px" }}>
        <p>{data.instruction}</p>
        <button
          onClick={() => speak()}
          disabled={isSpeaking || isLocked}
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

      {/* ── Selection count hint ────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#afafaf",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Tap words that contain the sound
        </p>
        {selectedWords.length > 0 && (
          <div
            className="anim-pop-in"
            style={{
              background: "var(--blue)",
              color: "#fff",
              borderRadius: "999px",
              fontSize: "0.8rem",
              fontWeight: 800,
              padding: "2px 10px",
              flexShrink: 0,
            }}
          >
            {selectedWords.length} selected
          </div>
        )}
      </div>

      {/* ── Word chip grid ──────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          alignContent: "center",
        }}
      >
        {data.words.map((word, i) => {
          const isSelected = selectedWords.includes(word.id);
          const isCorrect  = data.correctIds.includes(word.id);
          const showCheck  = phase === "fail" && isCorrect;
          const showCross  = phase === "fail" && isSelected && !isCorrect;

          return (
            <button
              key={word.id}
              onClick={() => {
                if (phase === "lesson" && !isInteractionDisabled) {
                  onToggleWord(word.id);
                  if (word.audioUrl) {
                    const audio = new Audio(word.audioUrl);
                    audio.play().catch((err) =>
                      console.log("Audio play error:", err)
                    );
                  } else {
                    speak(word.id);
                  }
                }
              }}
              disabled={phase !== "lesson" || isInteractionDisabled}
              style={{
                ...getChipStyle(word.id),
                borderWidth: "2.5px",
                borderStyle: "solid",
                borderRadius: "18px",
                padding: "12px 6px",
                cursor:
                  phase === "lesson" && !isInteractionDisabled
                    ? "pointer"
                    : "not-allowed",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1rem",
                transition: "all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
                animation: `optionCardIn 0.35s ease ${i * 0.06}s both`,
                minHeight: "72px",
                opacity: isInteractionDisabled ? 0.6 : 1,
                position: "relative",
              }}
            >
              {/* Feedback badge */}
              {showCheck && (
                <div
                  className="anim-checkmark-pop"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "var(--green)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 900,
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
                    top: "-8px",
                    right: "-8px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "var(--red)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 900,
                    zIndex: 5,
                  }}
                >
                  ✕
                </div>
              )}
              {word.label}
            </button>
          );
        })}
      </div>

      {/* ── Submit button ───────────────────────────────────────────────────── */}
      <div className="exercise-action-bar">
        <button
          className={`btn-green${canSubmit ? " anim-continue-glow" : ""}`}
          onClick={onSubmit}
          disabled={!canSubmit}
          style={{ width: "100%", fontSize: "1.15rem", padding: "1rem" }}
        >
          Check Answers ✓
        </button>
      </div>
    </div>
  );
}
