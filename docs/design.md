# UI/UX Rules for Kids Phonics App

These are the strict UI and UX guidelines for the LKG/Nursery pronunciation platform, derived from the core design system.

## 1. Visual Language & Aesthetics

### Color Palette

Use the exact Duolingo brand color palette for a vibrant, recognizable, and highly contrasted UI.

- **Background (White):** `#FFFFFF`. Do not use dark themes.
- **Primary Brand Green (Feather Green):** `#58CC02` — for main positive interactions, correct answers, and primary buttons. (Hover: `#46A302`, Shadow: `#58A700`).
- **Primary Brand Blue (Macaw Blue):** `#1CB0F6` — for secondary buttons, highlights, and navigation. (Hover: `#148CD5`, Shadow: `#1899D6`).
- **Highlight Yellow (Bee Yellow):** `#FFC800` — for stars, crowns, and streaks. (Shadow: `#C29600`).
- **Warning/Error Red (Cardinal Red):** `#FF4B4B` — for incorrect answers and destructive actions. (Shadow: `#EA2B2B`).
- **Text Color (Eel Black):** `#4B4B4B` — for primary headings and body text to provide high contrast without being pure black.
- **Inactive/Borders (Swan Grey):** `#E5E5E5` — for inactive UI elements, structural borders, and disabled buttons.
- **Rule of thumb:** Maintain high contrast with the white background using the highly saturated solid colors. Use the distinct 3D drop shadows (darker variants) for all interactable elements.

### Typography

- Use rounded, highly readable, bold fonts (e.g., **Fredoka**, **Baloo 2**, **Nunito**, **Quicksand**).
- Text must be large: main headings 36–52px, learning letters 72–120px, body/instructions 24–32px minimum.
- Keep line lengths short; prefer single short phrases over sentences.

### Shapes

- Everything rounded — generous border radii (18–24px buttons, 20–32px cards, fully circular for icons/avatars).
- No sharp edges anywhere, including containers, tooltips, and modals.

### Illustrations

- Soft 2D illustrations with friendly faces, rounded limbs, simple geometry, minimal detail.
- Give the app a consistent mascot (animal, blob, or character) that reacts emotionally throughout — this builds warmth and familiarity.
- Use light textures (paper-grain, soft gradients) instead of flat color to add depth without complexity.

## 2. User Experience (UX) for Non-Readers

- **Visual Cues:** Since kids cannot read, instructions must be conveyed through animation, voiceover, and icons — never text-only instructions.
- **Big Interactions:** Buttons and interactive elements must be large (min 64–80px tap target), highly contrasted, and look physically tappable using soft shadows and slight 3D depth (like a rounded candy button).
- **Cards:** One main visual + one piece of info + one interaction per card. Keep uncluttered, generous whitespace.
- **Consistency:** Icons and color-coding for actions (e.g., blue = listen, pink = speak, green = correct) should stay consistent app-wide so kids build muscle memory.

## 3. Audio & Microphone Interactions

- **Microphone Visuals:** Friendly, glowing, interactive button. While recording, show pulsing waves, bubbles, or soft animated bars — never technical audio meters or waveforms.
- **Audio Feedback:** Distinct, cheerful sounds for success (chimes, giggles); gentle, non-threatening sounds for retries (soft boings, no buzzers).
- **Idle State:** Mic can gently "breathe" (subtle pulse) when idle to invite interaction.

## 4. Gamification & Feedback

- **Positive Reinforcement:** Always encourage. Use smiles, sparkles, confetti, and stars for correct answers.
- **Retry State:** Friendly bounce-back animation for incorrect answers — never red, "X" marks, or harsh buzzer sounds. Frame as "almost!" not "wrong."
- **Progress:** Visual, narrative progression — a character walking a path, a plant growing, stars filling a jar, a garden blooming. Avoid percentages, numbers, or technical metrics.
- **Rewards:** Small unlockable stickers, mascot outfits, or badges to collect — tangible, visual, collectible.

## 5. Animations & Motion

- **Personality:** Bouncy, squishy, elastic easing (overshoot/spring physics) — everything should feel alive and tactile, like it's made of jelly.
- **Purpose:** Guide attention, celebrate success, transition between screens smoothly.
- **Restraint:** Avoid repetitive or distracting looping animations that delay learning flow or pull focus from the task at hand.
