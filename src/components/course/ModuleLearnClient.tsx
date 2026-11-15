"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Module } from "@/lib/courseData";

import ProgressBar        from "./ProgressBar";
import VideoPlayer        from "./VideoPlayer";
import type { VideoLayoutMode } from "./VideoPlayer";
import TextLesson         from "./exercises/TextLesson";
import MCQExercise        from "./exercises/MCQExercise";
import TapWordExercise    from "./exercises/TapWordExercise";
import SpeakingAssessment from "./exercises/SpeakingAssessment";
import MatchPairsExercise from "./exercises/MatchPairsExercise";
import SuccessOverlay     from "./feedback/SuccessOverlay";
import FailOverlay        from "./feedback/FailOverlay";
import { prefetchTTS }    from "@/lib/ttsCache";

// Helper: extract all text-chunk strings from a speechScript
function getTextChunks(script: string): string[] {
  return script.split(/\/[^\/]+\//g)
    .map((s) => s.trim())
    .filter((s) => s && !/^[^a-zA-Z0-9]+$/.test(s));
}

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = "lesson" | "success" | "fail";

interface ModuleLearnClientProps {
  module: Module;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ModuleLearnClient({ module }: ModuleLearnClientProps) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const initialChapterIndex = (() => {
    const chapterParam = searchParams.get("chapter");
    if (!chapterParam) return 0;
    const parsed = parseInt(chapterParam, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= module.chapters.length) {
      return parsed - 1;
    }
    return 0;
  })();

  // ── State ──────────────────────────────────────────────────────────────────
  const [currentChapterIndex, setCurrentChapterIndex] = useState(initialChapterIndex);
  const [currentScreenIndex,  setCurrentScreenIndex]  = useState(0);

  const [phase,          setPhase]          = useState<Phase>("lesson");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedWords,  setSelectedWords]  = useState<string[]>([]);
  const [isShaking,      setIsShaking]      = useState(false);
  const [isTutorTalking, setIsTutorTalking] = useState(false);

  // Caption state — lifted from TextLesson so VideoPlayer can show it
  const [captionText, setCaptionText] = useState("");

  const chapter = module.chapters[currentChapterIndex];
  const screen  = chapter?.screens[currentScreenIndex];

  const [isVideoFinished, setIsVideoFinished] = useState(!screen?.videoUrl);

  const totalChapters = module.chapters.length;
  const totalScreens  = chapter?.screens.length || 0;

  // ── Derive layout mode from exercise type ──────────────────────────────────
  const layoutMode: VideoLayoutMode =
    screen?.exercise.type === "text-lesson" ? "full" : "bubble";

  // Is this a listen lesson (has audio/phonemes → needs replay + continue button below)?
  const isListenLesson =
    screen?.exercise.type === "text-lesson" &&
    !!(screen.exercise.audioUrl || (screen.exercise.phonemes && screen.exercise.phonemes.length > 0));

  // Is this a pure speech lesson (NO visual content for the bottom panel)?
  const isPureSpeechLesson =
    screen?.exercise.type === "text-lesson" &&
    !isListenLesson &&
    !screen.exercise.letter &&
    !screen.exercise.emoji &&
    !screen.exercise.subContent;

  // Full-mode video height
  const videoFullHeight = isListenLesson ? "min(52vh, 320px)" : "min(72vh, 460px)";

  // Track previous layout mode for animating transitions
  const prevLayoutModeRef = useRef<VideoLayoutMode>(layoutMode);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (prevLayoutModeRef.current !== layoutMode) {
      setIsTransitioning(true);
      const t = setTimeout(() => {
        setIsTransitioning(false);
        prevLayoutModeRef.current = layoutMode;
      }, 550);
      return () => clearTimeout(t);
    }
  }, [layoutMode]);

  useEffect(() => {
    setIsVideoFinished(!screen?.videoUrl);
  }, [screen]);

  useEffect(() => {
    // Caption clearing is now handled by resetExercise when navigating,
    // so we don't clear it here on mount which would overwrite TextLesson's initial caption.
  }, [screen]);

  useEffect(() => {
    if (phase === "success") {
      new Audio("/chapterAudios/module1/Sounds/pass.mp3").play().catch((e) =>
        console.log("Audio play error:", e)
      );
    } else if (phase === "fail") {
      new Audio("/chapterAudios/module1/Sounds/fail.mp3").play().catch((e) =>
        console.log("Audio play error:", e)
      );
    }
  }, [phase]);

  // ── TTS Prefetching ────────────────────────────────────────────────────────
  useEffect(() => {
    // 1. Prefetch CURRENT screen (handles Module 1 Ch 1 on mount)
    const currentScript = screen?.exercise?.speechScript;
    if (currentScript) getTextChunks(currentScript).forEach(prefetchTTS);

    // 2. Prefetch NEXT screen in same chapter
    const nextScreen = chapter?.screens[currentScreenIndex + 1];
    const nextScript = nextScreen?.exercise?.speechScript;
    if (nextScript) getTextChunks(nextScript).forEach(prefetchTTS);

    // 3. Prefetch FIRST screen of NEXT chapter
    const nextChapter = module.chapters[currentChapterIndex + 1];
    const nextChapterFirstScript = nextChapter?.screens[0]?.exercise?.speechScript;
    if (nextChapterFirstScript) getTextChunks(nextChapterFirstScript).forEach(prefetchTTS);
  }, [currentChapterIndex, currentScreenIndex, screen, chapter, module.chapters]);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  const resetExercise = useCallback(() => {
    setPhase("lesson");
    setSelectedAnswer(null);
    setSelectedWords([]);
    setIsTutorTalking(false);
    setCaptionText("");
  }, []);

  // ── Navigation ─────────────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    if (currentScreenIndex < totalScreens - 1) {
      setCurrentScreenIndex((prev) => prev + 1);
      resetExercise();
    } else {
      if (currentChapterIndex < totalChapters - 1) {
        setCurrentChapterIndex((prev) => prev + 1);
        setCurrentScreenIndex(0);
        resetExercise();
      } else {
        router.push(`/course/module/${module.id}/complete`);
      }
    }
  }, [
    currentScreenIndex,
    totalScreens,
    currentChapterIndex,
    totalChapters,
    module.id,
    router,
    resetExercise,
  ]);

  const goBack = useCallback(() => {
    router.push(`/course/module/${module.id}`);
  }, [module.id, router]);

  // ── Submission logic ───────────────────────────────────────────────────────

  const handleSubmit = useCallback(() => {
    if (!screen) return;
    const ex = screen.exercise;

    if (ex.type === "mcq") {
      if (selectedAnswer === ex.correctId) {
        setPhase("success");
      } else {
        triggerShake();
        setPhase("fail");
      }
    } else if (ex.type === "tap-word") {
      const correct  = ex.correctIds.slice().sort();
      const selected = selectedWords.slice().sort();
      const isCorrect =
        correct.length === selected.length &&
        correct.every((id, i) => id === selected[i]);

      if (isCorrect) {
        setPhase("success");
      } else {
        triggerShake();
        setPhase("fail");
      }
    }
  }, [screen, selectedAnswer, selectedWords]);

  const handleSpeakingSubmit = useCallback((passed: boolean = true) => {
    if (passed) {
      setPhase("success");
    } else {
      triggerShake();
      setPhase("fail");
    }
  }, []);

  // ── Toggle tap-word chip ───────────────────────────────────────────────────

  const toggleWord = useCallback((id: string) => {
    setSelectedWords((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  if (!screen || !chapter) return null;
  const ex = screen.exercise;

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "linear-gradient(180deg, #eaf6ff 0%, #f8fbff 40%, #ffffff 100%)",
        maxWidth: "600px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* ── Progress Bar ────────────────────────────────────────────────────── */}
      <ProgressBar
        current={currentScreenIndex + 1}
        total={totalScreens}
        onClose={goBack}
      />

      {/* ── Video Area — morphs between full and bubble ──────────────────────
          In "full" mode it occupies a fixed height block.
          In "bubble" mode the block collapses to 0 and VideoPlayer is
          rendered in absolute/fixed position by its own bubble style.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          height: layoutMode === "full" && !isPureSpeechLesson ? videoFullHeight : layoutMode === "full" ? "auto" : "0px",
          flexGrow: layoutMode === "full" && isPureSpeechLesson ? 1 : 0,
          flexShrink: 0,
          flexBasis: layoutMode === "full" && isPureSpeechLesson ? "0%" : "auto",
          overflow: layoutMode === "full" ? "hidden" : "visible",
          transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
        }}
      >
        {layoutMode === "full" && (
          <VideoPlayer
            title={screen.videoTitle}
            subtitle={screen.videoSubtitle}
            isPlaying={phase === "lesson"}
            videoUrl={screen.videoUrl}
            onVideoEnded={() => setIsVideoFinished(true)}
            isTutorTalking={isTutorTalking}
            layoutMode="full"
            captionText={captionText}
            splitCaptionLayout={isPureSpeechLesson}
          />
        )}
      </div>

      {/* Floating bubble — rendered when in assessment mode */}
      {layoutMode === "bubble" && (
        <VideoPlayer
          title={screen.videoTitle}
          isPlaying={phase === "lesson"}
          isTutorTalking={isTutorTalking}
          layoutMode="bubble"
          onBubbleClick={() => {
            /* Could replay instruction — no-op for now */
          }}
        />
      )}

      {/* ── Exercise Area ────────────────────────────────────────────────────── */}
      <div
        key={screen.id}
        className="anim-screen-slide-right"
        style={{
          flex: 1,
          overflow: "hidden",
          minHeight: 0,
          borderTop: layoutMode === "full" && !isPureSpeechLesson ? "2.5px solid rgba(0,0,0,0.06)" : "none",
          background: "transparent",
          position: "relative",
          display: isPureSpeechLesson ? "none" : "flex",
          flexDirection: "column",
        }}
      >
        {ex.type === "text-lesson" && (
          <TextLesson
            data={ex}
            onContinue={goNext}
            isLocked={!isVideoFinished}
            onTutorStateChange={setIsTutorTalking}
            onCaptionChange={setCaptionText}
          />
        )}

        {ex.type === "mcq" && (
          <MCQExercise
            data={ex}
            selectedAnswer={selectedAnswer}
            onSelect={setSelectedAnswer}
            onSubmit={handleSubmit}
            phase={phase}
            isShaking={isShaking}
            isLocked={!isVideoFinished}
            onTutorStateChange={setIsTutorTalking}
          />
        )}

        {ex.type === "tap-word" && (
          <TapWordExercise
            data={ex}
            selectedWords={selectedWords}
            onToggleWord={toggleWord}
            onSubmit={handleSubmit}
            phase={phase}
            isShaking={isShaking}
            isLocked={!isVideoFinished}
            onTutorStateChange={setIsTutorTalking}
          />
        )}

        {ex.type === "speaking-assessment" && (
          <SpeakingAssessment
            data={ex}
            onContinue={handleSpeakingSubmit}
            isLocked={!isVideoFinished}
            onTutorStateChange={setIsTutorTalking}
          />
        )}

        {ex.type === "match-pairs" && (
          <MatchPairsExercise
            data={ex}
            onSubmit={handleSpeakingSubmit}
            isLocked={!isVideoFinished}
            onTutorStateChange={setIsTutorTalking}
          />
        )}
      </div>

      {/* ── Overlays ────────────────────────────────────────────────────────── */}
      {phase === "success" && <SuccessOverlay onContinue={goNext} />}
      {phase === "fail"    && <FailOverlay    onRetry={resetExercise} />}
    </div>
  );
}
