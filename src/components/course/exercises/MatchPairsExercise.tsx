"use client";

import { useState, useEffect } from "react";
import { MatchPairsData } from "@/lib/courseData";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

interface MatchPairsExerciseProps {
  data: MatchPairsData;
  onSubmit: () => void;
  isLocked?: boolean;
  onTutorStateChange?: (isTalking: boolean) => void;
}

export default function MatchPairsExercise({
  data,
  onSubmit,
  isLocked = false,
  onTutorStateChange,
}: MatchPairsExerciseProps) {
  const { speak, isSpeaking, hasEnded } = useSpeechSynthesis(
    data.speechScript || data.instruction,
    !isLocked
  );

  useEffect(() => {
    if (onTutorStateChange) onTutorStateChange(isSpeaking);
  }, [isSpeaking, onTutorStateChange]);

  const isInteractionDisabled = isLocked || isSpeaking || !hasEnded;

  const [leftItems,  setLeftItems]  = useState(data.pairs.map((p) => p.left));
  const [rightItems, setRightItems] = useState(data.pairs.map((p) => p.right));

  const [selectedLeft,  setSelectedLeft]  = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  const [matchedIds,   setMatchedIds]   = useState<string[]>([]);
  const [isErrorShake, setIsErrorShake] = useState(false);

  // Shuffle on mount
  useEffect(() => {
    setLeftItems((prev) => [...prev].sort(() => Math.random() - 0.5));
    setRightItems((prev) => [...prev].sort(() => Math.random() - 0.5));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
    setIsErrorShake(false);
  }, [data]);

  // Check match when both selected
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const isMatch = data.pairs.some(
        (p) => p.left.id === selectedLeft && p.right.id === selectedRight
      );

      if (isMatch) {
        setMatchedIds((prev) => [...prev, selectedLeft, selectedRight]);
        setSelectedLeft(null);
        setSelectedRight(null);
        new Audio("/chapterAudios/module1/Sounds/pass.mp3").play().catch(() => {});
      } else {
        setIsErrorShake(true);
        new Audio("/chapterAudios/module1/Sounds/fail.mp3").play().catch(() => {});
        const timer = setTimeout(() => {
          setIsErrorShake(false);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedLeft, selectedRight, data.pairs]);

  // Auto-complete when all matched
  useEffect(() => {
    if (
      matchedIds.length > 0 &&
      matchedIds.length === data.pairs.length * 2
    ) {
      const timer = setTimeout(() => onSubmit(), 600);
      return () => clearTimeout(timer);
    }
  }, [matchedIds.length, data.pairs.length, onSubmit]);

  const getChipStyle = (id: string, side: "left" | "right"): React.CSSProperties => {
    const isMatched  = matchedIds.includes(id);
    const isSelected = side === "left" ? selectedLeft === id : selectedRight === id;

    if (isMatched) {
      return {
        background: "var(--green-light)",
        borderColor: "var(--green)",
        color: "#2a6600",
        boxShadow: "none",
        opacity: 0.7,
        transform: "scale(0.97)",
      };
    }

    if (isSelected) {
      if (isErrorShake && selectedLeft && selectedRight) {
        return {
          background: "var(--red-light)",
          borderColor: "var(--red)",
          color: "var(--red-shadow)",
          boxShadow: "0 4px 0 var(--red-shadow)",
        };
      }
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

  const matchedCount = matchedIds.length / 2;
  const totalPairs   = data.pairs.length;

  return (
    <div
      className={`anim-fade-in ${isErrorShake ? "anim-shake" : ""}`}
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
            boxShadow:
              isSpeaking || isLocked ? "none" : "0 3px 0 var(--blue-shadow)",
            transition: "all 0.2s",
            opacity: isSpeaking || isLocked ? 0.5 : 1,
          }}
          title="Replay Audio"
        >
          🔊
        </button>
      </div>

      {/* ── Match progress pill ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        {Array.from({ length: totalPairs }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i < matchedCount ? "28px" : "10px",
              height: "10px",
              borderRadius: "999px",
              background:
                i < matchedCount ? "var(--green)" : "#e5e5e5",
              transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              flexShrink: 0,
            }}
          />
        ))}
        {matchedCount > 0 && (
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 800,
              color: "var(--green)",
              marginLeft: "4px",
            }}
          >
            {matchedCount}/{totalPairs} matched!
          </span>
        )}
      </div>

      {/* ── Pair columns ────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: "14px",
          alignItems: "stretch",
        }}
      >
        {/* Column divider hint */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "transparent",
            pointerEvents: "none",
          }}
        />

        {/* Left Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flex: 1,
          }}
        >
          {leftItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                if (isInteractionDisabled || matchedIds.includes(item.id))
                  return;
                if (item.audioUrl) {
                  new Audio(item.audioUrl)
                    .play()
                    .catch((err) => console.log("Audio error", err));
                } else if (item.audioText) {
                  speak(item.audioText);
                }
                setSelectedLeft(item.id);
              }}
              disabled={
                isInteractionDisabled || matchedIds.includes(item.id)
              }
              style={{
                ...getChipStyle(item.id, "left"),
                borderWidth: "2.5px",
                borderStyle: "solid",
                borderRadius: "18px",
                padding: "14px 12px",
                cursor:
                  isInteractionDisabled || matchedIds.includes(item.id)
                    ? "not-allowed"
                    : "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.05rem",
                transition: "all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
                animation: `optionCardIn 0.35s ease ${i * 0.07}s both`,
                opacity:
                  isInteractionDisabled
                    ? 0.65
                    : matchedIds.includes(item.id)
                    ? 0.7
                    : 1,
                minHeight: "68px",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {matchedIds.includes(item.id) && (
                <div
                  className="anim-checkmark-pop"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "var(--green)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 900,
                    zIndex: 5,
                  }}
                >
                  ✓
                </div>
              )}
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            flex: 1,
          }}
        >
          {rightItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                if (isInteractionDisabled || matchedIds.includes(item.id))
                  return;
                if (item.audioUrl) {
                  new Audio(item.audioUrl)
                    .play()
                    .catch((err) => console.log("Audio error", err));
                } else if (item.audioText) {
                  speak(item.audioText);
                }
                setSelectedRight(item.id);
              }}
              disabled={
                isInteractionDisabled || matchedIds.includes(item.id)
              }
              style={{
                ...getChipStyle(item.id, "right"),
                borderWidth: "2.5px",
                borderStyle: "solid",
                borderRadius: "18px",
                padding: "14px 12px",
                cursor:
                  isInteractionDisabled || matchedIds.includes(item.id)
                    ? "not-allowed"
                    : "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.05rem",
                transition: "all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
                animation: `optionCardIn 0.35s ease ${
                  (i + leftItems.length) * 0.07
                }s both`,
                opacity:
                  isInteractionDisabled
                    ? 0.65
                    : matchedIds.includes(item.id)
                    ? 0.7
                    : 1,
                minHeight: "68px",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {matchedIds.includes(item.id) && (
                <div
                  className="anim-checkmark-pop"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "var(--green)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 900,
                    zIndex: 5,
                  }}
                >
                  ✓
                </div>
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
