"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { TextLessonData } from "@/lib/courseData";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";

interface TextLessonProps {
  data: TextLessonData;
  onContinue: () => void;
  isLocked?: boolean;
  onTutorStateChange?: (isTalking: boolean) => void;
  /** Called whenever the caption sentence changes — for the VideoPlayer overlay */
  onCaptionChange?: (text: string) => void;
}

export default function TextLesson({
  data,
  onContinue,
  isLocked,
  onTutorStateChange,
  onCaptionChange,
}: TextLessonProps) {
  const { speak, isSpeaking, hasEnded, charIndex } = useSpeechSynthesis(
    data.speechScript,
    !isLocked
  );

  // ── Sentence parsing for captions ─────────────────────────────────────────
  const sentenceData = useMemo(() => {
    if (!data.speechScript) return [];
    const matches =
      data.speechScript.match(/[^.!?]+[.!?]+/g) || [data.speechScript];
    let currentIndex = 0;
    return matches.map((s) => {
      const start = data.speechScript!.indexOf(s, currentIndex);
      const end = start + s.length;
      currentIndex = end;
      return { text: s.trim(), start, end };
    });
  }, [data.speechScript]);

  const currentSentence = useMemo(() => {
    if (!isSpeaking && hasEnded)
      return sentenceData[sentenceData.length - 1]?.text || "";
    if (!isSpeaking && !hasEnded) return sentenceData[0]?.text || "";

    const active = sentenceData.find(
      (s) => charIndex >= s.start && charIndex <= s.end + 2
    );
    return active
      ? active.text
      : sentenceData[sentenceData.length - 1]?.text || "";
  }, [charIndex, sentenceData, isSpeaking, hasEnded]);

  // Lift caption text up to VideoPlayer via parent callback
  useEffect(() => {
    if (onCaptionChange) {
      onCaptionChange(currentSentence);
    }
  }, [currentSentence, onCaptionChange]);

  // Clear caption when speech ends and we're about to move on
  useEffect(() => {
    if (hasEnded && !isSpeaking && onCaptionChange) {
      // Keep the last sentence visible until continue
    }
  }, [hasEnded, isSpeaking, onCaptionChange]);

  // ── Audio playback ─────────────────────────────────────────────────────────
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hasAudioEnded,  setHasAudioEnded]  = useState(!data.audioUrl);
  const [playingIndex,   setPlayingIndex]   = useState<number>(-1);
  const audioSequenceRef = useRef<number>(0);

  const playAudioSequence = async () => {
    if (!data.audioUrl) return;

    const currentSeq = ++audioSequenceRef.current;
    setIsPlayingAudio(true);
    setHasAudioEnded(false);

    const count = data.playCount || 1;

    for (let i = 0; i < count; i++) {
      if (currentSeq !== audioSequenceRef.current) return;

      if (data.phonemes && data.phonemes.length > 0) {
        for (let p = 0; p < data.phonemes.length; p++) {
          if (currentSeq !== audioSequenceRef.current) return;
          setPlayingIndex(p);
          const pAudio = new Audio(data.phonemes[p].audioUrl);
          await new Promise<void>((resolve) => {
            pAudio.onended = () => resolve();
            pAudio.onerror = () => resolve();
            pAudio.play().catch(() => resolve());
          });
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
        if (currentSeq !== audioSequenceRef.current) return;
        setPlayingIndex(data.phonemes.length);
      }

      const audio = new Audio(data.audioUrl);
      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      });

      if (i < count - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (currentSeq === audioSequenceRef.current) {
      setPlayingIndex(-1);
      setIsPlayingAudio(false);
      setHasAudioEnded(true);
    }
  };

  useEffect(() => {
    const shouldPlayAudio = data.speechScript ? hasEnded : !isLocked;

    if (
      data.audioUrl &&
      shouldPlayAudio &&
      !hasAudioEnded &&
      !isPlayingAudio &&
      audioSequenceRef.current === 0
    ) {
      playAudioSequence();
    }
  }, [
    hasEnded,
    isLocked,
    data.speechScript,
    data.audioUrl,
    hasAudioEnded,
    isPlayingAudio,
  ]);

  useEffect(() => {
    if (onTutorStateChange) {
      onTutorStateChange(isSpeaking || isPlayingAudio);
    }
  }, [isSpeaking, isPlayingAudio, onTutorStateChange]);

  const handleReplay = () => {
    setPlayingIndex(-1);
    if (data.speechScript) {
      speak();
      setHasAudioEnded(false);
      audioSequenceRef.current = 0;
    } else {
      playAudioSequence();
    }
  };

  const isListenLesson =
    !!data.audioUrl || (!!data.phonemes && data.phonemes.length > 0);
  const isActive       = isSpeaking || isPlayingAudio;
  const isContinueDisabled =
    isLocked ||
    isSpeaking ||
    isPlayingAudio ||
    (!!data.speechScript && !hasEnded) ||
    (!!data.audioUrl && !hasAudioEnded);

  // Auto-advance for purely informational lessons (no audio / listen)
  useEffect(() => {
    if (!isListenLesson && !isContinueDisabled) {
      const timer = setTimeout(() => {
        onContinue();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isListenLesson, isContinueDisabled, onContinue]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="anim-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100%",
        overflowY: "auto",
        padding: "clamp(12px, 3vw, 20px) clamp(16px, 4vw, 24px) clamp(16px, 3vw, 28px)",
        gap: "clamp(8px, 2vw, 12px)",
        boxSizing: "border-box",
      }}
    >
      {/* Content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(12px, 3vw, 20px)",
          width: "100%",
        }}
      >
        {/* ── Large letter tile ──────────────────────────────────────────────── */}
        {data.letter && (
          <div
            className="anim-pop-in"
            style={{
              width: "clamp(90px, 22vw, 130px)",
              height: "clamp(90px, 22vw, 130px)",
              borderRadius: "32px",
              background: data.letterColor ?? "var(--green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 8px 0 ${
                data.letterColor ? data.letterColor + "aa" : "var(--green-shadow)"
              }, 0 16px 32px ${
                data.letterColor ? data.letterColor + "40" : "rgba(88,204,2,0.25)"
              }`,
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* Shine */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "12px",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.28)",
              }}
            />
            <span
              style={{
                fontSize: "clamp(2.8rem, 8vw, 5rem)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1,
                fontFamily: "var(--font-display)",
              }}
            >
              {data.letter}
            </span>
          </div>
        )}

        {/* ── Floating emoji (when no letter) ────────────────────────────────── */}
        {!data.letter &&
          data.emoji &&
          (!data.phonemes || data.phonemes.length === 0) && (
            <div
              className="anim-float-bounce"
              style={{ fontSize: "clamp(3.5rem, 12vw, 5.5rem)", lineHeight: 1 }}
            >
              {data.emoji}
            </div>
          )}

        {/* ── Phoneme display ────────────────────────────────────────────────── */}
        {data.phonemes && data.phonemes.length > 0 ? (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(10px, 2.5vw, 16px)",
            }}
          >
            {/* Main word */}
            <div
              style={{
                fontSize: "clamp(2.8rem, 10vw, 4.8rem)",
                fontWeight: 900,
                color:
                  playingIndex === data.phonemes.length
                    ? "var(--green)"
                    : "#4b4b4b",
                transition: "color 0.2s, transform 0.2s",
                transform:
                  playingIndex === data.phonemes.length
                    ? "scale(1.1)"
                    : "scale(1)",
                fontFamily: "var(--font-display)",
              }}
            >
              {data.content}
            </div>

            {/* Phoneme chips */}
            <div
              style={{
                display: "flex",
                gap: "clamp(8px, 2vw, 12px)",
                alignItems: "center",
                padding: "clamp(10px, 2.5vw, 14px) clamp(14px, 3.5vw, 20px)",
                background: "#f0f9ff",
                borderRadius: "20px",
                border: "2.5px solid #c8e8ff",
              }}
            >
              {data.phonemes.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                    fontWeight: 800,
                    color: playingIndex === idx ? "var(--blue)" : "#7c7c7c",
                    transition: "color 0.2s, transform 0.2s",
                    transform: playingIndex === idx ? "scale(1.15)" : "scale(1)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {p.label}
                </div>
              ))}
            </div>

            {/* Replay button */}
            {isListenLesson && (data.speechScript || data.audioUrl) && (
              <button
                onClick={handleReplay}
                disabled={isActive || !!isLocked}
                style={{
                  background: isActive ? "#f0f0f0" : "var(--blue)",
                  border: "none",
                  cursor: isActive || isLocked ? "default" : "pointer",
                  fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                  padding: "clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 28px)",
                  borderRadius: "999px",
                  fontWeight: 800,
                  color: isActive ? "#aaa" : "#fff",
                  opacity: isActive || isLocked ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s",
                  boxShadow: isActive || isLocked ? "none" : "0 4px 0 var(--blue-shadow)",
                  fontFamily: "var(--font-display)",
                }}
              >
                🔊 {isActive ? "Playing…" : "Replay"}
              </button>
            )}
          </div>
        ) : (
          /* ── Simple content (speech script / sub-content / emoji + replay) ── */
          <div
            style={{
              textAlign: "center",
              maxWidth: "440px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(12px, 3vw, 20px)",
            }}
          >
            {/* No speech script but has subContent */}
            {!data.speechScript && data.subContent && (
              <p
                style={{
                  fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
                  fontWeight: 700,
                  color: "#4b4b4b",
                  margin: 0,
                  lineHeight: 1.35,
                }}
              >
                {data.subContent}
              </p>
            )}

            {/* Replay button for listen lessons */}
            {isListenLesson && (data.speechScript || data.audioUrl) && (
              <button
                onClick={handleReplay}
                disabled={isActive || !!isLocked}
                style={{
                  background: isActive ? "#f0f0f0" : "var(--blue)",
                  border: "none",
                  cursor: isActive || isLocked ? "default" : "pointer",
                  fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                  padding: "clamp(10px, 2.5vw, 14px) clamp(22px, 6vw, 36px)",
                  borderRadius: "999px",
                  fontWeight: 800,
                  color: isActive ? "#999" : "#fff",
                  opacity: isActive || isLocked ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.2s",
                  boxShadow: isActive || isLocked ? "none" : "0 4px 0 var(--blue-shadow)",
                  fontFamily: "var(--font-display)",
                }}
              >
                🔊 {isActive ? "Playing…" : "Replay"}
              </button>
            )}
          </div>
        )}

        {/* Emoji below the letter tile */}
        {data.letter && data.emoji && (
          <div
            className="anim-float-bounce"
            style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", lineHeight: 1, animationDelay: "0.3s" }}
          >
            {data.emoji}
          </div>
        )}
      </div>

      {/* ── Continue button ────────────────────────────────────────────────── */}
      {isListenLesson && (
        <button
          className={`btn-green${!isContinueDisabled ? " anim-continue-glow" : ""}`}
          onClick={onContinue}
          disabled={isContinueDisabled}
          style={{
            width: "100%",
            maxWidth: "400px",
            fontSize: "clamp(1rem, 3vw, 1.2rem)",
            padding: "clamp(0.8rem, 2.5vw, 1.1rem)",
            opacity: isContinueDisabled ? 0.55 : 1,
            cursor: isContinueDisabled ? "not-allowed" : "pointer",
            transition: "opacity 0.4s ease",
            flexShrink: 0,
          }}
        >
          Continue →
        </button>
      )}
    </div>
  );
}
