# AiTutor - Project Overview

## Project Idea

A web-based interactive learning platform (a "Duolingo clone") specifically designed to teach pronunciation and phonetics to LKG (Lower Kindergarten) and Nursery kids (ages 3–6).

## Core Philosophy

- **Child-First Design:** The application acts as a friendly playground rather than a strict classroom.
- **Visual Over Textual:** Since the target audience cannot read, navigation and instructions rely heavily on visual cues, animations, and voice prompts.
- **Positive Reinforcement:** Focuses on encouraging children with warm feedback rather than penalizing mistakes. Fail states are soft and inviting ("Almost! Try again 💪").

## Key Features

- **Module & Chapter Flow:** Content is organized in a "Duolingo style" visual roadmap. Modules contain multiple sequential Chapters. The interface features a split-screen layout with an AI Tutor video on top and interactive elements on the bottom.
- **Interactive Exercise Types:**
  - *Text Lessons:* Purely informational lessons that auto-advance after the tutor finishes speaking, removing required interaction.
  - *Listen Lessons:* Interactive text lessons containing audio clips or phonemes, requiring the user to manually continue and providing a replay option.
  - *Multiple Choice (MCQ):* Selecting the right sound or picture from a grid.
  - *Tap-Word Selection:* Selecting multiple correct items from a grid of options.
  - *Match Pairs:* Connecting related items (e.g., matching a voice audio to a word, or a picture to a word).
  - *Speaking Assessment:* Prompting the user to speak a word/sound (currently simulating recording and submission).
- **Gamification:** Rewards like stars, XP, and celebratory confetti to keep kids engaged without the pressure of competitive leaderboards. Progress is tracked via a highly visual, animated progress bar.
- **Mascot System:** A friendly, animated SVG mascot that guides the child through the learning process and reacts emotionally (happy, encouraging, celebrating) based on the child's actions.
- **Phonetics & Pronunciation:** Focus on letters, phonemes, and clear sound pronunciations. The curriculum is fully fleshed out with 30 distinct phonetic sound modules.
- **Microphone Integration:** Allows kids to speak into the app to practice pronunciation with visual feedback. Fully integrated with Azure Pronunciation Assessment for real-time speech evaluation.
- **High-Quality Audio:** Employs pre-generated TTS using Sarvam AI to provide consistent, high-quality voice guidance across all lessons.

## Documentation Reference

- **Design System:** `docs/design.md` (Comprehensive UI/UX design rules)
- **Architecture:** `docs/architecture.md` (Tech stack, subsystems, and folder structure)
