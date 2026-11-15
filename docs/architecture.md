# Frontend Architecture

This document outlines the high-level architecture and structure for the AiTutor frontend (Kids Phonics App).

## 1. Technology Stack
- **Framework:** Next.js (App Router, v16+)
- **Language:** TypeScript for type safety.
- **Styling:** Tailwind CSS combined with Vanilla CSS for custom keyframe animations (`globals.css`) and design tokens. Focus is on vibrant, playful UI elements with soft 3D shadows and bouncy transitions.
- **State Management:** Pure React state (`useState`) coupled with Next.js dynamic URL routing (`useRouter`, `useParams`). A complex global store (like Zustand) is deferred until required for more advanced features like user profiles or cross-session persistence.
- **Audio APIs:** Web Audio API for sound effects, Sarvam AI TTS for pre-generated high-quality voice guidance (mapped via `pregeneratedAudioMap.ts`), Web Speech API (`window.speechSynthesis`) as a fallback, and Azure Pronunciation Assessment for speech evaluation via microphone input.

## 2. Core Subsystems

### A. Learning Engine (Course Flow)
Manages the flow of a lesson using a state machine per chapter (`ChapterClient.tsx`).
- **Static Content:** Course data (Modules and Chapters) is statically defined in `courseData.ts`.
- **Routing:** Each chapter gets its own URL (`/course/module/[id]/chapter/[id]`), allowing browser-native navigation and deep linking.
- **Interactive Exercises:** The lower half of the screen swaps between different exercise types (e.g., `TextLesson`, `MCQExercise`, `TapWordExercise`, `MatchPairsExercise`, `SpeakingAssessment`). "Text Lessons" differentiate between purely informational auto-advancing lessons and interactive audio-based listen lessons.
- **Feedback Loop:** Submitting an answer triggers local state changes that show Success (confetti, correct styling) or Fail (encouraging retry, shake animation) overlays.

### B. Gamification & Mascot Engine
- **Mascot State:** An SVG-based component (`Mascot.tsx`) that changes expressions (neutral, happy, encouraging, celebrating) based on the user's progress and answers.
- **Progress Tracking:** A visual progress bar at the top of every chapter showing completed nodes, and a star counter. A celebratory Module Complete screen with XP rewards finishes the flow.
- **Animations:** Pure CSS keyframes (`popIn`, `slideInUp`, `mascotBounce`, `confettiFall`) to keep interactions feeling alive and tactile.

### C. Audio & Microphone System
- **Audio Playback:** Plays distinct, encouraging sounds and pre-generated voiceovers using Sarvam AI TTS (automated via `scripts/generateAudio.ts`).
- **Microphone Input & Evaluation:** Captures child's voice and evaluates pronunciation in real-time using Azure Pronunciation Assessment API.
- **Audio Visualizer:** Maps microphone volume levels to friendly visual animations (e.g., pulsing bubbles) instead of technical waveforms.

## 3. Directory Structure

```text
/
├── docs/                 # Project documentation
│   ├── architecture.md   # High-level architecture and file structure
│   ├── brain.md          # Core concepts and logic
│   └── design.md         # UI/UX design principles
├── src/                  # Source code
│   ├── app/              # Next.js App Router
│   │   ├── course/       # Course flow routes
│   │   │   └── module/[moduleId]/
│   │   │       ├── page.tsx               # Module intro/roadmap screen (Duolingo style)
│   │   │       ├── complete/page.tsx      # Module completion screen
│   │   │       └── chapter/[chapterId]/page.tsx  # Chapter shell
│   │   ├── favicon.ico
│   │   ├── globals.css   # Tailwind config, design tokens, keyframes
│   │   ├── layout.tsx
│   │   └── page.tsx      # Landing page
│   ├── hooks/            # Custom React hooks
│   │   └── useSpeechSynthesis.ts # Web Speech API manager
│   ├── components/
│   │   └── course/       # Course UI components
│   │       ├── ChapterClient.tsx          # Core lesson state machine
│   │       ├── Mascot.tsx                 # Animated SVG character
│   │       ├── ProgressBar.tsx            # Top progress indicator
│   │       ├── VideoPlayer.tsx            # AI Tutor visual placeholder
│   │       ├── ModuleIntroClient.tsx      # Duolingo style module roadmap
│   │       ├── exercises/                 # Exercise variants (MCQ, TapWord, Text, SpeakingAssessment, MatchPairs)
│   │       └── feedback/                  # Success/Fail animated overlays
│   └── lib/
│       └── courseData.ts # Static module and chapter content
├── package.json          # Project dependencies
└── ...
```

## 4. Responsive Strategy
- **Mobile-First & Touch-First:** Interactions are designed for touch. Buttons are large, and tap targets are generous. Layouts are constrained to mobile-friendly widths (e.g., max-width 480px for the learning view).
- **Desktop:** The learning area remains a centered, focused container. Empty space is filled with the background world, not extra UI controls, avoiding the "enterprise dashboard" feel.
