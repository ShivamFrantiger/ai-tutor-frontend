"use client";

import { useState, useEffect } from "react";
import { SpeakingAssessmentData } from "@/lib/courseData";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

interface SpeakingAssessmentProps {
  data: SpeakingAssessmentData;
  onContinue: (passed?: boolean) => void;
  isLocked?: boolean;
  onTutorStateChange?: (isTalking: boolean) => void;
}

export default function SpeakingAssessment({
  data,
  onContinue,
  isLocked,
  onTutorStateChange,
}: SpeakingAssessmentProps) {
  const [status, setStatus] = useState<
    "idle" | "recording" | "processing" | "evaluated"
  >("idle");
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [isPassed, setIsPassed] = useState(false);

  const { speak, isSpeaking, hasEnded } = useSpeechSynthesis(
    data.speechScript || data.instruction,
    !isLocked
  );
  const { isRecording, startRecording, stopRecording, audioBlob, error } =
    useAudioRecorder();

  useEffect(() => {
    if (onTutorStateChange) onTutorStateChange(isSpeaking);
  }, [isSpeaking, onTutorStateChange]);

  const isInteractionDisabled = isLocked || isSpeaking || !hasEnded;

  const handleRecordClick = () => {
    if (isInteractionDisabled) return;

    if (status === "idle" || status === "evaluated") {
      setStatus("recording");
      setAssessmentResult(null);
      setIsPassed(false);
      startRecording();
    } else if (status === "recording") {
      setStatus("processing");
      stopRecording();
    }
  };

  useEffect(() => {
    async function evaluateAudio() {
      if (status === "processing" && audioBlob) {
        try {
          const formData = new FormData();
          formData.append("word", data.expectedWord || data.instruction);
          formData.append("audio", audioBlob, "recording.wav");

          const res = await fetch("/api/pronunciation/word", {
            method: "POST",
            body: formData,
          });

          const result = await res.json();
          setAssessmentResult(result);

          if (result.error) {
            setIsPassed(false);
          } else {
            const isOverallGreen = result.score >= 50;
            const phonemes = result.phonemes || [];
            const allPhonemesGreen =
              phonemes.length > 0 &&
              phonemes.every((p: any) => p.score >= 50);
            setIsPassed(isOverallGreen && allPhonemesGreen);
          }
        } catch (err) {
          console.error("Audio evaluation failed:", err);
          setIsPassed(false);
        } finally {
          setStatus("evaluated");
        }
      }
    }
    evaluateAudio();
  }, [audioBlob, status, data.expectedWord, data.instruction]);

  const getStatusLabel = () => {
    if (status === "idle") return data.instruction;
    if (status === "recording") return "🎙️ Listening…";
    if (status === "processing") return "🔍 Checking…";
    if (status === "evaluated") {
      if (assessmentResult?.error) return "Oops!";
      return isPassed ? "🌟 Great job!" : "Try again!";
    }
    return data.instruction;
  };

  const recordBtnColor =
    isInteractionDisabled
      ? "#e5e5e5"
      : status === "processing"
      ? "#aaa"
      : status === "recording"
      ? "var(--red)"
      : "var(--blue)";

  const recordBtnShadow =
    isInteractionDisabled
      ? "#cccccc"
      : status === "processing"
      ? "#888"
      : status === "recording"
      ? "var(--red-shadow)"
      : "var(--blue-shadow)";

  return (
    <div
      className="anim-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: "16px 24px 28px",
        gap: "12px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        {/* ── Instruction / status text ───────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "12px 20px",
            background:
              status === "evaluated" && isPassed
                ? "rgba(88,204,2,0.1)"
                : status === "evaluated" && !isPassed
                ? "rgba(255,75,75,0.08)"
                : "var(--blue-light)",
            border: `2.5px solid ${
              status === "evaluated" && isPassed
                ? "var(--green)"
                : status === "evaluated" && !isPassed
                ? "var(--red)"
                : "var(--blue)"
            }`,
            borderRadius: "20px",
            transition: "all 0.3s ease",
            width: "100%",
            marginTop: "44px",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color:
                status === "evaluated" && isPassed
                  ? "var(--green-shadow)"
                  : status === "evaluated" && !isPassed
                  ? "var(--red-shadow)"
                  : "#0060a8",
              margin: 0,
              lineHeight: 1.3,
              textAlign: "center",
              flex: 1,
            }}
          >
            {getStatusLabel()}
          </p>
          {(status === "idle" || status === "evaluated") && (
            <button
              onClick={() => speak()}
              disabled={isSpeaking || !!isLocked}
              style={{
                flexShrink: 0,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                background:
                  isSpeaking || isLocked ? "#e5e5e5" : "var(--blue)",
                color: "#fff",
                fontSize: "1.1rem",
                cursor: isSpeaking || isLocked ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  isSpeaking || isLocked
                    ? "none"
                    : "0 3px 0 var(--blue-shadow)",
                transition: "all 0.2s",
                opacity: isSpeaking || isLocked ? 0.5 : 1,
              }}
              title="Replay Audio"
            >
              🔊
            </button>
          )}
        </div>

        {/* ── Big word display ────────────────────────────────────────────── */}
        {data.expectedWord && (
          <div
            className="anim-pop-in"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                fontSize: "4.5rem",
                fontWeight: 900,
                color: "#4b4b4b",
                fontFamily: "var(--font-display)",
                lineHeight: 1,
              }}
            >
              {data.expectedWord}
            </div>
          </div>
        )}

        {/* ── Phoneme result chips ─────────────────────────────────────────── */}
        {status === "evaluated" && assessmentResult?.phonemes && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {assessmentResult.phonemes.map((p: any, i: number) => {
              let bgColor = "#e5e5e5";
              if (p.score >= 50) bgColor = "var(--green)";
              else if (p.score >= 20) bgColor = "var(--orange, orange)";
              else bgColor = "var(--red)";

              return (
                <div
                  key={i}
                  className="anim-pop-in"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div
                    style={{
                      padding: "10px 18px",
                      borderRadius: "14px",
                      backgroundColor: bgColor,
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: "1.6rem",
                      boxShadow: "0 4px 0 rgba(0,0,0,0.15)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    /{p.expected}/
                  </div>
                  {p.spoken !== p.expected && (
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#888",
                        fontWeight: 700,
                      }}
                    >
                      said /{p.spoken}/
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Error */}
        {error && (
          <p style={{ color: "var(--red)", fontWeight: 800, margin: 0 }}>
            {error}
          </p>
        )}

        {/* ── Record button ────────────────────────────────────────────────── */}
        <div style={{ position: "relative", marginTop: "8px" }}>
          {/* Pulse rings when recording */}
          {status === "recording" && (
            <>
              <div className="record-pulse-ring" />
              <div className="record-pulse-ring" />
              <div className="record-pulse-ring" />
            </>
          )}
          <button
            onClick={handleRecordClick}
            disabled={isInteractionDisabled || status === "processing"}
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: recordBtnColor,
              border: "none",
              boxShadow: `0 8px 0 ${recordBtnShadow}, 0 16px 32px rgba(0,0,0,0.15)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor:
                isInteractionDisabled || status === "processing"
                  ? "not-allowed"
                  : "pointer",
              transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: status === "recording" ? "scale(1.05)" : "scale(1)",
              opacity: isInteractionDisabled ? 0.65 : 1,
              position: "relative",
              zIndex: 2,
            }}
          >
            {status === "processing" ? (
              /* Spinner */
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                  opacity=".25"
                  fill="#fff"
                />
                <path
                  d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                  fill="#fff"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="0.75s"
                    values="0 12 12;360 12 12"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            ) : status === "recording" ? (
              /* Stop square */
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
              />
            ) : (
              /* Mic icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            )}
          </button>
        </div>

        {/* Tap hint */}
        {status === "idle" && !isInteractionDisabled && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "#afafaf",
              fontWeight: 700,
              margin: 0,
              textAlign: "center",
            }}
          >
            Tap the mic to start recording
          </p>
        )}
        {status === "recording" && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--red)",
              fontWeight: 700,
              margin: 0,
              textAlign: "center",
            }}
          >
            Tap again to stop
          </p>
        )}
      </div>

      {/* ── Continue button ─────────────────────────────────────────────────── */}
      <div className="exercise-action-bar">
        <button
          className={isPassed ? "btn-green anim-continue-glow" : "btn-red"}
          onClick={() => onContinue(isPassed)}
          disabled={status !== "evaluated"}
          style={{
            width: "100%",
            fontSize: "1.2rem",
            padding: "1rem",
            opacity: status !== "evaluated" ? 0 : 1,
            transition: "opacity 0.35s ease",
          }}
        >
          {isPassed ? "Continue →" : "Try Again ↺"}
        </button>
      </div>
    </div>
  );
}
