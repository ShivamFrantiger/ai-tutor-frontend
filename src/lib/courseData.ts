// ─────────────────────────────────────────────────────────────────────────────
// Course Data — Types & Static Content
// ─────────────────────────────────────────────────────────────────────────────

// ── Exercise Types ────────────────────────────────────────────────────────────

export interface PhonemeSound {
  label: string;
  audioUrl: string;
}

export interface TextLessonData {
  type: "text-lesson";
  letter?: string;
  letterColor?: string;
  content: string;
  subContent?: string;
  emoji?: string;
  speechScript?: string;
  audioUrl?: string;
  playCount?: number;
  phonemes?: PhonemeSound[];
}

export interface MCQOption {
  id: string;
  label: string;
  emoji?: string;
  audioUrl?: string;
}

export interface MCQData {
  type: "mcq";
  question: string;
  options: MCQOption[];
  correctId: string;
  speechScript?: string;
}

export interface TapWord {
  id: string;
  label: string;
  audioUrl?: string;
}

export interface TapWordData {
  type: "tap-word";
  instruction: string;
  words: TapWord[];
  correctIds: string[];
  speechScript?: string;
}

export interface SpeakingAssessmentData {
  type: "speaking-assessment";
  instruction: string;
  speechScript?: string;
  expectedWord?: string;
}

export interface MatchItem {
  id: string;
  label: string;
  audioText?: string;
  audioUrl?: string;
}

export interface MatchPair {
  left: MatchItem;
  right: MatchItem;
}

export interface MatchPairsData {
  type: "match-pairs";
  instruction: string;
  pairs: MatchPair[];
  speechScript?: string;
}

export type ExerciseData =
  | TextLessonData
  | MCQData
  | TapWordData
  | SpeakingAssessmentData
  | MatchPairsData;

// ── Screen & Chapter & Module ─────────────────────────────────────────────────

export interface LessonScreen {
  id: string;
  videoTitle: string;
  videoSubtitle?: string;
  videoUrl?: string;
  exercise: ExerciseData;
}

export interface Chapter {
  id: number;
  title: string;
  screens: LessonScreen[];
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  accentColor: string;
  chapters: Chapter[];
}

// ── Static Demo Data ──────────────────────────────────────────────────────────

export const courseModules: Module[] = [
  {
    id: 1,
    title: "Phonetic Sound: /æ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#58CC02",
    chapters: [
      {
        id: 1,
        title: "Introduction to Phonetics",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Did you know there are 44 sounds in English? Today we begin our journey with the very first one — listen carefully — /æ/!",
            exercise: {
              type: "text-lesson",
              content: "Phonics",
              speechScript: "Hello my stars! Did you know there are 44 sounds in English? Today we begin our journey with the very first one — listen carefully — /æ/!",
            },
            id: "1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /æ/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /æ/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/æ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /æ/ sound. Ready? Let's go!",
            },
            id: "2-1",
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Bat",
        screens: [
          {
            videoTitle: "Bat",
            videoSubtitle: "Our first word is Bat! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Bat",
              subContent: "Our first word is Bat! Listen closely.",
              emoji: "🏏",
              speechScript: "Our first word is Bat! Listen closely.",
              audioUrl: "/audios/words/bat.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
              ]
            },
            id: "3-1",
          },
        ],
      },
      {
          id: 4,
          title: "Say: Bat",
          screens: [
              {
                  videoTitle: "Say: Bat",
                  videoSubtitle: "Now it's your turn! Say Bat!",
                  exercise: {
                      type: "speaking-assessment",
                      instruction: "Say: Bat",
                      speechScript: "Now it's your turn! Say Bat!",
                      expectedWord: "Bat"
                  },
                  id: "4-1"
              }
          ]
      },
      {
        id: 5,
        title: "Listen: Cap",
        screens: [
          {
            videoTitle: "Cap",
            videoSubtitle: "Our next word is Cap! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Cap",
              subContent: "Our next word is Cap! Listen closely.",
              emoji: "🧢",
              speechScript: "Our next word is Cap! Listen closely.",
              audioUrl: "/audios/words/cap.m4a",
              playCount: 3,
              phonemes: [
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
              ]
            },
            id: "5-1",
          },
        ],
      },
      {
        id: 6,
        title: "Say: Cap",
        screens: [
          {
            videoTitle: "Say: Cap",
            videoSubtitle: "Amazing job! Now say Cap!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Cap",
              speechScript: "Amazing job! Now say Cap!",
              expectedWord: "Cap",
            },
            id: "6-1",
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Pan",
        screens: [
          {
            videoTitle: "Pan",
            videoSubtitle: "And our last word is Pan! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Pan",
              subContent: "And our last word is Pan! Listen closely.",
              emoji: "🍳",
              speechScript: "And our last word is Pan! Listen closely.",
              audioUrl: "/audios/words/pan.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" },
              ]
            },
            id: "7-1",
          },
        ],
      },
      {
        id: 8,
        title: "Say: Pan",
        screens: [
          {
            videoTitle: "Say: Pan",
            videoSubtitle: "You're doing so well! Say Pan!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pan",
              speechScript: "You're doing so well! Say Pan!",
              expectedWord: "Pan",
            },
            id: "8-1",
          },
        ],
      },
      {
        id: 9,
        title: "Find /æ/ Words",
        screens: [
          {
            videoTitle: "Find /æ/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words starting with /æ/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "bat", label: "Bat 🏏", audioUrl: "/audios/words/bat.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "cap", label: "Cap 🧢", audioUrl: "/audios/words/cap.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "pan", label: "Pan 🍳", audioUrl: "/audios/words/pan.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["bat", "cap", "pan"],
            },
            id: "9-1",
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript:
                "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-bat", label: "🔊", audioUrl: "/audios/words/bat.m4a" },
                  right: { id: "w-bat", label: "Bat 🏏" },
                },
                {
                  left: { id: "v-cap", label: "🔊", audioUrl: "/audios/words/cap.m4a" },
                  right: { id: "w-cap", label: "Cap 🧢" },
                },
                {
                  left: { id: "v-pan", label: "🔊", audioUrl: "/audios/words/pan.m4a" },
                  right: { id: "w-pan", label: "Pan 🍳" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "10-1",
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-bat", label: "🏏" },
                  right: { id: "t-bat", label: "Bat" },
                },
                {
                  left: { id: "p-cap", label: "🧢" },
                  right: { id: "t-cap", label: "Cap" },
                },
                {
                  left: { id: "p-pan", label: "🍳" },
                  right: { id: "t-pan", label: "Pan" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "11-1",
          },
        ],
      },
    ],
  },
  // ── Module 2: /b/ ────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "Phonetic Sound: /b/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#1CB0F6",
    chapters: [
      {
        id: 1,
        title: "Introduction to /b/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /b/! Press your lips together and let the air burst out. Like a little pop!",
            exercise: {
              type: "text-lesson",
              content: "/b/",
              speechScript: "Hello my stars! Our next sound is — /b/! Press your lips together and let the air burst out. Like a little pop!",
              phonemes: [{ label: "/b/", audioUrl: "/audios/sounds/b.m4a" }],
            },
            id: "2-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /b/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that start with the /b/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/b/ Words",
              speechScript: "Brilliant! Now let's meet some words that start with the /b/ sound. Ready? Let's go!",
            },
            id: "2-2-1",
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Ball",
        screens: [
          {
            videoTitle: "Ball",
            videoSubtitle: "Our first word is Ball! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Ball",
              subContent: "Our first word is Ball! Listen closely.",
              emoji: "🏀",
              speechScript: "Our first word is Ball! Listen closely.",
              audioUrl: "/audios/words/ball.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/ɔː/", audioUrl: "/audios/sounds/aw.m4a" },
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" },
              ]
            },
            id: "2-3-1",
          },
        ],
      },
      {
        id: 4,
        title: "Say: Ball",
        screens: [
          {
            videoTitle: "Say: Ball",
            videoSubtitle: "Now it's your turn! Say Ball!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Ball",
              speechScript: "Now it's your turn! Say Ball!",
              expectedWord: "Ball"
            },
            id: "2-4-1"
          }
        ]
      },
      {
        id: 5,
        title: "Listen: Bat",
        screens: [
          {
            videoTitle: "Bat",
            videoSubtitle: "Our next word is Bat! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Bat",
              subContent: "Our next word is Bat! Listen closely.",
              emoji: "🏏",
              speechScript: "Our next word is Bat! Listen closely.",
              audioUrl: "/audios/words/bat.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
              ]
            },
            id: "2-5-1",
          },
        ],
      },
      {
        id: 6,
        title: "Say: Bat",
        screens: [
          {
            videoTitle: "Say: Bat",
            videoSubtitle: "Fantastic! Now say Bat!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Bat",
              speechScript: "Fantastic! Now say Bat!",
              expectedWord: "Bat",
            },
            id: "2-6-1",
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Bin",
        screens: [
          {
            videoTitle: "Bin",
            videoSubtitle: "And our last word is Bin! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Bin",
              subContent: "And our last word is Bin! Listen closely.",
              emoji: "🗑️",
              speechScript: "And our last word is Bin! Listen closely.",
              audioUrl: "/audios/words/bin.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" },
              ]
            },
            id: "2-7-1",
          },
        ],
      },
      {
        id: 8,
        title: "Say: Bin",
        screens: [
          {
            videoTitle: "Say: Bin",
            videoSubtitle: "You're on a roll! Say Bin!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Bin",
              speechScript: "You're on a roll! Say Bin!",
              expectedWord: "Bin",
            },
            id: "2-8-1",
          },
        ],
      },
      {
        id: 9,
        title: "Find /b/ Words",
        screens: [
          {
            videoTitle: "Find /b/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words that start with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words starting with /b/",
              speechScript: "Time to play detective! Can you find all the words that start with that sound? Tap them all!",
              words: [
                { id: "ball", label: "Ball 🏀", audioUrl: "/audios/words/ball.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "bat", label: "Bat 🏏", audioUrl: "/audios/words/bat.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "bin", label: "Bin 🗑️", audioUrl: "/audios/words/bin.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["ball", "bat", "bin"],
            },
            id: "2-9-1",
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-ball", label: "🔊", audioUrl: "/audios/words/ball.m4a" },
                  right: { id: "w-ball", label: "Ball 🏀" },
                },
                {
                  left: { id: "v-bat", label: "🔊", audioUrl: "/audios/words/bat.m4a" },
                  right: { id: "w-bat", label: "Bat 🏏" },
                },
                {
                  left: { id: "v-bin", label: "🔊", audioUrl: "/audios/words/bin.m4a" },
                  right: { id: "w-bin", label: "Bin 🗑️" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "2-10-1",
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-ball", label: "🏀" },
                  right: { id: "t-ball", label: "Ball" },
                },
                {
                  left: { id: "p-bat", label: "🏏" },
                  right: { id: "t-bat", label: "Bat" },
                },
                {
                  left: { id: "p-bin", label: "🗑️" },
                  right: { id: "t-bin", label: "Bin" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "2-11-1",
          },
        ],
      },
    ],
  },
  // ── Module 3: /k/ ────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Phonetic Sound: /k/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF4B4B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /k/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /k/! Feel it click at the back of your throat. Like a tiny hiccup!",
            exercise: {
              type: "text-lesson",
              content: "/k/",
              speechScript: "Hello my stars! Our next sound is — /k/! Feel it click at the back of your throat. Like a tiny hiccup!",
              phonemes: [{ label: "/k/", audioUrl: "/audios/sounds/k.m4a" }],
            },
            id: "3-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /k/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /k/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/k/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /k/ sound. Ready? Let's go!",
            },
            id: "3-2-1",
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Cat",
        screens: [
          {
            videoTitle: "Cat",
            videoSubtitle: "Our first word is Cat! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Cat",
              subContent: "Our first word is Cat! Listen closely.",
              emoji: "🐱",
              speechScript: "Our first word is Cat! Listen closely.",
              audioUrl: "/audios/words/cat.m4a",
              playCount: 3,
              phonemes: [
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
              ]
            },
            id: "3-3-1",
          },
        ],
      },
      {
        id: 4,
        title: "Say: Cat",
        screens: [
          {
            videoTitle: "Say: Cat",
            videoSubtitle: "Now it's your turn! Say Cat!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Cat",
              speechScript: "Now it's your turn! Say Cat!",
              expectedWord: "Cat"
            },
            id: "3-4-1"
          }
        ]
      },
      {
        id: 5,
        title: "Listen: Cab",
        screens: [
          {
            videoTitle: "Cab",
            videoSubtitle: "Our next word is Cab! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Cab",
              subContent: "Our next word is Cab! Listen closely.",
              emoji: "🚕",
              speechScript: "Our next word is Cab! Listen closely.",
              audioUrl: "/audios/words/cab.m4a",
              playCount: 3,
              phonemes: [
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
              ]
            },
            id: "3-5-1",
          },
        ],
      },
      {
        id: 6,
        title: "Say: Cab",
        screens: [
          {
            videoTitle: "Say: Cab",
            videoSubtitle: "Wonderful! Now say Cab!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Cab",
              speechScript: "Wonderful! Now say Cab!",
              expectedWord: "Cab",
            },
            id: "3-6-1",
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Coat",
        screens: [
          {
            videoTitle: "Coat",
            videoSubtitle: "And our last word is Coat! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Coat",
              subContent: "And our last word is Coat! Listen closely.",
              emoji: "🧥",
              speechScript: "And our last word is Coat! Listen closely.",
              audioUrl: "/audios/words/coat.m4a",
              playCount: 3,
              phonemes: [
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" },
                { label: "/əʊ/", audioUrl: "/audios/sounds/oh.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
              ]
            },
            id: "3-7-1",
          },
        ],
      },
      {
        id: 8,
        title: "Say: Coat",
        screens: [
          {
            videoTitle: "Say: Coat",
            videoSubtitle: "You're amazing! Say Coat!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Coat",
              speechScript: "You're amazing! Say Coat!",
              expectedWord: "Coat",
            },
            id: "3-8-1",
          },
        ],
      },
      {
        id: 9,
        title: "Find /k/ Words",
        screens: [
          {
            videoTitle: "Find /k/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words starting with /k/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "cat", label: "Cat 🐱", audioUrl: "/audios/words/cat.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "cab", label: "Cab 🚕", audioUrl: "/audios/words/cab.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "coat", label: "Coat 🧥", audioUrl: "/audios/words/coat.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["cat", "cab", "coat"],
            },
            id: "3-9-1",
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-cat", label: "🔊", audioUrl: "/audios/words/cat.m4a" },
                  right: { id: "w-cat", label: "Cat 🐱" },
                },
                {
                  left: { id: "v-cab", label: "🔊", audioUrl: "/audios/words/cab.m4a" },
                  right: { id: "w-cab", label: "Cab 🚕" },
                },
                {
                  left: { id: "v-coat", label: "🔊", audioUrl: "/audios/words/coat.m4a" },
                  right: { id: "w-coat", label: "Coat 🧥" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "3-10-1",
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-cat", label: "🐱" },
                  right: { id: "t-cat", label: "Cat" },
                },
                {
                  left: { id: "p-cab", label: "🚕" },
                  right: { id: "t-cab", label: "Cab" },
                },
                {
                  left: { id: "p-coat", label: "🧥" },
                  right: { id: "t-coat", label: "Coat" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "3-11-1",
          },
        ],
      },
    ],
  },
  // ── Module 4: /d/ ────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Phonetic Sound: /d/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF9600",
    chapters: [
      {
        id: 1,
        title: "Introduction to /d/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /d/! Touch the tip of your tongue to the roof of your mouth and let it drop down. Can you feel it?",
            exercise: {
              type: "text-lesson",
              content: "/d/",
              speechScript: "Hello my stars! Our next sound is — /d/! Touch the tip of your tongue to the roof of your mouth and let it drop down. Can you feel it?",
              phonemes: [{ label: "/d/", audioUrl: "/audios/sounds/d.m4a" }],
            },
            id: "4-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /d/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /d/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/d/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /d/ sound. Ready? Let's go!",
            },
            id: "4-2-1",
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Den",
        screens: [
          {
            videoTitle: "Den",
            videoSubtitle: "Our first word is Den! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Den",
              subContent: "Our first word is Den! Listen closely.",
              emoji: "🏠",
              speechScript: "Our first word is Den! Listen closely.",
              audioUrl: "/audios/words/den.m4a",
              playCount: 3,
              phonemes: [
                { label: "/d/", audioUrl: "/audios/sounds/d.m4a" },
                { label: "/e/", audioUrl: "/audios/sounds/eh.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" },
              ]
            },
            id: "4-3-1",
          },
        ],
      },
      {
        id: 4,
        title: "Say: Den",
        screens: [
          {
            videoTitle: "Say: Den",
            videoSubtitle: "Now it's your turn! Say Den!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Den",
              speechScript: "Now it's your turn! Say Den!",
              expectedWord: "Den"
            },
            id: "4-4-1"
          }
        ]
      },
      {
        id: 5,
        title: "Listen: Door",
        screens: [
          {
            videoTitle: "Door",
            videoSubtitle: "Our next word is Door! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Door",
              subContent: "Our next word is Door! Listen closely.",
              emoji: "🚪",
              speechScript: "Our next word is Door! Listen closely.",
              audioUrl: "/audios/words/door.m4a",
              playCount: 3,
              phonemes: [
                { label: "/d/", audioUrl: "/audios/sounds/d.m4a" },
                { label: "/ɔː/", audioUrl: "/audios/sounds/aw.m4a" },
              ]
            },
            id: "4-5-1",
          },
        ],
      },
      {
        id: 6,
        title: "Say: Door",
        screens: [
          {
            videoTitle: "Say: Door",
            videoSubtitle: "Great job! Now say Door!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Door",
              speechScript: "Great job! Now say Door!",
              expectedWord: "Door",
            },
            id: "4-6-1",
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Card",
        screens: [
          {
            videoTitle: "Card",
            videoSubtitle: "And our last word is Card! Listen closely.",
            exercise: {
              type: "text-lesson",
              content: "Card",
              subContent: "And our last word is Card! Listen closely.",
              emoji: "🃏",
              speechScript: "And our last word is Card! Listen closely.",
              audioUrl: "/audios/words/card.m4a",
              playCount: 3,
              phonemes: [
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" },
                { label: "/ɑː/", audioUrl: "/audios/sounds/ah.m4a" },
                { label: "/d/", audioUrl: "/audios/sounds/d.m4a" },
              ]
            },
            id: "4-7-1",
          },
        ],
      },
      {
        id: 8,
        title: "Say: Card",
        screens: [
          {
            videoTitle: "Say: Card",
            videoSubtitle: "So impressive! Say Card!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Card",
              speechScript: "So impressive! Say Card!",
              expectedWord: "Card",
            },
            id: "4-8-1",
          },
        ],
      },
      {
        id: 9,
        title: "Find /d/ Words",
        screens: [
          {
            videoTitle: "Find /d/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words starting with /d/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "den", label: "Den 🏠", audioUrl: "/audios/words/den.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "door", label: "Door 🚪", audioUrl: "/audios/words/door.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "card", label: "Card 🃏", audioUrl: "/audios/words/card.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["den", "door", "card"],
            },
            id: "4-9-1",
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-den", label: "🔊", audioUrl: "/audios/words/den.m4a" },
                  right: { id: "w-den", label: "Den 🏠" },
                },
                {
                  left: { id: "v-door", label: "🔊", audioUrl: "/audios/words/door.m4a" },
                  right: { id: "w-door", label: "Door 🚪" },
                },
                {
                  left: { id: "v-card", label: "🔊", audioUrl: "/audios/words/card.m4a" },
                  right: { id: "w-card", label: "Card 🃏" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "4-10-1",
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-den", label: "🏠" },
                  right: { id: "t-den", label: "Den" },
                },
                {
                  left: { id: "p-door", label: "🚪" },
                  right: { id: "t-door", label: "Door" },
                },
                {
                  left: { id: "p-card", label: "🃏" },
                  right: { id: "t-card", label: "Card" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "4-11-1",
          },
        ],
      },
    ],
  },
  // ── Module 5: /e/ ────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "Phonetic Sound: /e/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#CE82FF",
    chapters: [
      {
        id: 1,
        title: "Introduction to /e/",
        screens: [
          {
            id: "5-1-1",
            videoTitle: "Welcome",
            videoSubtitle: "Our next sound is /e/!",
            exercise: {
              type: "text-lesson",
              content: "/e/",
              speechScript:
                "Hello my stars! Our next sound is — /e/! Open your mouth and let it out. Like when you say the letter E in 'bed'!",
              phonemes: [{ label: "/e/", audioUrl: "/audios/sounds/eh.m4a" }],
            },
          },
        ],
      },
      {
        id: 2,
        title: "Learn /e/ Words",
        screens: [
          {
            id: "5-2-1",
            videoTitle: "Let's learn words",
            videoSubtitle: "Let's learn some words with the /e/ sound!",
            exercise: {
              type: "text-lesson",
              content: "/e/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /e/ sound. Ready? Let's go!",
            },
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Bed",
        screens: [
          {
            id: "5-3-1",
            videoTitle: "Bed",
            videoSubtitle: "Bed has the /e/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Bed",
              subContent: "Bed has the /e/ sound.",
              emoji: "🛏️",
              speechScript: "Bed has the /e/ sound.",
              audioUrl: "/audios/words/bed.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/e/", audioUrl: "/audios/sounds/eh.m4a" },
                { label: "/d/", audioUrl: "/audios/sounds/d.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 4,
        title: "Say: Bed",
        screens: [
          {
            id: "5-4-1",
            videoTitle: "Say: Bed",
            videoSubtitle: "Your turn. Say: Bed",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Bed",
              speechScript: "Now it's your turn! Say Bed!",
              expectedWord: "Bed",
            },
          },
        ],
      },
      {
        id: 5,
        title: "Listen: Pen",
        screens: [
          {
            id: "5-5-1",
            videoTitle: "Pen",
            videoSubtitle: "Pen has the /e/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Pen",
              subContent: "Pen has the /e/ sound.",
              emoji: "🖊️",
              speechScript: "Pen has the /e/ sound.",
              audioUrl: "/audios/words/pen.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/e/", audioUrl: "/audios/sounds/eh.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 6,
        title: "Say: Pen",
        screens: [
          {
            id: "5-6-1",
            videoTitle: "Say: Pen",
            videoSubtitle: "Your turn. Say: Pen",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pen",
              speechScript: "Amazing job! Now say Pen!",
              expectedWord: "Pen",
            },
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Ten",
        screens: [
          {
            id: "5-7-1",
            videoTitle: "Ten",
            videoSubtitle: "Ten has the /e/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Ten",
              subContent: "Ten has the /e/ sound.",
              emoji: "🔟",
              speechScript: "Ten has the /e/ sound.",
              audioUrl: "/audios/words/ten.m4a",
              playCount: 3,
              phonemes: [
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
                { label: "/e/", audioUrl: "/audios/sounds/eh.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 8,
        title: "Say: Ten",
        screens: [
          {
            id: "5-8-1",
            videoTitle: "Say: Ten",
            videoSubtitle: "Your turn. Say: Ten",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Ten",
              speechScript: "You're doing so well! Say Ten!",
              expectedWord: "Ten",
            },
          },
        ],
      },
      {
        id: 9,
        title: "Find /e/ Words",
        screens: [
          {
            id: "5-9-1",
            videoTitle: "Find /e/ Words",
            videoSubtitle: "Find the words with the /e/ sound",
            exercise: {
              type: "tap-word",
              instruction: "Find words with the /e/ sound",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "bed", label: "Bed 🛏️", audioUrl: "/audios/words/bed.m4a" },
                { id: "pan", label: "Pan 🍳", audioUrl: "/audios/words/pan.m4a" },
                { id: "pen", label: "Pen 🖊️", audioUrl: "/audios/words/pen.m4a" },
                { id: "bag", label: "Bag 👜", audioUrl: "/audios/words/bag.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
                { id: "sit", label: "Sit 🪑", audioUrl: "/audios/words/sit.m4a" },
              ],
              correctIds: ["bed", "pen", "ten"],
            },
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            id: "5-10-1",
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Tap the voice, then tap the matching word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Match the voice to the word. Tap the voice, then tap the matching word.",
              pairs: [
                {
                  left: { id: "v-bed", label: "🔊", audioUrl: "/audios/words/bed.m4a" },
                  right: { id: "w-bed", label: "Bed 🛏️" },
                },
                {
                  left: { id: "v-pen", label: "🔊", audioUrl: "/audios/words/pen.m4a" },
                  right: { id: "w-pen", label: "Pen 🖊️" },
                },
                {
                  left: { id: "v-ten", label: "🔊", audioUrl: "/audios/words/ten.m4a" },
                  right: { id: "w-ten", label: "Ten 🔟" },
                },
                {
                  left: { id: "v-men", label: "🔊", audioUrl: "/audios/words/men.m4a" },
                  right: { id: "w-men", label: "Men 👨‍👨" },
                },
              ],
            },
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            id: "5-11-1",
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Match the picture to the word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-bed", label: "🛏️" },
                  right: { id: "t-bed", label: "Bed" },
                },
                {
                  left: { id: "p-pen", label: "🖊️" },
                  right: { id: "t-pen", label: "Pen" },
                },
                {
                  left: { id: "p-ten", label: "🔟" },
                  right: { id: "t-ten", label: "Ten" },
                },
                {
                  left: { id: "p-men", label: "👨‍👨" },
                  right: { id: "t-men", label: "Men" },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  // ── Module 6: /f/ ────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Phonetic Sound: /f/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF4B4B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /f/",
        screens: [
          {
            id: "6-1-1",
            videoTitle: "Welcome",
            videoSubtitle: "Our next sound is /f/!",
            exercise: {
              type: "text-lesson",
              content: "/f/",
              speechScript:
                "Hello my stars! Our next sound is — /f/! Bite your bottom lip gently and blow out. Like a little breeze!",
              phonemes: [{ label: "/f/", audioUrl: "/audios/sounds/f.m4a" }],
            },
          },
        ],
      },
      {
        id: 2,
        title: "Learn /f/ Words",
        screens: [
          {
            id: "6-2-1",
            videoTitle: "Let's learn words",
            videoSubtitle: "Let's learn some words with the /f/ sound!",
            exercise: {
              type: "text-lesson",
              content: "/f/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /f/ sound. Ready? Let's go!",
            },
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Fish",
        screens: [
          {
            id: "6-3-1",
            videoTitle: "Fish",
            videoSubtitle: "Fish has the /f/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Fish",
              subContent: "Fish has the /f/ sound.",
              emoji: "🐟",
              speechScript: "Fish has the /f/ sound.",
              audioUrl: "/audios/words/fish.m4a",
              playCount: 3,
              phonemes: [
                { label: "/f/", audioUrl: "/audios/sounds/f.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/ʃ/", audioUrl: "/audios/sounds/sh.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 4,
        title: "Say: Fish",
        screens: [
          {
            id: "6-4-1",
            videoTitle: "Say: Fish",
            videoSubtitle: "Your turn. Say: Fish",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Fish",
              speechScript: "Now it's your turn! Say Fish!",
              expectedWord: "Fish",
            },
          },
        ],
      },
      {
        id: 5,
        title: "Listen: Fan",
        screens: [
          {
            id: "6-5-1",
            videoTitle: "Fan",
            videoSubtitle: "Fan has the /f/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Fan",
              subContent: "Fan has the /f/ sound.",
              emoji: "💨",
              speechScript: "Fan has the /f/ sound.",
              audioUrl: "/audios/words/fan.m4a",
              playCount: 3,
              phonemes: [
                { label: "/f/", audioUrl: "/audios/sounds/f.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 6,
        title: "Say: Fan",
        screens: [
          {
            id: "6-6-1",
            videoTitle: "Say: Fan",
            videoSubtitle: "Your turn. Say: Fan",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Fan",
              speechScript: "Wonderful! Now say Fan!",
              expectedWord: "Fan",
            },
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Leaf",
        screens: [
          {
            id: "6-7-1",
            videoTitle: "Leaf",
            videoSubtitle: "Leaf has the /f/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Leaf",
              subContent: "Leaf has the /f/ sound.",
              emoji: "🍃",
              speechScript: "Leaf has the /f/ sound.",
              audioUrl: "/audios/words/leaf.m4a",
              playCount: 3,
              phonemes: [
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" },
                { label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" },
                { label: "/f/", audioUrl: "/audios/sounds/f.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 8,
        title: "Say: Leaf",
        screens: [
          {
            id: "6-8-1",
            videoTitle: "Say: Leaf",
            videoSubtitle: "Your turn. Say: Leaf",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Leaf",
              speechScript: "You're on a roll! Say Leaf!",
              expectedWord: "Leaf",
            },
          },
        ],
      },
      {
        id: 9,
        title: "Find /f/ Words",
        screens: [
          {
            id: "6-9-1",
            videoTitle: "Find /f/ Words",
            videoSubtitle: "Find the words with the /f/ sound",
            exercise: {
              type: "tap-word",
              instruction: "Find words with the /f/ sound",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "fish", label: "Fish 🐟", audioUrl: "/audios/words/fish.m4a" },
                { id: "bag",  label: "Bag 👜",  audioUrl: "/audios/words/bag.m4a" },
                { id: "fan",  label: "Fan 💨",  audioUrl: "/audios/words/fan.m4a" },
                { id: "ten",  label: "Ten 🔟",  audioUrl: "/audios/words/ten.m4a" },
                { id: "leaf", label: "Leaf 🍃", audioUrl: "/audios/words/leaf.m4a" },
                { id: "sit",  label: "Sit 🪑",  audioUrl: "/audios/words/sit.m4a" },
              ],
              correctIds: ["fish", "fan", "leaf"],
            },
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            id: "6-10-1",
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Tap the voice, then tap the matching word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Match the voice to the word. Tap the voice, then tap the matching word.",
              pairs: [
                {
                  left: { id: "v-fish", label: "🔊", audioUrl: "/audios/words/fish.m4a" },
                  right: { id: "w-fish", label: "Fish 🐟" },
                },
                {
                  left: { id: "v-fan",  label: "🔊", audioUrl: "/audios/words/fan.m4a" },
                  right: { id: "w-fan",  label: "Fan 💨" },
                },
                {
                  left: { id: "v-leaf", label: "🔊", audioUrl: "/audios/words/leaf.m4a" },
                  right: { id: "w-leaf", label: "Leaf 🍃" },
                },
                {
                  left: { id: "v-hat",  label: "🔊", audioUrl: "/audios/words/hat.m4a" },
                  right: { id: "w-hat",  label: "Hat 🎩" },
                },
              ],
            },
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            id: "6-11-1",
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Match the picture to the word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-fish", label: "🐟" },
                  right: { id: "t-fish", label: "Fish" },
                },
                {
                  left: { id: "p-fan",  label: "💨" },
                  right: { id: "t-fan",  label: "Fan" },
                },
                {
                  left: { id: "p-leaf", label: "🍃" },
                  right: { id: "t-leaf", label: "Leaf" },
                },
                {
                  left: { id: "p-hat",  label: "🎩" },
                  right: { id: "t-hat",  label: "Hat" },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  // ── Module 7: /g/ ────────────────────────────────────────────────────────────
  {
    id: 7,
    title: "Phonetic Sound: /g/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#1CB0F6",
    chapters: [
      {
        id: 1,
        title: "Introduction to /g/",
        screens: [
          {
            id: "7-1-1",
            videoTitle: "Welcome",
            videoSubtitle: "Our next sound is /g/!",
            exercise: {
              type: "text-lesson",
              content: "/g/",
              speechScript:
                "Hello my stars! Our next sound is — /g/! Feel it rumble at the back of your throat. Like a little growl!",
              phonemes: [{ label: "/g/", audioUrl: "/audios/sounds/g.m4a" }],
            },
          },
        ],
      },
      {
        id: 2,
        title: "Learn /g/ Words",
        screens: [
          {
            id: "7-2-1",
            videoTitle: "Let's learn words",
            videoSubtitle: "Let's learn some words with the /g/ sound!",
            exercise: {
              type: "text-lesson",
              content: "/g/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /g/ sound. Ready? Let's go!",
            },
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Goat",
        screens: [
          {
            id: "7-3-1",
            videoTitle: "Goat",
            videoSubtitle: "Goat has the /g/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Goat",
              subContent: "Goat has the /g/ sound.",
              emoji: "🐐",
              speechScript: "Goat has the /g/ sound.",
              audioUrl: "/audios/words/goat.m4a",
              playCount: 3,
              phonemes: [
                { label: "/g/", audioUrl: "/audios/sounds/g.m4a" },
                { label: "/əʊ/", audioUrl: "/audios/sounds/ah.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 4,
        title: "Say: Goat",
        screens: [
          {
            id: "7-4-1",
            videoTitle: "Say: Goat",
            videoSubtitle: "Your turn. Say: Goat",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Goat",
              speechScript: "Now it's your turn! Say Goat!",
              expectedWord: "Goat",
            },
          },
        ],
      },
      {
        id: 5,
        title: "Listen: Pig",
        screens: [
          {
            id: "7-5-1",
            videoTitle: "Pig",
            videoSubtitle: "Pig has the /g/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Pig",
              subContent: "Pig has the /g/ sound.",
              emoji: "🐷",
              speechScript: "Pig has the /g/ sound.",
              audioUrl: "/audios/words/pig.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/g/", audioUrl: "/audios/sounds/g.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 6,
        title: "Say: Pig",
        screens: [
          {
            id: "7-6-1",
            videoTitle: "Say: Pig",
            videoSubtitle: "Your turn. Say: Pig",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pig",
              speechScript: "Fantastic! Now say Pig!",
              expectedWord: "Pig",
            },
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Bag",
        screens: [
          {
            id: "7-7-1",
            videoTitle: "Bag",
            videoSubtitle: "Bag has the /g/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Bag",
              subContent: "Bag has the /g/ sound.",
              emoji: "👜",
              speechScript: "Bag has the /g/ sound.",
              audioUrl: "/audios/words/bag.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/g/", audioUrl: "/audios/sounds/g.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 8,
        title: "Say: Bag",
        screens: [
          {
            id: "7-8-1",
            videoTitle: "Say: Bag",
            videoSubtitle: "Your turn. Say: Bag",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Bag",
              speechScript: "You're amazing! Say Bag!",
              expectedWord: "Bag",
            },
          },
        ],
      },
      {
        id: 9,
        title: "Find /g/ Words",
        screens: [
          {
            id: "7-9-1",
            videoTitle: "Find /g/ Words",
            videoSubtitle: "Find the words with the /g/ sound",
            exercise: {
              type: "tap-word",
              instruction: "Find words with the /g/ sound",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "goat", label: "Goat 🐐", audioUrl: "/audios/words/goat.m4a" },
                { id: "bed",  label: "Bed 🛏️",  audioUrl: "/audios/words/bed.m4a" },
                { id: "pig",  label: "Pig 🐷",  audioUrl: "/audios/words/pig.m4a" },
                { id: "pen",  label: "Pen 🖊️",  audioUrl: "/audios/words/pen.m4a" },
                { id: "bag",  label: "Bag 👜",  audioUrl: "/audios/words/bag.m4a" },
                { id: "fan",  label: "Fan 💨",  audioUrl: "/audios/words/fan.m4a" },
              ],
              correctIds: ["goat", "pig", "bag"],
            },
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            id: "7-10-1",
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Tap the voice, then tap the matching word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Match the voice to the word. Tap the voice, then tap the matching word.",
              pairs: [
                {
                  left: { id: "v-goat", label: "🔊", audioUrl: "/audios/words/goat.m4a" },
                  right: { id: "w-goat", label: "Goat 🐐" },
                },
                {
                  left: { id: "v-pig",  label: "🔊", audioUrl: "/audios/words/pig.m4a" },
                  right: { id: "w-pig",  label: "Pig 🐷" },
                },
                {
                  left: { id: "v-bag",  label: "🔊", audioUrl: "/audios/words/bag.m4a" },
                  right: { id: "w-bag",  label: "Bag 👜" },
                },
                {
                  left: { id: "v-leg",  label: "🔊", audioUrl: "/audios/words/leg.m4a" },
                  right: { id: "w-leg",  label: "Leg 🦵" },
                },
              ],
            },
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            id: "7-11-1",
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Match the picture to the word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-goat", label: "🐐" },
                  right: { id: "t-goat", label: "Goat" },
                },
                {
                  left: { id: "p-pig",  label: "🐷" },
                  right: { id: "t-pig",  label: "Pig" },
                },
                {
                  left: { id: "p-bag",  label: "👜" },
                  right: { id: "t-bag",  label: "Bag" },
                },
                {
                  left: { id: "p-leg",  label: "🦵" },
                  right: { id: "t-leg",  label: "Leg" },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  // ── Module 8: /iː/ ───────────────────────────────────────────────────────────
  {
    id: 8,
    title: "Phonetic Sound: /iː/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#58CC02",
    chapters: [
      {
        id: 1,
        title: "Introduction to /iː/",
        screens: [
          {
            id: "8-1-1",
            videoTitle: "Welcome",
            videoSubtitle: "Our next sound is /iː/!",
            exercise: {
              type: "text-lesson",
              content: "/iː/",
              speechScript:
                "Hello my stars! Our next sound is — /iː/! Stretch your lips wide and say eeee. Like you're smiling for a photo!",
              phonemes: [{ label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" }],
            },
          },
        ],
      },
      {
        id: 2,
        title: "Learn /iː/ Words",
        screens: [
          {
            id: "8-2-1",
            videoTitle: "Let's learn words",
            videoSubtitle: "Let's learn some words with the /iː/ sound!",
            exercise: {
              type: "text-lesson",
              content: "/iː/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /iː/ sound. Ready? Let's go!",
            },
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Sheep",
        screens: [
          {
            id: "8-3-1",
            videoTitle: "Sheep",
            videoSubtitle: "Sheep has the /iː/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Sheep",
              subContent: "Sheep has the /iː/ sound.",
              emoji: "🐑",
              speechScript: "Sheep has the /iː/ sound.",
              audioUrl: "/audios/words/sheep.m4a",
              playCount: 3,
              phonemes: [
                { label: "/ʃ/", audioUrl: "/audios/sounds/sh.m4a" },
                { label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 4,
        title: "Say: Sheep",
        screens: [
          {
            id: "8-4-1",
            videoTitle: "Say: Sheep",
            videoSubtitle: "Your turn. Say: Sheep",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Sheep",
              speechScript: "Now it's your turn! Say Sheep!",
              expectedWord: "Sheep",
            },
          },
        ],
      },
      {
        id: 5,
        title: "Listen: Heat",
        screens: [
          {
            id: "8-5-1",
            videoTitle: "Heat",
            videoSubtitle: "Heat has the /iː/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Heat",
              subContent: "Heat has the /iː/ sound.",
              emoji: "🔥",
              speechScript: "Heat has the /iː/ sound.",
              audioUrl: "/audios/words/heat.m4a",
              playCount: 3,
              phonemes: [
                { label: "/h/", audioUrl: "/audios/sounds/h.m4a" },
                { label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 6,
        title: "Say: Heat",
        screens: [
          {
            id: "8-6-1",
            videoTitle: "Say: Heat",
            videoSubtitle: "Your turn. Say: Heat",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Heat",
              speechScript: "Superb! Now say Heat!",
              expectedWord: "Heat",
            },
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Leaf",
        screens: [
          {
            id: "8-7-1",
            videoTitle: "Leaf",
            videoSubtitle: "Leaf has the /iː/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Leaf",
              subContent: "Leaf has the /iː/ sound.",
              emoji: "🍃",
              speechScript: "Leaf has the /iː/ sound.",
              audioUrl: "/audios/words/leaf.m4a",
              playCount: 3,
              phonemes: [
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" },
                { label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" },
                { label: "/f/", audioUrl: "/audios/sounds/f.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 8,
        title: "Say: Leaf",
        screens: [
          {
            id: "8-8-1",
            videoTitle: "Say: Leaf",
            videoSubtitle: "Your turn. Say: Leaf",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Leaf",
              speechScript: "You're incredible! Say Leaf!",
              expectedWord: "Leaf",
            },
          },
        ],
      },
      {
        id: 9,
        title: "Find /iː/ Words",
        screens: [
          {
            id: "8-9-1",
            videoTitle: "Find /iː/ Words",
            videoSubtitle: "Find the words with the /iː/ sound",
            exercise: {
              type: "tap-word",
              instruction: "Find words with the /iː/ sound",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "sheep", label: "Sheep 🐑", audioUrl: "/audios/words/sheep.m4a" },
                { id: "bag",   label: "Bag 👜",   audioUrl: "/audios/words/bag.m4a" },
                { id: "heat",  label: "Heat 🔥",  audioUrl: "/audios/words/heat.m4a" },
                { id: "pen",   label: "Pen 🖊️",   audioUrl: "/audios/words/pen.m4a" },
                { id: "leaf",  label: "Leaf 🍃",  audioUrl: "/audios/words/leaf.m4a" },
                { id: "sit",   label: "Sit 🪑",   audioUrl: "/audios/words/sit.m4a" },
              ],
              correctIds: ["sheep", "heat", "leaf"],
            },
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            id: "8-10-1",
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Tap the voice, then tap the matching word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Match the voice to the word. Tap the voice, then tap the matching word.",
              pairs: [
                {
                  left: { id: "v-sheep", label: "🔊", audioUrl: "/audios/words/sheep.m4a" },
                  right: { id: "w-sheep", label: "Sheep 🐑" },
                },
                {
                  left: { id: "v-heat",  label: "🔊", audioUrl: "/audios/words/heat.m4a" },
                  right: { id: "w-heat",  label: "Heat 🔥" },
                },
                {
                  left: { id: "v-leaf",  label: "🔊", audioUrl: "/audios/words/leaf.m4a" },
                  right: { id: "w-leaf",  label: "Leaf 🍃" },
                },
                {
                  left: { id: "v-tea",   label: "🔊", audioUrl: "/audios/words/tea.m4a" },
                  right: { id: "w-tea",   label: "Tea ☕" },
                },
              ],
            },
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            id: "8-11-1",
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Match the picture to the word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-sheep", label: "🐑" },
                  right: { id: "t-sheep", label: "Sheep" },
                },
                {
                  left: { id: "p-heat",  label: "🔥" },
                  right: { id: "t-heat",  label: "Heat" },
                },
                {
                  left: { id: "p-leaf",  label: "🍃" },
                  right: { id: "t-leaf",  label: "Leaf" },
                },
                {
                  left: { id: "p-tea",   label: "☕" },
                  right: { id: "t-tea",   label: "Tea" },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  // ── Module 9: /ɪ/ ────────────────────────────────────────────────────────────
  {
    id: 9,
    title: "Phonetic Sound: /ɪ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF9600",
    chapters: [
      {
        id: 1,
        title: "Introduction to /ɪ/",
        screens: [
          {
            id: "9-1-1",
            videoTitle: "Welcome",
            videoSubtitle: "Our next sound is /ɪ/!",
            exercise: {
              type: "text-lesson",
              content: "/ɪ/",
              speechScript:
                "Hello my stars! Our next sound is — /ɪ/! It's a short quick sound. Like the i in 'sit'. Give it a try!",
              phonemes: [{ label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" }],
            },
          },
        ],
      },
      {
        id: 2,
        title: "Learn /ɪ/ Words",
        screens: [
          {
            id: "9-2-1",
            videoTitle: "Let's learn words",
            videoSubtitle: "Let's learn some words with the /ɪ/ sound!",
            exercise: {
              type: "text-lesson",
              content: "/ɪ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /ɪ/ sound. Ready? Let's go!",
            },
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Sit",
        screens: [
          {
            id: "9-3-1",
            videoTitle: "Sit",
            videoSubtitle: "Sit has the /ɪ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Sit",
              subContent: "Sit has the /ɪ/ sound.",
              emoji: "🪑",
              speechScript: "Sit has the /ɪ/ sound.",
              audioUrl: "/audios/words/sit.m4a",
              playCount: 3,
              phonemes: [
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 4,
        title: "Say: Sit",
        screens: [
          {
            id: "9-4-1",
            videoTitle: "Say: Sit",
            videoSubtitle: "Your turn. Say: Sit",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Sit",
              speechScript: "Now it's your turn! Say Sit!",
              expectedWord: "Sit",
            },
          },
        ],
      },
      {
        id: 5,
        title: "Listen: Pill",
        screens: [
          {
            id: "9-5-1",
            videoTitle: "Pill",
            videoSubtitle: "Pill has the /ɪ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Pill",
              subContent: "Pill has the /ɪ/ sound.",
              emoji: "💊",
              speechScript: "Pill has the /ɪ/ sound.",
              audioUrl: "/audios/words/pill.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 6,
        title: "Say: Pill",
        screens: [
          {
            id: "9-6-1",
            videoTitle: "Say: Pill",
            videoSubtitle: "Your turn. Say: Pill",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pill",
              speechScript: "Great job! Now say Pill!",
              expectedWord: "Pill",
            },
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Ship",
        screens: [
          {
            id: "9-7-1",
            videoTitle: "Ship",
            videoSubtitle: "Ship has the /ɪ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Ship",
              subContent: "Ship has the /ɪ/ sound.",
              emoji: "🚢",
              speechScript: "Ship has the /ɪ/ sound.",
              audioUrl: "/audios/words/ship.m4a",
              playCount: 3,
              phonemes: [
                { label: "/ʃ/", audioUrl: "/audios/sounds/sh.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 8,
        title: "Say: Ship",
        screens: [
          {
            id: "9-8-1",
            videoTitle: "Say: Ship",
            videoSubtitle: "Your turn. Say: Ship",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Ship",
              speechScript: "So impressive! Say Ship!",
              expectedWord: "Ship",
            },
          },
        ],
      },
      {
        id: 9,
        title: "Find /ɪ/ Words",
        screens: [
          {
            id: "9-9-1",
            videoTitle: "Find /ɪ/ Words",
            videoSubtitle: "Find the words with the /ɪ/ sound",
            exercise: {
              type: "tap-word",
              instruction: "Find words with the /ɪ/ sound",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "sit",  label: "Sit 🪑",  audioUrl: "/audios/words/sit.m4a" },
                { id: "goat", label: "Goat 🐐", audioUrl: "/audios/words/goat.m4a" },
                { id: "pill", label: "Pill 💊", audioUrl: "/audios/words/pill.m4a" },
                { id: "fan",  label: "Fan 💨",  audioUrl: "/audios/words/fan.m4a" },
                { id: "ship", label: "Ship 🚢", audioUrl: "/audios/words/ship.m4a" },
                { id: "leaf", label: "Leaf 🍃", audioUrl: "/audios/words/leaf.m4a" },
              ],
              correctIds: ["sit", "pill", "ship"],
            },
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            id: "9-10-1",
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Tap the voice, then tap the matching word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Match the voice to the word. Tap the voice, then tap the matching word.",
              pairs: [
                {
                  left: { id: "v-sit",  label: "🔊", audioUrl: "/audios/words/sit.m4a" },
                  right: { id: "w-sit",  label: "Sit 🪑" },
                },
                {
                  left: { id: "v-pill", label: "🔊", audioUrl: "/audios/words/pill.m4a" },
                  right: { id: "w-pill", label: "Pill 💊" },
                },
                {
                  left: { id: "v-ship", label: "🔊", audioUrl: "/audios/words/ship.m4a" },
                  right: { id: "w-ship", label: "Ship 🚢" },
                },
                {
                  left: { id: "v-pig",  label: "🔊", audioUrl: "/audios/words/pig.m4a" },
                  right: { id: "w-pig",  label: "Pig 🐷" },
                },
              ],
            },
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            id: "9-11-1",
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Match the picture to the word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-sit",  label: "🪑" },
                  right: { id: "t-sit",  label: "Sit" },
                },
                {
                  left: { id: "p-pill", label: "💊" },
                  right: { id: "t-pill", label: "Pill" },
                },
                {
                  left: { id: "p-ship", label: "🚢" },
                  right: { id: "t-ship", label: "Ship" },
                },
                {
                  left: { id: "p-pig",  label: "🐷" },
                  right: { id: "t-pig",  label: "Pig" },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  // ── Module 10: /dʒ/ ──────────────────────────────────────────────────────────
  {
    id: 10,
    title: "Phonetic Sound: /dʒ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF6B6B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /dʒ/",
        screens: [
          {
            id: "10-1-1",
            videoTitle: "Welcome",
            videoSubtitle: "Our next sound is /dʒ/!",
            exercise: {
              type: "text-lesson",
              content: "/dʒ/",
              speechScript:
                "Hello my stars! Our next sound is — /dʒ/! Press your tongue to the roof of your mouth and let it spring forward. Like the start of 'jump'!",
              phonemes: [{ label: "/dʒ/", audioUrl: "/audios/sounds/j.m4a" }],
            },
          },
        ],
      },
      {
        id: 2,
        title: "Learn /dʒ/ Words",
        screens: [
          {
            id: "10-2-1",
            videoTitle: "Let's learn words",
            videoSubtitle: "Let's learn some words with the /dʒ/ sound!",
            exercise: {
              type: "text-lesson",
              content: "/dʒ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /dʒ/ sound. Ready? Let's go!",
            },
          },
        ],
      },
      {
        id: 3,
        title: "Listen: Jar",
        screens: [
          {
            id: "10-3-1",
            videoTitle: "Jar",
            videoSubtitle: "Jar has the /dʒ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Jar",
              subContent: "Jar has the /dʒ/ sound.",
              emoji: "🫙",
              speechScript: "Jar has the /dʒ/ sound.",
              audioUrl: "/audios/words/jar.m4a",
              playCount: 3,
              phonemes: [
                { label: "/dʒ/", audioUrl: "/audios/sounds/j.m4a" },
                { label: "/ɑː/", audioUrl: "/audios/sounds/ah.m4a" },
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 4,
        title: "Say: Jar",
        screens: [
          {
            id: "10-4-1",
            videoTitle: "Say: Jar",
            videoSubtitle: "Your turn. Say: Jar",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Jar",
              speechScript: "Now it's your turn! Say Jar!",
              expectedWord: "Jar",
            },
          },
        ],
      },
      {
        id: 5,
        title: "Listen: Joke",
        screens: [
          {
            id: "10-5-1",
            videoTitle: "Joke",
            videoSubtitle: "Joke has the /dʒ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Joke",
              subContent: "Joke has the /dʒ/ sound.",
              emoji: "😂",
              speechScript: "Joke has the /dʒ/ sound.",
              audioUrl: "/audios/words/joke.m4a",
              playCount: 3,
              phonemes: [
                { label: "/dʒ/", audioUrl: "/audios/sounds/j.m4a" },
                { label: "/əʊ/", audioUrl: "/audios/sounds/ah.m4a" },
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 6,
        title: "Say: Joke",
        screens: [
          {
            id: "10-6-1",
            videoTitle: "Say: Joke",
            videoSubtitle: "Your turn. Say: Joke",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Joke",
              speechScript: "You're hilarious! Now say Joke!",
              expectedWord: "Joke",
            },
          },
        ],
      },
      {
        id: 7,
        title: "Listen: Jam",
        screens: [
          {
            id: "10-7-1",
            videoTitle: "Jam",
            videoSubtitle: "Jam has the /dʒ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Jam",
              subContent: "Jam has the /dʒ/ sound.",
              emoji: "🍓",
              speechScript: "Jam has the /dʒ/ sound.",
              audioUrl: "/audios/words/jam.m4a",
              playCount: 3,
              phonemes: [
                { label: "/dʒ/", audioUrl: "/audios/sounds/j.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/m/", audioUrl: "/audios/sounds/m.m4a" },
              ],
            },
          },
        ],
      },
      {
        id: 8,
        title: "Say: Jam",
        screens: [
          {
            id: "10-8-1",
            videoTitle: "Say: Jam",
            videoSubtitle: "Your turn. Say: Jam",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Jam",
              speechScript: "Delicious work! Say Jam!",
              expectedWord: "Jam",
            },
          },
        ],
      },
      {
        id: 9,
        title: "Find /dʒ/ Words",
        screens: [
          {
            id: "10-9-1",
            videoTitle: "Find /dʒ/ Words",
            videoSubtitle: "Find the words with the /dʒ/ sound",
            exercise: {
              type: "tap-word",
              instruction: "Find words with the /dʒ/ sound",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "jar",  label: "Jar 🫙",  audioUrl: "/audios/words/jar.m4a" },
                { id: "fish", label: "Fish 🐟", audioUrl: "/audios/words/fish.m4a" },
                { id: "joke", label: "Joke 😂", audioUrl: "/audios/words/joke.m4a" },
                { id: "bed",  label: "Bed 🛏️",  audioUrl: "/audios/words/bed.m4a" },
                { id: "jam",  label: "Jam 🍓",  audioUrl: "/audios/words/jam.m4a" },
                { id: "goat", label: "Goat 🐐", audioUrl: "/audios/words/goat.m4a" },
              ],
              correctIds: ["jar", "joke", "jam"],
            },
          },
        ],
      },
      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            id: "10-10-1",
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Tap the voice, then tap the matching word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Match the voice to the word. Tap the voice, then tap the matching word.",
              pairs: [
                {
                  left: { id: "v-jar",  label: "🔊", audioUrl: "/audios/words/jar.m4a" },
                  right: { id: "w-jar",  label: "Jar 🫙" },
                },
                {
                  left: { id: "v-joke", label: "🔊", audioUrl: "/audios/words/joke.m4a" },
                  right: { id: "w-joke", label: "Joke 😂" },
                },
                {
                  left: { id: "v-jam",  label: "🔊", audioUrl: "/audios/words/jam.m4a" },
                  right: { id: "w-jam",  label: "Jam 🍓" },
                },
                {
                  left: { id: "v-lock", label: "🔊", audioUrl: "/audios/words/lock.m4a" },
                  right: { id: "w-lock", label: "Lock 🔒" },
                },
              ],
            },
          },
        ],
      },
      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            id: "10-11-1",
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Match the picture to the word.",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-jar",  label: "🫙" },
                  right: { id: "t-jar",  label: "Jar" },
                },
                {
                  left: { id: "p-joke", label: "😂" },
                  right: { id: "t-joke", label: "Joke" },
                },
                {
                  left: { id: "p-jam",  label: "🍓" },
                  right: { id: "t-jam",  label: "Jam" },
                },
                {
                  left: { id: "p-lock", label: "🔒" },
                  right: { id: "t-lock", label: "Lock" },
                },
              ],
            },
          },
        ],
      },
    ],
  },

  // ── Module 11: /uh/ ────────────────────────────────────────────────────────────
  {
    id: 11,
    title: "Phonetic Sound: /uh/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#CE82FF",
    chapters: [
      {
        id: 1,
        title: "Introduction to /uh/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /uh/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/uh/",
              speechScript: "Hello my stars! Our next sound is — /uh/! Let's learn how to say it!",
              phonemes: [{ label: "/uh/", audioUrl: "/audios/sounds/uh.m4a" }],
            },
            id: "11-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /uh/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /uh/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/uh/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /uh/ sound. Ready? Let's go!",
            },
            id: "11-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Bus",
        screens: [
          {
            videoTitle: "Bus",
            videoSubtitle: "Bus has the /uh/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Bus",
              subContent: "Bus has the /uh/ sound.",
              emoji: "🚌",
              speechScript: "Bus has the /uh/ sound.",
              audioUrl: "/audios/words/bus.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/ʌ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" }
              ]
            },
            id: "11-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Bus",
        screens: [
          {
            videoTitle: "Say: Bus",
            videoSubtitle: "Now it's your turn! Say Bus!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Bus",
              speechScript: "Now it's your turn! Say Bus!",
              expectedWord: "Bus"
            },
            id: "11-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Hut",
        screens: [
          {
            videoTitle: "Hut",
            videoSubtitle: "Hut has the /uh/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Hut",
              subContent: "Hut has the /uh/ sound.",
              emoji: "🛖",
              speechScript: "Hut has the /uh/ sound.",
              audioUrl: "/audios/words/hut.m4a",
              playCount: 3,
              phonemes: [
                { label: "/h/", audioUrl: "/audios/sounds/h.m4a" },
                { label: "/ʌ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "11-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Hut",
        screens: [
          {
            videoTitle: "Say: Hut",
            videoSubtitle: "Now it's your turn! Say Hut!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Hut",
              speechScript: "Now it's your turn! Say Hut!",
              expectedWord: "Hut"
            },
            id: "11-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Cup",
        screens: [
          {
            videoTitle: "Cup",
            videoSubtitle: "Cup has the /uh/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Cup",
              subContent: "Cup has the /uh/ sound.",
              emoji: "☕",
              speechScript: "Cup has the /uh/ sound.",
              audioUrl: "/audios/words/cup.m4a",
              playCount: 3,
              phonemes: [
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" },
                { label: "/ʌ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" }
              ]
            },
            id: "11-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Cup",
        screens: [
          {
            videoTitle: "Say: Cup",
            videoSubtitle: "Now it's your turn! Say Cup!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Cup",
              speechScript: "Now it's your turn! Say Cup!",
              expectedWord: "Cup"
            },
            id: "11-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /uh/ Words",
        screens: [
          {
            videoTitle: "Find /uh/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /uh/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "bus", label: "Bus 🚌", audioUrl: "/audios/words/bus.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "hut", label: "Hut 🛖", audioUrl: "/audios/words/hut.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "cup", label: "Cup ☕", audioUrl: "/audios/words/cup.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["bus", "hut", "cup"],
            },
            id: "11-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-bus", label: "🔊", audioUrl: "/audios/words/bus.m4a" },
                  right: { id: "w-bus", label: "Bus 🚌" },
                },
                {
                  left: { id: "v-hut", label: "🔊", audioUrl: "/audios/words/hut.m4a" },
                  right: { id: "w-hut", label: "Hut 🛖" },
                },
                {
                  left: { id: "v-cup", label: "🔊", audioUrl: "/audios/words/cup.m4a" },
                  right: { id: "w-cup", label: "Cup ☕" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "11-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-bus", label: "🚌" },
                  right: { id: "t-bus", label: "Bus" },
                },
                {
                  left: { id: "p-hut", label: "🛖" },
                  right: { id: "t-hut", label: "Hut" },
                },
                {
                  left: { id: "p-cup", label: "☕" },
                  right: { id: "t-cup", label: "Cup" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "11-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 12: /ʊ/ ────────────────────────────────────────────────────────────
  {
    id: 12,
    title: "Phonetic Sound: /ʊ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF6B6B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /ʊ/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /ʊ/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/ʊ/",
              speechScript: "Hello my stars! Our next sound is — /ʊ/! Let's learn how to say it!",
              phonemes: [{ label: "/ʊ/", audioUrl: "/audios/sounds/uh.m4a" }],
            },
            id: "12-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /ʊ/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /ʊ/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/ʊ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /ʊ/ sound. Ready? Let's go!",
            },
            id: "12-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Book",
        screens: [
          {
            videoTitle: "Book",
            videoSubtitle: "Book has the /ʊ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Book",
              subContent: "Book has the /ʊ/ sound.",
              emoji: "📖",
              speechScript: "Book has the /ʊ/ sound.",
              audioUrl: "/audios/words/book.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/ʊ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" }
              ]
            },
            id: "12-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Book",
        screens: [
          {
            videoTitle: "Say: Book",
            videoSubtitle: "Now it's your turn! Say Book!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Book",
              speechScript: "Now it's your turn! Say Book!",
              expectedWord: "Book"
            },
            id: "12-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Foot",
        screens: [
          {
            videoTitle: "Foot",
            videoSubtitle: "Foot has the /ʊ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Foot",
              subContent: "Foot has the /ʊ/ sound.",
              emoji: "🦶",
              speechScript: "Foot has the /ʊ/ sound.",
              audioUrl: "/audios/words/foot.m4a",
              playCount: 3,
              phonemes: [
                { label: "/f/", audioUrl: "/audios/sounds/f.m4a" },
                { label: "/ʊ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "12-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Foot",
        screens: [
          {
            videoTitle: "Say: Foot",
            videoSubtitle: "Now it's your turn! Say Foot!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Foot",
              speechScript: "Now it's your turn! Say Foot!",
              expectedWord: "Foot"
            },
            id: "12-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Pull",
        screens: [
          {
            videoTitle: "Pull",
            videoSubtitle: "Pull has the /ʊ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Pull",
              subContent: "Pull has the /ʊ/ sound.",
              emoji: "✊",
              speechScript: "Pull has the /ʊ/ sound.",
              audioUrl: "/audios/words/pull.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/ʊ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" }
              ]
            },
            id: "12-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Pull",
        screens: [
          {
            videoTitle: "Say: Pull",
            videoSubtitle: "Now it's your turn! Say Pull!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pull",
              speechScript: "Now it's your turn! Say Pull!",
              expectedWord: "Pull"
            },
            id: "12-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /ʊ/ Words",
        screens: [
          {
            videoTitle: "Find /ʊ/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /ʊ/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "book", label: "Book 📖", audioUrl: "/audios/words/book.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "foot", label: "Foot 🦶", audioUrl: "/audios/words/foot.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "pull", label: "Pull ✊", audioUrl: "/audios/words/pull.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["book", "foot", "pull"],
            },
            id: "12-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-book", label: "🔊", audioUrl: "/audios/words/book.m4a" },
                  right: { id: "w-book", label: "Book 📖" },
                },
                {
                  left: { id: "v-foot", label: "🔊", audioUrl: "/audios/words/foot.m4a" },
                  right: { id: "w-foot", label: "Foot 🦶" },
                },
                {
                  left: { id: "v-pull", label: "🔊", audioUrl: "/audios/words/pull.m4a" },
                  right: { id: "w-pull", label: "Pull ✊" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "12-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-book", label: "📖" },
                  right: { id: "t-book", label: "Book" },
                },
                {
                  left: { id: "p-foot", label: "🦶" },
                  right: { id: "t-foot", label: "Foot" },
                },
                {
                  left: { id: "p-pull", label: "✊" },
                  right: { id: "t-pull", label: "Pull" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "12-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 13: /u/ ────────────────────────────────────────────────────────────
  {
    id: 13,
    title: "Phonetic Sound: /u/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#58CC02",
    chapters: [
      {
        id: 1,
        title: "Introduction to /u/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /u/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/u/",
              speechScript: "Hello my stars! Our next sound is — /u/! Let's learn how to say it!",
              phonemes: [{ label: "/u/", audioUrl: "/audios/sounds/oo-short.m4a" }],
            },
            id: "13-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /u/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /u/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/u/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /u/ sound. Ready? Let's go!",
            },
            id: "13-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Moon",
        screens: [
          {
            videoTitle: "Moon",
            videoSubtitle: "Moon has the /u/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Moon",
              subContent: "Moon has the /u/ sound.",
              emoji: "🌙",
              speechScript: "Moon has the /u/ sound.",
              audioUrl: "/audios/words/moon.m4a",
              playCount: 3,
              phonemes: [
                { label: "/m/", audioUrl: "/audios/sounds/m.m4a" },
                { label: "/u/", audioUrl: "/audios/sounds/oo-short.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "13-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Moon",
        screens: [
          {
            videoTitle: "Say: Moon",
            videoSubtitle: "Now it's your turn! Say Moon!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Moon",
              speechScript: "Now it's your turn! Say Moon!",
              expectedWord: "Moon"
            },
            id: "13-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Pool",
        screens: [
          {
            videoTitle: "Pool",
            videoSubtitle: "Pool has the /u/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Pool",
              subContent: "Pool has the /u/ sound.",
              emoji: "🏊",
              speechScript: "Pool has the /u/ sound.",
              audioUrl: "/audios/words/pool.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/u/", audioUrl: "/audios/sounds/oo-short.m4a" },
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" }
              ]
            },
            id: "13-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Pool",
        screens: [
          {
            videoTitle: "Say: Pool",
            videoSubtitle: "Now it's your turn! Say Pool!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pool",
              speechScript: "Now it's your turn! Say Pool!",
              expectedWord: "Pool"
            },
            id: "13-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Food",
        screens: [
          {
            videoTitle: "Food",
            videoSubtitle: "Food has the /u/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Food",
              subContent: "Food has the /u/ sound.",
              emoji: "🍔",
              speechScript: "Food has the /u/ sound.",
              audioUrl: "/audios/words/food.m4a",
              playCount: 3,
              phonemes: [
                { label: "/f/", audioUrl: "/audios/sounds/f.m4a" },
                { label: "/u/", audioUrl: "/audios/sounds/oo-short.m4a" },
                { label: "/d/", audioUrl: "/audios/sounds/d.m4a" }
              ]
            },
            id: "13-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Food",
        screens: [
          {
            videoTitle: "Say: Food",
            videoSubtitle: "Now it's your turn! Say Food!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Food",
              speechScript: "Now it's your turn! Say Food!",
              expectedWord: "Food"
            },
            id: "13-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /u/ Words",
        screens: [
          {
            videoTitle: "Find /u/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /u/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "moon", label: "Moon 🌙", audioUrl: "/audios/words/moon.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "pool", label: "Pool 🏊", audioUrl: "/audios/words/pool.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "food", label: "Food 🍔", audioUrl: "/audios/words/food.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["moon", "pool", "food"],
            },
            id: "13-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-moon", label: "🔊", audioUrl: "/audios/words/moon.m4a" },
                  right: { id: "w-moon", label: "Moon 🌙" },
                },
                {
                  left: { id: "v-pool", label: "🔊", audioUrl: "/audios/words/pool.m4a" },
                  right: { id: "w-pool", label: "Pool 🏊" },
                },
                {
                  left: { id: "v-food", label: "🔊", audioUrl: "/audios/words/food.m4a" },
                  right: { id: "w-food", label: "Food 🍔" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "13-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-moon", label: "🌙" },
                  right: { id: "t-moon", label: "Moon" },
                },
                {
                  left: { id: "p-pool", label: "🏊" },
                  right: { id: "t-pool", label: "Pool" },
                },
                {
                  left: { id: "p-food", label: "🍔" },
                  right: { id: "t-food", label: "Food" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "13-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 14: /ɝ/ ────────────────────────────────────────────────────────────
  {
    id: 14,
    title: "Phonetic Sound: /ɝ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#1CB0F6",
    chapters: [
      {
        id: 1,
        title: "Introduction to /ɝ/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /ɝ/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/ɝ/",
              speechScript: "Hello my stars! Our next sound is — /ɝ/! Let's learn how to say it!",
              phonemes: [{ label: "/ɝ/", audioUrl: "/audios/sounds/er.m4a" }],
            },
            id: "14-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /ɝ/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /ɝ/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/ɝ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /ɝ/ sound. Ready? Let's go!",
            },
            id: "14-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Bird",
        screens: [
          {
            videoTitle: "Bird",
            videoSubtitle: "Bird has the /ɝ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Bird",
              subContent: "Bird has the /ɝ/ sound.",
              emoji: "🐦",
              speechScript: "Bird has the /ɝ/ sound.",
              audioUrl: "/audios/words/bird.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/ɝ/", audioUrl: "/audios/sounds/er.m4a" },
                { label: "/d/", audioUrl: "/audios/sounds/d.m4a" }
              ]
            },
            id: "14-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Bird",
        screens: [
          {
            videoTitle: "Say: Bird",
            videoSubtitle: "Now it's your turn! Say Bird!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Bird",
              speechScript: "Now it's your turn! Say Bird!",
              expectedWord: "Bird"
            },
            id: "14-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Shirt",
        screens: [
          {
            videoTitle: "Shirt",
            videoSubtitle: "Shirt has the /ɝ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Shirt",
              subContent: "Shirt has the /ɝ/ sound.",
              emoji: "👕",
              speechScript: "Shirt has the /ɝ/ sound.",
              audioUrl: "/audios/words/shirt.m4a",
              playCount: 3,
              phonemes: [
                { label: "/ʃ/", audioUrl: "/audios/sounds/sh.m4a" },
                { label: "/ɝ/", audioUrl: "/audios/sounds/er.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "14-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Shirt",
        screens: [
          {
            videoTitle: "Say: Shirt",
            videoSubtitle: "Now it's your turn! Say Shirt!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Shirt",
              speechScript: "Now it's your turn! Say Shirt!",
              expectedWord: "Shirt"
            },
            id: "14-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Hurt",
        screens: [
          {
            videoTitle: "Hurt",
            videoSubtitle: "Hurt has the /ɝ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Hurt",
              subContent: "Hurt has the /ɝ/ sound.",
              emoji: "🤕",
              speechScript: "Hurt has the /ɝ/ sound.",
              audioUrl: "/audios/words/hurt.m4a",
              playCount: 3,
              phonemes: [
                { label: "/h/", audioUrl: "/audios/sounds/h.m4a" },
                { label: "/ɝ/", audioUrl: "/audios/sounds/er.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "14-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Hurt",
        screens: [
          {
            videoTitle: "Say: Hurt",
            videoSubtitle: "Now it's your turn! Say Hurt!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Hurt",
              speechScript: "Now it's your turn! Say Hurt!",
              expectedWord: "Hurt"
            },
            id: "14-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /ɝ/ Words",
        screens: [
          {
            videoTitle: "Find /ɝ/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /ɝ/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "bird", label: "Bird 🐦", audioUrl: "/audios/words/bird.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "shirt", label: "Shirt 👕", audioUrl: "/audios/words/shirt.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "hurt", label: "Hurt 🤕", audioUrl: "/audios/words/hurt.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["bird", "shirt", "hurt"],
            },
            id: "14-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-bird", label: "🔊", audioUrl: "/audios/words/bird.m4a" },
                  right: { id: "w-bird", label: "Bird 🐦" },
                },
                {
                  left: { id: "v-shirt", label: "🔊", audioUrl: "/audios/words/shirt.m4a" },
                  right: { id: "w-shirt", label: "Shirt 👕" },
                },
                {
                  left: { id: "v-hurt", label: "🔊", audioUrl: "/audios/words/hurt.m4a" },
                  right: { id: "w-hurt", label: "Hurt 🤕" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "14-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-bird", label: "🐦" },
                  right: { id: "t-bird", label: "Bird" },
                },
                {
                  left: { id: "p-shirt", label: "👕" },
                  right: { id: "t-shirt", label: "Shirt" },
                },
                {
                  left: { id: "p-hurt", label: "🤕" },
                  right: { id: "t-hurt", label: "Hurt" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "14-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 15: /p/ ────────────────────────────────────────────────────────────
  {
    id: 15,
    title: "Phonetic Sound: /p/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF4B4B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /p/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /p/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/p/",
              speechScript: "Hello my stars! Our next sound is — /p/! Let's learn how to say it!",
              phonemes: [{ label: "/p/", audioUrl: "/audios/sounds/p.m4a" }],
            },
            id: "15-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /p/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /p/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/p/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /p/ sound. Ready? Let's go!",
            },
            id: "15-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Pen",
        screens: [
          {
            videoTitle: "Pen",
            videoSubtitle: "Pen has the /p/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Pen",
              subContent: "Pen has the /p/ sound.",
              emoji: "🖊️",
              speechScript: "Pen has the /p/ sound.",
              audioUrl: "/audios/words/pen.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/ɛ/", audioUrl: "/audios/sounds/eh.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "15-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Pen",
        screens: [
          {
            videoTitle: "Say: Pen",
            videoSubtitle: "Now it's your turn! Say Pen!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pen",
              speechScript: "Now it's your turn! Say Pen!",
              expectedWord: "Pen"
            },
            id: "15-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Cup",
        screens: [
          {
            videoTitle: "Cup",
            videoSubtitle: "Cup has the /p/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Cup",
              subContent: "Cup has the /p/ sound.",
              emoji: "☕",
              speechScript: "Cup has the /p/ sound.",
              audioUrl: "/audios/words/cup.m4a",
              playCount: 3,
              phonemes: [
                { label: "/k/", audioUrl: "/audios/sounds/k.m4a" },
                { label: "/ʌ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" }
              ]
            },
            id: "15-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Cup",
        screens: [
          {
            videoTitle: "Say: Cup",
            videoSubtitle: "Now it's your turn! Say Cup!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Cup",
              speechScript: "Now it's your turn! Say Cup!",
              expectedWord: "Cup"
            },
            id: "15-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Pan",
        screens: [
          {
            videoTitle: "Pan",
            videoSubtitle: "Pan has the /p/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Pan",
              subContent: "Pan has the /p/ sound.",
              emoji: "🍳",
              speechScript: "Pan has the /p/ sound.",
              audioUrl: "/audios/words/pan.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "15-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Pan",
        screens: [
          {
            videoTitle: "Say: Pan",
            videoSubtitle: "Now it's your turn! Say Pan!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pan",
              speechScript: "Now it's your turn! Say Pan!",
              expectedWord: "Pan"
            },
            id: "15-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /p/ Words",
        screens: [
          {
            videoTitle: "Find /p/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /p/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "pen", label: "Pen 🖊️", audioUrl: "/audios/words/pen.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "cup", label: "Cup ☕", audioUrl: "/audios/words/cup.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "pan", label: "Pan 🍳", audioUrl: "/audios/words/pan.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["pen", "cup", "pan"],
            },
            id: "15-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-pen", label: "🔊", audioUrl: "/audios/words/pen.m4a" },
                  right: { id: "w-pen", label: "Pen 🖊️" },
                },
                {
                  left: { id: "v-cup", label: "🔊", audioUrl: "/audios/words/cup.m4a" },
                  right: { id: "w-cup", label: "Cup ☕" },
                },
                {
                  left: { id: "v-pan", label: "🔊", audioUrl: "/audios/words/pan.m4a" },
                  right: { id: "w-pan", label: "Pan 🍳" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "15-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-pen", label: "🖊️" },
                  right: { id: "t-pen", label: "Pen" },
                },
                {
                  left: { id: "p-cup", label: "☕" },
                  right: { id: "t-cup", label: "Cup" },
                },
                {
                  left: { id: "p-pan", label: "🍳" },
                  right: { id: "t-pan", label: "Pan" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "15-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 16: /t/ ────────────────────────────────────────────────────────────
  {
    id: 16,
    title: "Phonetic Sound: /t/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF9600",
    chapters: [
      {
        id: 1,
        title: "Introduction to /t/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /t/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/t/",
              speechScript: "Hello my stars! Our next sound is — /t/! Let's learn how to say it!",
              phonemes: [{ label: "/t/", audioUrl: "/audios/sounds/t.m4a" }],
            },
            id: "16-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /t/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /t/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/t/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /t/ sound. Ready? Let's go!",
            },
            id: "16-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Tea",
        screens: [
          {
            videoTitle: "Tea",
            videoSubtitle: "Tea has the /t/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Tea",
              subContent: "Tea has the /t/ sound.",
              emoji: "🍵",
              speechScript: "Tea has the /t/ sound.",
              audioUrl: "/audios/words/tea.m4a",
              playCount: 3,
              phonemes: [
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
                { label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" }
              ]
            },
            id: "16-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Tea",
        screens: [
          {
            videoTitle: "Say: Tea",
            videoSubtitle: "Now it's your turn! Say Tea!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Tea",
              speechScript: "Now it's your turn! Say Tea!",
              expectedWord: "Tea"
            },
            id: "16-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Mat",
        screens: [
          {
            videoTitle: "Mat",
            videoSubtitle: "Mat has the /t/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Mat",
              subContent: "Mat has the /t/ sound.",
              emoji: "🔲",
              speechScript: "Mat has the /t/ sound.",
              audioUrl: "/audios/words/mat.m4a",
              playCount: 3,
              phonemes: [
                { label: "/m/", audioUrl: "/audios/sounds/m.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "16-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Mat",
        screens: [
          {
            videoTitle: "Say: Mat",
            videoSubtitle: "Now it's your turn! Say Mat!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Mat",
              speechScript: "Now it's your turn! Say Mat!",
              expectedWord: "Mat"
            },
            id: "16-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Tie",
        screens: [
          {
            videoTitle: "Tie",
            videoSubtitle: "Tie has the /t/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Tie",
              subContent: "Tie has the /t/ sound.",
              emoji: "👔",
              speechScript: "Tie has the /t/ sound.",
              audioUrl: "/audios/words/tie.m4a",
              playCount: 3,
              phonemes: [
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
                { label: "/aɪ/", audioUrl: "/audios/sounds/ai.m4a" }
              ]
            },
            id: "16-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Tie",
        screens: [
          {
            videoTitle: "Say: Tie",
            videoSubtitle: "Now it's your turn! Say Tie!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Tie",
              speechScript: "Now it's your turn! Say Tie!",
              expectedWord: "Tie"
            },
            id: "16-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /t/ Words",
        screens: [
          {
            videoTitle: "Find /t/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /t/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "tea", label: "Tea 🍵", audioUrl: "/audios/words/tea.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "mat", label: "Mat 🔲", audioUrl: "/audios/words/mat.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "tie", label: "Tie 👔", audioUrl: "/audios/words/tie.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["tea", "mat", "tie"],
            },
            id: "16-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-tea", label: "🔊", audioUrl: "/audios/words/tea.m4a" },
                  right: { id: "w-tea", label: "Tea 🍵" },
                },
                {
                  left: { id: "v-mat", label: "🔊", audioUrl: "/audios/words/mat.m4a" },
                  right: { id: "w-mat", label: "Mat 🔲" },
                },
                {
                  left: { id: "v-tie", label: "🔊", audioUrl: "/audios/words/tie.m4a" },
                  right: { id: "w-tie", label: "Tie 👔" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "16-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-tea", label: "🍵" },
                  right: { id: "t-tea", label: "Tea" },
                },
                {
                  left: { id: "p-mat", label: "🔲" },
                  right: { id: "t-mat", label: "Mat" },
                },
                {
                  left: { id: "p-tie", label: "👔" },
                  right: { id: "t-tie", label: "Tie" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "16-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 17: /tʃ/ ────────────────────────────────────────────────────────────
  {
    id: 17,
    title: "Phonetic Sound: /tʃ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#CE82FF",
    chapters: [
      {
        id: 1,
        title: "Introduction to /tʃ/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /tʃ/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/tʃ/",
              speechScript: "Hello my stars! Our next sound is — /tʃ/! Let's learn how to say it!",
              phonemes: [{ label: "/tʃ/", audioUrl: "/audios/sounds/ch.m4a" }],
            },
            id: "17-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /tʃ/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /tʃ/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/tʃ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /tʃ/ sound. Ready? Let's go!",
            },
            id: "17-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Chair",
        screens: [
          {
            videoTitle: "Chair",
            videoSubtitle: "Chair has the /tʃ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Chair",
              subContent: "Chair has the /tʃ/ sound.",
              emoji: "🪑",
              speechScript: "Chair has the /tʃ/ sound.",
              audioUrl: "/audios/words/chair.m4a",
              playCount: 3,
              phonemes: [
                { label: "/tʃ/", audioUrl: "/audios/sounds/ch.m4a" },
                { label: "/eə/", audioUrl: "/audios/sounds/ea.m4a" }
              ]
            },
            id: "17-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Chair",
        screens: [
          {
            videoTitle: "Say: Chair",
            videoSubtitle: "Now it's your turn! Say Chair!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Chair",
              speechScript: "Now it's your turn! Say Chair!",
              expectedWord: "Chair"
            },
            id: "17-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Watch",
        screens: [
          {
            videoTitle: "Watch",
            videoSubtitle: "Watch has the /tʃ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Watch",
              subContent: "Watch has the /tʃ/ sound.",
              emoji: "⌚",
              speechScript: "Watch has the /tʃ/ sound.",
              audioUrl: "/audios/words/watch.m4a",
              playCount: 3,
              phonemes: [
                { label: "/w/", audioUrl: "/audios/sounds/w.m4a" },
                { label: "/ɒ/", audioUrl: "/audios/sounds/o.m4a" },
                { label: "/tʃ/", audioUrl: "/audios/sounds/ch.m4a" }
              ]
            },
            id: "17-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Watch",
        screens: [
          {
            videoTitle: "Say: Watch",
            videoSubtitle: "Now it's your turn! Say Watch!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Watch",
              speechScript: "Now it's your turn! Say Watch!",
              expectedWord: "Watch"
            },
            id: "17-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Chest",
        screens: [
          {
            videoTitle: "Chest",
            videoSubtitle: "Chest has the /tʃ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Chest",
              subContent: "Chest has the /tʃ/ sound.",
              emoji: "🧰",
              speechScript: "Chest has the /tʃ/ sound.",
              audioUrl: "/audios/words/chest.m4a",
              playCount: 3,
              phonemes: [
                { label: "/tʃ/", audioUrl: "/audios/sounds/ch.m4a" },
                { label: "/ɛ/", audioUrl: "/audios/sounds/eh.m4a" },
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "17-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Chest",
        screens: [
          {
            videoTitle: "Say: Chest",
            videoSubtitle: "Now it's your turn! Say Chest!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Chest",
              speechScript: "Now it's your turn! Say Chest!",
              expectedWord: "Chest"
            },
            id: "17-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /tʃ/ Words",
        screens: [
          {
            videoTitle: "Find /tʃ/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /tʃ/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "chair", label: "Chair 🪑", audioUrl: "/audios/words/chair.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "watch", label: "Watch ⌚", audioUrl: "/audios/words/watch.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "chest", label: "Chest 🧰", audioUrl: "/audios/words/chest.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["chair", "watch", "chest"],
            },
            id: "17-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-chair", label: "🔊", audioUrl: "/audios/words/chair.m4a" },
                  right: { id: "w-chair", label: "Chair 🪑" },
                },
                {
                  left: { id: "v-watch", label: "🔊", audioUrl: "/audios/words/watch.m4a" },
                  right: { id: "w-watch", label: "Watch ⌚" },
                },
                {
                  left: { id: "v-chest", label: "🔊", audioUrl: "/audios/words/chest.m4a" },
                  right: { id: "w-chest", label: "Chest 🧰" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "17-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-chair", label: "🪑" },
                  right: { id: "t-chair", label: "Chair" },
                },
                {
                  left: { id: "p-watch", label: "⌚" },
                  right: { id: "t-watch", label: "Watch" },
                },
                {
                  left: { id: "p-chest", label: "🧰" },
                  right: { id: "t-chest", label: "Chest" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "17-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 18: /v/ ────────────────────────────────────────────────────────────
  {
    id: 18,
    title: "Phonetic Sound: /v/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF6B6B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /v/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /v/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/v/",
              speechScript: "Hello my stars! Our next sound is — /v/! Let's learn how to say it!",
              phonemes: [{ label: "/v/", audioUrl: "/audios/sounds/v.m4a" }],
            },
            id: "18-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /v/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /v/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/v/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /v/ sound. Ready? Let's go!",
            },
            id: "18-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Van",
        screens: [
          {
            videoTitle: "Van",
            videoSubtitle: "Van has the /v/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Van",
              subContent: "Van has the /v/ sound.",
              emoji: "🚐",
              speechScript: "Van has the /v/ sound.",
              audioUrl: "/audios/words/van.m4a",
              playCount: 3,
              phonemes: [
                { label: "/v/", audioUrl: "/audios/sounds/v.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "18-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Van",
        screens: [
          {
            videoTitle: "Say: Van",
            videoSubtitle: "Now it's your turn! Say Van!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Van",
              speechScript: "Now it's your turn! Say Van!",
              expectedWord: "Van"
            },
            id: "18-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Save",
        screens: [
          {
            videoTitle: "Save",
            videoSubtitle: "Save has the /v/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Save",
              subContent: "Save has the /v/ sound.",
              emoji: "💾",
              speechScript: "Save has the /v/ sound.",
              audioUrl: "/audios/words/save.m4a",
              playCount: 3,
              phonemes: [
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" },
                { label: "/eɪ/", audioUrl: "/audios/sounds/ay.m4a" },
                { label: "/v/", audioUrl: "/audios/sounds/v.m4a" }
              ]
            },
            id: "18-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Save",
        screens: [
          {
            videoTitle: "Say: Save",
            videoSubtitle: "Now it's your turn! Say Save!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Save",
              speechScript: "Now it's your turn! Say Save!",
              expectedWord: "Save"
            },
            id: "18-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Veil",
        screens: [
          {
            videoTitle: "Veil",
            videoSubtitle: "Veil has the /v/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Veil",
              subContent: "Veil has the /v/ sound.",
              emoji: "👰",
              speechScript: "Veil has the /v/ sound.",
              audioUrl: "/audios/words/veil.m4a",
              playCount: 3,
              phonemes: [
                { label: "/v/", audioUrl: "/audios/sounds/v.m4a" },
                { label: "/eɪ/", audioUrl: "/audios/sounds/ay.m4a" },
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" }
              ]
            },
            id: "18-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Veil",
        screens: [
          {
            videoTitle: "Say: Veil",
            videoSubtitle: "Now it's your turn! Say Veil!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Veil",
              speechScript: "Now it's your turn! Say Veil!",
              expectedWord: "Veil"
            },
            id: "18-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /v/ Words",
        screens: [
          {
            videoTitle: "Find /v/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /v/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "van", label: "Van 🚐", audioUrl: "/audios/words/van.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "save", label: "Save 💾", audioUrl: "/audios/words/save.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "veil", label: "Veil 👰", audioUrl: "/audios/words/veil.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["van", "save", "veil"],
            },
            id: "18-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-van", label: "🔊", audioUrl: "/audios/words/van.m4a" },
                  right: { id: "w-van", label: "Van 🚐" },
                },
                {
                  left: { id: "v-save", label: "🔊", audioUrl: "/audios/words/save.m4a" },
                  right: { id: "w-save", label: "Save 💾" },
                },
                {
                  left: { id: "v-veil", label: "🔊", audioUrl: "/audios/words/veil.m4a" },
                  right: { id: "w-veil", label: "Veil 👰" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "18-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-van", label: "🚐" },
                  right: { id: "t-van", label: "Van" },
                },
                {
                  left: { id: "p-save", label: "💾" },
                  right: { id: "t-save", label: "Save" },
                },
                {
                  left: { id: "p-veil", label: "👰" },
                  right: { id: "t-veil", label: "Veil" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "18-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 19: /θ/ ────────────────────────────────────────────────────────────
  {
    id: 19,
    title: "Phonetic Sound: /θ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#58CC02",
    chapters: [
      {
        id: 1,
        title: "Introduction to /θ/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /θ/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/θ/",
              speechScript: "Hello my stars! Our next sound is — /θ/! Let's learn how to say it!",
              phonemes: [{ label: "/θ/", audioUrl: "/audios/sounds/th.m4a" }],
            },
            id: "19-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /θ/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /θ/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/θ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /θ/ sound. Ready? Let's go!",
            },
            id: "19-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Thumb",
        screens: [
          {
            videoTitle: "Thumb",
            videoSubtitle: "Thumb has the /θ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Thumb",
              subContent: "Thumb has the /θ/ sound.",
              emoji: "👍",
              speechScript: "Thumb has the /θ/ sound.",
              audioUrl: "/audios/words/thumb.m4a",
              playCount: 3,
              phonemes: [
                { label: "/θ/", audioUrl: "/audios/sounds/th.m4a" },
                { label: "/ʌ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/m/", audioUrl: "/audios/sounds/m.m4a" }
              ]
            },
            id: "19-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Thumb",
        screens: [
          {
            videoTitle: "Say: Thumb",
            videoSubtitle: "Now it's your turn! Say Thumb!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Thumb",
              speechScript: "Now it's your turn! Say Thumb!",
              expectedWord: "Thumb"
            },
            id: "19-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Thin",
        screens: [
          {
            videoTitle: "Thin",
            videoSubtitle: "Thin has the /θ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Thin",
              subContent: "Thin has the /θ/ sound.",
              emoji: "📏",
              speechScript: "Thin has the /θ/ sound.",
              audioUrl: "/audios/words/thin.m4a",
              playCount: 3,
              phonemes: [
                { label: "/θ/", audioUrl: "/audios/sounds/th.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "19-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Thin",
        screens: [
          {
            videoTitle: "Say: Thin",
            videoSubtitle: "Now it's your turn! Say Thin!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Thin",
              speechScript: "Now it's your turn! Say Thin!",
              expectedWord: "Thin"
            },
            id: "19-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Three",
        screens: [
          {
            videoTitle: "Three",
            videoSubtitle: "Three has the /θ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Three",
              subContent: "Three has the /θ/ sound.",
              emoji: "3️⃣",
              speechScript: "Three has the /θ/ sound.",
              audioUrl: "/audios/words/three.m4a",
              playCount: 3,
              phonemes: [
                { label: "/θ/", audioUrl: "/audios/sounds/th.m4a" },
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" }
              ]
            },
            id: "19-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Three",
        screens: [
          {
            videoTitle: "Say: Three",
            videoSubtitle: "Now it's your turn! Say Three!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Three",
              speechScript: "Now it's your turn! Say Three!",
              expectedWord: "Three"
            },
            id: "19-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /θ/ Words",
        screens: [
          {
            videoTitle: "Find /θ/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /θ/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "thumb", label: "Thumb 👍", audioUrl: "/audios/words/thumb.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "thin", label: "Thin 📏", audioUrl: "/audios/words/thin.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "three", label: "Three 3️⃣", audioUrl: "/audios/words/three.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["thumb", "thin", "three"],
            },
            id: "19-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-thumb", label: "🔊", audioUrl: "/audios/words/thumb.m4a" },
                  right: { id: "w-thumb", label: "Thumb 👍" },
                },
                {
                  left: { id: "v-thin", label: "🔊", audioUrl: "/audios/words/thin.m4a" },
                  right: { id: "w-thin", label: "Thin 📏" },
                },
                {
                  left: { id: "v-three", label: "🔊", audioUrl: "/audios/words/three.m4a" },
                  right: { id: "w-three", label: "Three 3️⃣" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "19-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-thumb", label: "👍" },
                  right: { id: "t-thumb", label: "Thumb" },
                },
                {
                  left: { id: "p-thin", label: "📏" },
                  right: { id: "t-thin", label: "Thin" },
                },
                {
                  left: { id: "p-three", label: "3️⃣" },
                  right: { id: "t-three", label: "Three" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "19-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 20: /ð/ ────────────────────────────────────────────────────────────
  {
    id: 20,
    title: "Phonetic Sound: /ð/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#1CB0F6",
    chapters: [
      {
        id: 1,
        title: "Introduction to /ð/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /ð/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/ð/",
              speechScript: "Hello my stars! Our next sound is — /ð/! Let's learn how to say it!",
              phonemes: [{ label: "/ð/", audioUrl: "/audios/sounds/th.m4a" }],
            },
            id: "20-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /ð/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /ð/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/ð/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /ð/ sound. Ready? Let's go!",
            },
            id: "20-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: They",
        screens: [
          {
            videoTitle: "They",
            videoSubtitle: "They has the /ð/ sound.",
            exercise: {
              type: "text-lesson",
              content: "They",
              subContent: "They has the /ð/ sound.",
              emoji: "👥",
              speechScript: "They has the /ð/ sound.",
              audioUrl: "/audios/words/they.m4a",
              playCount: 3,
              phonemes: [
                { label: "/ð/", audioUrl: "/audios/sounds/th.m4a" },
                { label: "/eɪ/", audioUrl: "/audios/sounds/ay.m4a" }
              ]
            },
            id: "20-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: They",
        screens: [
          {
            videoTitle: "Say: They",
            videoSubtitle: "Now it's your turn! Say They!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: They",
              speechScript: "Now it's your turn! Say They!",
              expectedWord: "They"
            },
            id: "20-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Feather",
        screens: [
          {
            videoTitle: "Feather",
            videoSubtitle: "Feather has the /ð/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Feather",
              subContent: "Feather has the /ð/ sound.",
              emoji: "🪶",
              speechScript: "Feather has the /ð/ sound.",
              audioUrl: "/audios/words/feather.m4a",
              playCount: 3,
              phonemes: [
                { label: "/f/", audioUrl: "/audios/sounds/f.m4a" },
                { label: "/ɛ/", audioUrl: "/audios/sounds/eh.m4a" },
                { label: "/ð/", audioUrl: "/audios/sounds/th.m4a" },
                { label: "/ə/", audioUrl: "/audios/sounds/uh_schwa.m4a" }
              ]
            },
            id: "20-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Feather",
        screens: [
          {
            videoTitle: "Say: Feather",
            videoSubtitle: "Now it's your turn! Say Feather!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Feather",
              speechScript: "Now it's your turn! Say Feather!",
              expectedWord: "Feather"
            },
            id: "20-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Breathe",
        screens: [
          {
            videoTitle: "Breathe",
            videoSubtitle: "Breathe has the /ð/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Breathe",
              subContent: "Breathe has the /ð/ sound.",
              emoji: "😮‍💨",
              speechScript: "Breathe has the /ð/ sound.",
              audioUrl: "/audios/words/breathe.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" },
                { label: "/ð/", audioUrl: "/audios/sounds/th.m4a" }
              ]
            },
            id: "20-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Breathe",
        screens: [
          {
            videoTitle: "Say: Breathe",
            videoSubtitle: "Now it's your turn! Say Breathe!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Breathe",
              speechScript: "Now it's your turn! Say Breathe!",
              expectedWord: "Breathe"
            },
            id: "20-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /ð/ Words",
        screens: [
          {
            videoTitle: "Find /ð/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /ð/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "they", label: "They 👥", audioUrl: "/audios/words/they.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "feather", label: "Feather 🪶", audioUrl: "/audios/words/feather.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "breathe", label: "Breathe 😮‍💨", audioUrl: "/audios/words/breathe.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["they", "feather", "breathe"],
            },
            id: "20-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-they", label: "🔊", audioUrl: "/audios/words/they.m4a" },
                  right: { id: "w-they", label: "They 👥" },
                },
                {
                  left: { id: "v-feather", label: "🔊", audioUrl: "/audios/words/feather.m4a" },
                  right: { id: "w-feather", label: "Feather 🪶" },
                },
                {
                  left: { id: "v-breathe", label: "🔊", audioUrl: "/audios/words/breathe.m4a" },
                  right: { id: "w-breathe", label: "Breathe 😮‍💨" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "20-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-they", label: "👥" },
                  right: { id: "t-they", label: "They" },
                },
                {
                  left: { id: "p-feather", label: "🪶" },
                  right: { id: "t-feather", label: "Feather" },
                },
                {
                  left: { id: "p-breathe", label: "😮‍💨" },
                  right: { id: "t-breathe", label: "Breathe" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "20-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 21: /s/ ────────────────────────────────────────────────────────────
  {
    id: 21,
    title: "Phonetic Sound: /s/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF4B4B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /s/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /s/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/s/",
              speechScript: "Hello my stars! Our next sound is — /s/! Let's learn how to say it!",
              phonemes: [{ label: "/s/", audioUrl: "/audios/sounds/s.m4a" }],
            },
            id: "21-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /s/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /s/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/s/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /s/ sound. Ready? Let's go!",
            },
            id: "21-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Sun",
        screens: [
          {
            videoTitle: "Sun",
            videoSubtitle: "Sun has the /s/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Sun",
              subContent: "Sun has the /s/ sound.",
              emoji: "☀️",
              speechScript: "Sun has the /s/ sound.",
              audioUrl: "/audios/words/sun.m4a",
              playCount: 3,
              phonemes: [
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" },
                { label: "/ʌ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "21-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Sun",
        screens: [
          {
            videoTitle: "Say: Sun",
            videoSubtitle: "Now it's your turn! Say Sun!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Sun",
              speechScript: "Now it's your turn! Say Sun!",
              expectedWord: "Sun"
            },
            id: "21-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Bus",
        screens: [
          {
            videoTitle: "Bus",
            videoSubtitle: "Bus has the /s/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Bus",
              subContent: "Bus has the /s/ sound.",
              emoji: "🚌",
              speechScript: "Bus has the /s/ sound.",
              audioUrl: "/audios/words/bus.m4a",
              playCount: 3,
              phonemes: [
                { label: "/b/", audioUrl: "/audios/sounds/b.m4a" },
                { label: "/ʌ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" }
              ]
            },
            id: "21-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Bus",
        screens: [
          {
            videoTitle: "Say: Bus",
            videoSubtitle: "Now it's your turn! Say Bus!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Bus",
              speechScript: "Now it's your turn! Say Bus!",
              expectedWord: "Bus"
            },
            id: "21-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Rice",
        screens: [
          {
            videoTitle: "Rice",
            videoSubtitle: "Rice has the /s/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Rice",
              subContent: "Rice has the /s/ sound.",
              emoji: "🍚",
              speechScript: "Rice has the /s/ sound.",
              audioUrl: "/audios/words/rice.m4a",
              playCount: 3,
              phonemes: [
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/aɪ/", audioUrl: "/audios/sounds/ai.m4a" },
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" }
              ]
            },
            id: "21-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Rice",
        screens: [
          {
            videoTitle: "Say: Rice",
            videoSubtitle: "Now it's your turn! Say Rice!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Rice",
              speechScript: "Now it's your turn! Say Rice!",
              expectedWord: "Rice"
            },
            id: "21-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /s/ Words",
        screens: [
          {
            videoTitle: "Find /s/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /s/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "sun", label: "Sun ☀️", audioUrl: "/audios/words/sun.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "bus", label: "Bus 🚌", audioUrl: "/audios/words/bus.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "rice", label: "Rice 🍚", audioUrl: "/audios/words/rice.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["sun", "bus", "rice"],
            },
            id: "21-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-sun", label: "🔊", audioUrl: "/audios/words/sun.m4a" },
                  right: { id: "w-sun", label: "Sun ☀️" },
                },
                {
                  left: { id: "v-bus", label: "🔊", audioUrl: "/audios/words/bus.m4a" },
                  right: { id: "w-bus", label: "Bus 🚌" },
                },
                {
                  left: { id: "v-rice", label: "🔊", audioUrl: "/audios/words/rice.m4a" },
                  right: { id: "w-rice", label: "Rice 🍚" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "21-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-sun", label: "☀️" },
                  right: { id: "t-sun", label: "Sun" },
                },
                {
                  left: { id: "p-bus", label: "🚌" },
                  right: { id: "t-bus", label: "Bus" },
                },
                {
                  left: { id: "p-rice", label: "🍚" },
                  right: { id: "t-rice", label: "Rice" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "21-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 22: /z/ ────────────────────────────────────────────────────────────
  {
    id: 22,
    title: "Phonetic Sound: /z/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF9600",
    chapters: [
      {
        id: 1,
        title: "Introduction to /z/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /z/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/z/",
              speechScript: "Hello my stars! Our next sound is — /z/! Let's learn how to say it!",
              phonemes: [{ label: "/z/", audioUrl: "/audios/sounds/z.m4a" }],
            },
            id: "22-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /z/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /z/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/z/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /z/ sound. Ready? Let's go!",
            },
            id: "22-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Zoo",
        screens: [
          {
            videoTitle: "Zoo",
            videoSubtitle: "Zoo has the /z/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Zoo",
              subContent: "Zoo has the /z/ sound.",
              emoji: "🦁",
              speechScript: "Zoo has the /z/ sound.",
              audioUrl: "/audios/words/zoo.m4a",
              playCount: 3,
              phonemes: [
                { label: "/z/", audioUrl: "/audios/sounds/z.m4a" },
                { label: "/uː/", audioUrl: "/audios/sounds/oo-short.m4a" }
              ]
            },
            id: "22-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Zoo",
        screens: [
          {
            videoTitle: "Say: Zoo",
            videoSubtitle: "Now it's your turn! Say Zoo!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Zoo",
              speechScript: "Now it's your turn! Say Zoo!",
              expectedWord: "Zoo"
            },
            id: "22-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Zip",
        screens: [
          {
            videoTitle: "Zip",
            videoSubtitle: "Zip has the /z/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Zip",
              subContent: "Zip has the /z/ sound.",
              emoji: "🤐",
              speechScript: "Zip has the /z/ sound.",
              audioUrl: "/audios/words/zip.m4a",
              playCount: 3,
              phonemes: [
                { label: "/z/", audioUrl: "/audios/sounds/z.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" }
              ]
            },
            id: "22-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Zip",
        screens: [
          {
            videoTitle: "Say: Zip",
            videoSubtitle: "Now it's your turn! Say Zip!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Zip",
              speechScript: "Now it's your turn! Say Zip!",
              expectedWord: "Zip"
            },
            id: "22-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Rise",
        screens: [
          {
            videoTitle: "Rise",
            videoSubtitle: "Rise has the /z/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Rise",
              subContent: "Rise has the /z/ sound.",
              emoji: "🌅",
              speechScript: "Rise has the /z/ sound.",
              audioUrl: "/audios/words/rise.m4a",
              playCount: 3,
              phonemes: [
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/aɪ/", audioUrl: "/audios/sounds/ai.m4a" },
                { label: "/z/", audioUrl: "/audios/sounds/z.m4a" }
              ]
            },
            id: "22-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Rise",
        screens: [
          {
            videoTitle: "Say: Rise",
            videoSubtitle: "Now it's your turn! Say Rise!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Rise",
              speechScript: "Now it's your turn! Say Rise!",
              expectedWord: "Rise"
            },
            id: "22-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /z/ Words",
        screens: [
          {
            videoTitle: "Find /z/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /z/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "zoo", label: "Zoo 🦁", audioUrl: "/audios/words/zoo.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "zip", label: "Zip 🤐", audioUrl: "/audios/words/zip.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "rise", label: "Rise 🌅", audioUrl: "/audios/words/rise.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["zoo", "zip", "rise"],
            },
            id: "22-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-zoo", label: "🔊", audioUrl: "/audios/words/zoo.m4a" },
                  right: { id: "w-zoo", label: "Zoo 🦁" },
                },
                {
                  left: { id: "v-zip", label: "🔊", audioUrl: "/audios/words/zip.m4a" },
                  right: { id: "w-zip", label: "Zip 🤐" },
                },
                {
                  left: { id: "v-rise", label: "🔊", audioUrl: "/audios/words/rise.m4a" },
                  right: { id: "w-rise", label: "Rise 🌅" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "22-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-zoo", label: "🦁" },
                  right: { id: "t-zoo", label: "Zoo" },
                },
                {
                  left: { id: "p-zip", label: "🤐" },
                  right: { id: "t-zip", label: "Zip" },
                },
                {
                  left: { id: "p-rise", label: "🌅" },
                  right: { id: "t-rise", label: "Rise" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "22-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 23: /ʃ/ ────────────────────────────────────────────────────────────
  {
    id: 23,
    title: "Phonetic Sound: /ʃ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#CE82FF",
    chapters: [
      {
        id: 1,
        title: "Introduction to /ʃ/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /ʃ/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/ʃ/",
              speechScript: "Hello my stars! Our next sound is — /ʃ/! Let's learn how to say it!",
              phonemes: [{ label: "/ʃ/", audioUrl: "/audios/sounds/sh.m4a" }],
            },
            id: "23-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /ʃ/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /ʃ/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/ʃ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /ʃ/ sound. Ready? Let's go!",
            },
            id: "23-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Shoe",
        screens: [
          {
            videoTitle: "Shoe",
            videoSubtitle: "Shoe has the /ʃ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Shoe",
              subContent: "Shoe has the /ʃ/ sound.",
              emoji: "👞",
              speechScript: "Shoe has the /ʃ/ sound.",
              audioUrl: "/audios/words/shoe.m4a",
              playCount: 3,
              phonemes: [
                { label: "/ʃ/", audioUrl: "/audios/sounds/sh.m4a" },
                { label: "/uː/", audioUrl: "/audios/sounds/oo-short.m4a" }
              ]
            },
            id: "23-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Shoe",
        screens: [
          {
            videoTitle: "Say: Shoe",
            videoSubtitle: "Now it's your turn! Say Shoe!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Shoe",
              speechScript: "Now it's your turn! Say Shoe!",
              expectedWord: "Shoe"
            },
            id: "23-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Shop",
        screens: [
          {
            videoTitle: "Shop",
            videoSubtitle: "Shop has the /ʃ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Shop",
              subContent: "Shop has the /ʃ/ sound.",
              emoji: "🏪",
              speechScript: "Shop has the /ʃ/ sound.",
              audioUrl: "/audios/words/shop.m4a",
              playCount: 3,
              phonemes: [
                { label: "/ʃ/", audioUrl: "/audios/sounds/sh.m4a" },
                { label: "/ɒ/", audioUrl: "/audios/sounds/o.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" }
              ]
            },
            id: "23-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Shop",
        screens: [
          {
            videoTitle: "Say: Shop",
            videoSubtitle: "Now it's your turn! Say Shop!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Shop",
              speechScript: "Now it's your turn! Say Shop!",
              expectedWord: "Shop"
            },
            id: "23-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Ship",
        screens: [
          {
            videoTitle: "Ship",
            videoSubtitle: "Ship has the /ʃ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Ship",
              subContent: "Ship has the /ʃ/ sound.",
              emoji: "🚢",
              speechScript: "Ship has the /ʃ/ sound.",
              audioUrl: "/audios/words/ship.m4a",
              playCount: 3,
              phonemes: [
                { label: "/ʃ/", audioUrl: "/audios/sounds/sh.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" }
              ]
            },
            id: "23-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Ship",
        screens: [
          {
            videoTitle: "Say: Ship",
            videoSubtitle: "Now it's your turn! Say Ship!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Ship",
              speechScript: "Now it's your turn! Say Ship!",
              expectedWord: "Ship"
            },
            id: "23-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /ʃ/ Words",
        screens: [
          {
            videoTitle: "Find /ʃ/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /ʃ/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "shoe", label: "Shoe 👞", audioUrl: "/audios/words/shoe.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "shop", label: "Shop 🏪", audioUrl: "/audios/words/shop.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "ship", label: "Ship 🚢", audioUrl: "/audios/words/ship.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["shoe", "shop", "ship"],
            },
            id: "23-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-shoe", label: "🔊", audioUrl: "/audios/words/shoe.m4a" },
                  right: { id: "w-shoe", label: "Shoe 👞" },
                },
                {
                  left: { id: "v-shop", label: "🔊", audioUrl: "/audios/words/shop.m4a" },
                  right: { id: "w-shop", label: "Shop 🏪" },
                },
                {
                  left: { id: "v-ship", label: "🔊", audioUrl: "/audios/words/ship.m4a" },
                  right: { id: "w-ship", label: "Ship 🚢" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "23-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-shoe", label: "👞" },
                  right: { id: "t-shoe", label: "Shoe" },
                },
                {
                  left: { id: "p-shop", label: "🏪" },
                  right: { id: "t-shop", label: "Shop" },
                },
                {
                  left: { id: "p-ship", label: "🚢" },
                  right: { id: "t-ship", label: "Ship" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "23-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 24: /m/ ────────────────────────────────────────────────────────────
  {
    id: 24,
    title: "Phonetic Sound: /m/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF6B6B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /m/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /m/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/m/",
              speechScript: "Hello my stars! Our next sound is — /m/! Let's learn how to say it!",
              phonemes: [{ label: "/m/", audioUrl: "/audios/sounds/m.m4a" }],
            },
            id: "24-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /m/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /m/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/m/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /m/ sound. Ready? Let's go!",
            },
            id: "24-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Map",
        screens: [
          {
            videoTitle: "Map",
            videoSubtitle: "Map has the /m/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Map",
              subContent: "Map has the /m/ sound.",
              emoji: "🗺️",
              speechScript: "Map has the /m/ sound.",
              audioUrl: "/audios/words/map.m4a",
              playCount: 3,
              phonemes: [
                { label: "/m/", audioUrl: "/audios/sounds/m.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" }
              ]
            },
            id: "24-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Map",
        screens: [
          {
            videoTitle: "Say: Map",
            videoSubtitle: "Now it's your turn! Say Map!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Map",
              speechScript: "Now it's your turn! Say Map!",
              expectedWord: "Map"
            },
            id: "24-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Home",
        screens: [
          {
            videoTitle: "Home",
            videoSubtitle: "Home has the /m/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Home",
              subContent: "Home has the /m/ sound.",
              emoji: "🏠",
              speechScript: "Home has the /m/ sound.",
              audioUrl: "/audios/words/home.m4a",
              playCount: 3,
              phonemes: [
                { label: "/h/", audioUrl: "/audios/sounds/h.m4a" },
                { label: "/əʊ/", audioUrl: "/audios/sounds/oh.m4a" },
                { label: "/m/", audioUrl: "/audios/sounds/m.m4a" }
              ]
            },
            id: "24-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Home",
        screens: [
          {
            videoTitle: "Say: Home",
            videoSubtitle: "Now it's your turn! Say Home!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Home",
              speechScript: "Now it's your turn! Say Home!",
              expectedWord: "Home"
            },
            id: "24-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Mice",
        screens: [
          {
            videoTitle: "Mice",
            videoSubtitle: "Mice has the /m/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Mice",
              subContent: "Mice has the /m/ sound.",
              emoji: "🐁",
              speechScript: "Mice has the /m/ sound.",
              audioUrl: "/audios/words/mice.m4a",
              playCount: 3,
              phonemes: [
                { label: "/m/", audioUrl: "/audios/sounds/m.m4a" },
                { label: "/aɪ/", audioUrl: "/audios/sounds/ai.m4a" },
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" }
              ]
            },
            id: "24-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Mice",
        screens: [
          {
            videoTitle: "Say: Mice",
            videoSubtitle: "Now it's your turn! Say Mice!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Mice",
              speechScript: "Now it's your turn! Say Mice!",
              expectedWord: "Mice"
            },
            id: "24-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /m/ Words",
        screens: [
          {
            videoTitle: "Find /m/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /m/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "map", label: "Map 🗺️", audioUrl: "/audios/words/map.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "home", label: "Home 🏠", audioUrl: "/audios/words/home.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "mice", label: "Mice 🐁", audioUrl: "/audios/words/mice.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["map", "home", "mice"],
            },
            id: "24-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-map", label: "🔊", audioUrl: "/audios/words/map.m4a" },
                  right: { id: "w-map", label: "Map 🗺️" },
                },
                {
                  left: { id: "v-home", label: "🔊", audioUrl: "/audios/words/home.m4a" },
                  right: { id: "w-home", label: "Home 🏠" },
                },
                {
                  left: { id: "v-mice", label: "🔊", audioUrl: "/audios/words/mice.m4a" },
                  right: { id: "w-mice", label: "Mice 🐁" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "24-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-map", label: "🗺️" },
                  right: { id: "t-map", label: "Map" },
                },
                {
                  left: { id: "p-home", label: "🏠" },
                  right: { id: "t-home", label: "Home" },
                },
                {
                  left: { id: "p-mice", label: "🐁" },
                  right: { id: "t-mice", label: "Mice" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "24-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 25: /n/ ────────────────────────────────────────────────────────────
  {
    id: 25,
    title: "Phonetic Sound: /n/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#58CC02",
    chapters: [
      {
        id: 1,
        title: "Introduction to /n/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /n/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/n/",
              speechScript: "Hello my stars! Our next sound is — /n/! Let's learn how to say it!",
              phonemes: [{ label: "/n/", audioUrl: "/audios/sounds/n.m4a" }],
            },
            id: "25-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /n/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /n/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/n/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /n/ sound. Ready? Let's go!",
            },
            id: "25-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Note",
        screens: [
          {
            videoTitle: "Note",
            videoSubtitle: "Note has the /n/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Note",
              subContent: "Note has the /n/ sound.",
              emoji: "📝",
              speechScript: "Note has the /n/ sound.",
              audioUrl: "/audios/words/note.m4a",
              playCount: 3,
              phonemes: [
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" },
                { label: "/əʊ/", audioUrl: "/audios/sounds/oh.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "25-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Note",
        screens: [
          {
            videoTitle: "Say: Note",
            videoSubtitle: "Now it's your turn! Say Note!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Note",
              speechScript: "Now it's your turn! Say Note!",
              expectedWord: "Note"
            },
            id: "25-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Nine",
        screens: [
          {
            videoTitle: "Nine",
            videoSubtitle: "Nine has the /n/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Nine",
              subContent: "Nine has the /n/ sound.",
              emoji: "9️⃣",
              speechScript: "Nine has the /n/ sound.",
              audioUrl: "/audios/words/nine.m4a",
              playCount: 3,
              phonemes: [
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" },
                { label: "/aɪ/", audioUrl: "/audios/sounds/ai.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "25-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Nine",
        screens: [
          {
            videoTitle: "Say: Nine",
            videoSubtitle: "Now it's your turn! Say Nine!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Nine",
              speechScript: "Now it's your turn! Say Nine!",
              expectedWord: "Nine"
            },
            id: "25-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Run",
        screens: [
          {
            videoTitle: "Run",
            videoSubtitle: "Run has the /n/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Run",
              subContent: "Run has the /n/ sound.",
              emoji: "🏃",
              speechScript: "Run has the /n/ sound.",
              audioUrl: "/audios/words/run.m4a",
              playCount: 3,
              phonemes: [
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/ʌ/", audioUrl: "/audios/sounds/uh.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "25-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Run",
        screens: [
          {
            videoTitle: "Say: Run",
            videoSubtitle: "Now it's your turn! Say Run!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Run",
              speechScript: "Now it's your turn! Say Run!",
              expectedWord: "Run"
            },
            id: "25-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /n/ Words",
        screens: [
          {
            videoTitle: "Find /n/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /n/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "note", label: "Note 📝", audioUrl: "/audios/words/note.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "nine", label: "Nine 9️⃣", audioUrl: "/audios/words/nine.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "run", label: "Run 🏃", audioUrl: "/audios/words/run.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["note", "nine", "run"],
            },
            id: "25-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-note", label: "🔊", audioUrl: "/audios/words/note.m4a" },
                  right: { id: "w-note", label: "Note 📝" },
                },
                {
                  left: { id: "v-nine", label: "🔊", audioUrl: "/audios/words/nine.m4a" },
                  right: { id: "w-nine", label: "Nine 9️⃣" },
                },
                {
                  left: { id: "v-run", label: "🔊", audioUrl: "/audios/words/run.m4a" },
                  right: { id: "w-run", label: "Run 🏃" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "25-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-note", label: "📝" },
                  right: { id: "t-note", label: "Note" },
                },
                {
                  left: { id: "p-nine", label: "9️⃣" },
                  right: { id: "t-nine", label: "Nine" },
                },
                {
                  left: { id: "p-run", label: "🏃" },
                  right: { id: "t-run", label: "Run" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "25-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 26: /ŋ/ ────────────────────────────────────────────────────────────
  {
    id: 26,
    title: "Phonetic Sound: /ŋ/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#1CB0F6",
    chapters: [
      {
        id: 1,
        title: "Introduction to /ŋ/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /ŋ/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/ŋ/",
              speechScript: "Hello my stars! Our next sound is — /ŋ/! Let's learn how to say it!",
              phonemes: [{ label: "/ŋ/", audioUrl: "/audios/sounds/ng.m4a" }],
            },
            id: "26-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /ŋ/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /ŋ/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/ŋ/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /ŋ/ sound. Ready? Let's go!",
            },
            id: "26-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Ring",
        screens: [
          {
            videoTitle: "Ring",
            videoSubtitle: "Ring has the /ŋ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Ring",
              subContent: "Ring has the /ŋ/ sound.",
              emoji: "💍",
              speechScript: "Ring has the /ŋ/ sound.",
              audioUrl: "/audios/words/ring.m4a",
              playCount: 3,
              phonemes: [
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/ŋ/", audioUrl: "/audios/sounds/ng.m4a" }
              ]
            },
            id: "26-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Ring",
        screens: [
          {
            videoTitle: "Say: Ring",
            videoSubtitle: "Now it's your turn! Say Ring!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Ring",
              speechScript: "Now it's your turn! Say Ring!",
              expectedWord: "Ring"
            },
            id: "26-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Sing",
        screens: [
          {
            videoTitle: "Sing",
            videoSubtitle: "Sing has the /ŋ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Sing",
              subContent: "Sing has the /ŋ/ sound.",
              emoji: "🎤",
              speechScript: "Sing has the /ŋ/ sound.",
              audioUrl: "/audios/words/sing.m4a",
              playCount: 3,
              phonemes: [
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/ŋ/", audioUrl: "/audios/sounds/ng.m4a" }
              ]
            },
            id: "26-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Sing",
        screens: [
          {
            videoTitle: "Say: Sing",
            videoSubtitle: "Now it's your turn! Say Sing!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Sing",
              speechScript: "Now it's your turn! Say Sing!",
              expectedWord: "Sing"
            },
            id: "26-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Wing",
        screens: [
          {
            videoTitle: "Wing",
            videoSubtitle: "Wing has the /ŋ/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Wing",
              subContent: "Wing has the /ŋ/ sound.",
              emoji: "🪽",
              speechScript: "Wing has the /ŋ/ sound.",
              audioUrl: "/audios/words/wing.m4a",
              playCount: 3,
              phonemes: [
                { label: "/w/", audioUrl: "/audios/sounds/w.m4a" },
                { label: "/ɪ/", audioUrl: "/audios/sounds/ih.m4a" },
                { label: "/ŋ/", audioUrl: "/audios/sounds/ng.m4a" }
              ]
            },
            id: "26-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Wing",
        screens: [
          {
            videoTitle: "Say: Wing",
            videoSubtitle: "Now it's your turn! Say Wing!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Wing",
              speechScript: "Now it's your turn! Say Wing!",
              expectedWord: "Wing"
            },
            id: "26-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /ŋ/ Words",
        screens: [
          {
            videoTitle: "Find /ŋ/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /ŋ/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "ring", label: "Ring 💍", audioUrl: "/audios/words/ring.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "sing", label: "Sing 🎤", audioUrl: "/audios/words/sing.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "wing", label: "Wing 🪽", audioUrl: "/audios/words/wing.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["ring", "sing", "wing"],
            },
            id: "26-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-ring", label: "🔊", audioUrl: "/audios/words/ring.m4a" },
                  right: { id: "w-ring", label: "Ring 💍" },
                },
                {
                  left: { id: "v-sing", label: "🔊", audioUrl: "/audios/words/sing.m4a" },
                  right: { id: "w-sing", label: "Sing 🎤" },
                },
                {
                  left: { id: "v-wing", label: "🔊", audioUrl: "/audios/words/wing.m4a" },
                  right: { id: "w-wing", label: "Wing 🪽" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "26-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-ring", label: "💍" },
                  right: { id: "t-ring", label: "Ring" },
                },
                {
                  left: { id: "p-sing", label: "🎤" },
                  right: { id: "t-sing", label: "Sing" },
                },
                {
                  left: { id: "p-wing", label: "🪽" },
                  right: { id: "t-wing", label: "Wing" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "26-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 27: /l/ ────────────────────────────────────────────────────────────
  {
    id: 27,
    title: "Phonetic Sound: /l/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF4B4B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /l/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /l/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/l/",
              speechScript: "Hello my stars! Our next sound is — /l/! Let's learn how to say it!",
              phonemes: [{ label: "/l/", audioUrl: "/audios/sounds/l.m4a" }],
            },
            id: "27-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /l/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /l/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/l/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /l/ sound. Ready? Let's go!",
            },
            id: "27-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Lamp",
        screens: [
          {
            videoTitle: "Lamp",
            videoSubtitle: "Lamp has the /l/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Lamp",
              subContent: "Lamp has the /l/ sound.",
              emoji: "🪔",
              speechScript: "Lamp has the /l/ sound.",
              audioUrl: "/audios/words/lamp.m4a",
              playCount: 3,
              phonemes: [
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" },
                { label: "/æ/", audioUrl: "/audios/sounds/ae.m4a" },
                { label: "/m/", audioUrl: "/audios/sounds/m.m4a" },
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" }
              ]
            },
            id: "27-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Lamp",
        screens: [
          {
            videoTitle: "Say: Lamp",
            videoSubtitle: "Now it's your turn! Say Lamp!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Lamp",
              speechScript: "Now it's your turn! Say Lamp!",
              expectedWord: "Lamp"
            },
            id: "27-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Glass",
        screens: [
          {
            videoTitle: "Glass",
            videoSubtitle: "Glass has the /l/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Glass",
              subContent: "Glass has the /l/ sound.",
              emoji: "🥛",
              speechScript: "Glass has the /l/ sound.",
              audioUrl: "/audios/words/glass.m4a",
              playCount: 3,
              phonemes: [
                { label: "/g/", audioUrl: "/audios/sounds/g.m4a" },
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" },
                { label: "/ɑː/", audioUrl: "/audios/sounds/ah.m4a" },
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" }
              ]
            },
            id: "27-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Glass",
        screens: [
          {
            videoTitle: "Say: Glass",
            videoSubtitle: "Now it's your turn! Say Glass!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Glass",
              speechScript: "Now it's your turn! Say Glass!",
              expectedWord: "Glass"
            },
            id: "27-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Play",
        screens: [
          {
            videoTitle: "Play",
            videoSubtitle: "Play has the /l/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Play",
              subContent: "Play has the /l/ sound.",
              emoji: "🎮",
              speechScript: "Play has the /l/ sound.",
              audioUrl: "/audios/words/play.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" },
                { label: "/eɪ/", audioUrl: "/audios/sounds/ay.m4a" }
              ]
            },
            id: "27-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Play",
        screens: [
          {
            videoTitle: "Say: Play",
            videoSubtitle: "Now it's your turn! Say Play!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Play",
              speechScript: "Now it's your turn! Say Play!",
              expectedWord: "Play"
            },
            id: "27-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /l/ Words",
        screens: [
          {
            videoTitle: "Find /l/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /l/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "lamp", label: "Lamp 🪔", audioUrl: "/audios/words/lamp.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "glass", label: "Glass 🥛", audioUrl: "/audios/words/glass.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "play", label: "Play 🎮", audioUrl: "/audios/words/play.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["lamp", "glass", "play"],
            },
            id: "27-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-lamp", label: "🔊", audioUrl: "/audios/words/lamp.m4a" },
                  right: { id: "w-lamp", label: "Lamp 🪔" },
                },
                {
                  left: { id: "v-glass", label: "🔊", audioUrl: "/audios/words/glass.m4a" },
                  right: { id: "w-glass", label: "Glass 🥛" },
                },
                {
                  left: { id: "v-play", label: "🔊", audioUrl: "/audios/words/play.m4a" },
                  right: { id: "w-play", label: "Play 🎮" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "27-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-lamp", label: "🪔" },
                  right: { id: "t-lamp", label: "Lamp" },
                },
                {
                  left: { id: "p-glass", label: "🥛" },
                  right: { id: "t-glass", label: "Glass" },
                },
                {
                  left: { id: "p-play", label: "🎮" },
                  right: { id: "t-play", label: "Play" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "27-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 28: /r/ ────────────────────────────────────────────────────────────
  {
    id: 28,
    title: "Phonetic Sound: /r/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF9600",
    chapters: [
      {
        id: 1,
        title: "Introduction to /r/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /r/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/r/",
              speechScript: "Hello my stars! Our next sound is — /r/! Let's learn how to say it!",
              phonemes: [{ label: "/r/", audioUrl: "/audios/sounds/r.m4a" }],
            },
            id: "28-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /r/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /r/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/r/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /r/ sound. Ready? Let's go!",
            },
            id: "28-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Rain",
        screens: [
          {
            videoTitle: "Rain",
            videoSubtitle: "Rain has the /r/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Rain",
              subContent: "Rain has the /r/ sound.",
              emoji: "🌧️",
              speechScript: "Rain has the /r/ sound.",
              audioUrl: "/audios/words/rain.m4a",
              playCount: 3,
              phonemes: [
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/eɪ/", audioUrl: "/audios/sounds/ay.m4a" },
                { label: "/n/", audioUrl: "/audios/sounds/n.m4a" }
              ]
            },
            id: "28-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Rain",
        screens: [
          {
            videoTitle: "Say: Rain",
            videoSubtitle: "Now it's your turn! Say Rain!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Rain",
              speechScript: "Now it's your turn! Say Rain!",
              expectedWord: "Rain"
            },
            id: "28-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Read",
        screens: [
          {
            videoTitle: "Read",
            videoSubtitle: "Read has the /r/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Read",
              subContent: "Read has the /r/ sound.",
              emoji: "📖",
              speechScript: "Read has the /r/ sound.",
              audioUrl: "/audios/words/read.m4a",
              playCount: 3,
              phonemes: [
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/iː/", audioUrl: "/audios/sounds/ee.m4a" },
                { label: "/d/", audioUrl: "/audios/sounds/d.m4a" }
              ]
            },
            id: "28-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Read",
        screens: [
          {
            videoTitle: "Say: Read",
            videoSubtitle: "Now it's your turn! Say Read!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Read",
              speechScript: "Now it's your turn! Say Read!",
              expectedWord: "Read"
            },
            id: "28-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Pray",
        screens: [
          {
            videoTitle: "Pray",
            videoSubtitle: "Pray has the /r/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Pray",
              subContent: "Pray has the /r/ sound.",
              emoji: "🙏",
              speechScript: "Pray has the /r/ sound.",
              audioUrl: "/audios/words/pray.m4a",
              playCount: 3,
              phonemes: [
                { label: "/p/", audioUrl: "/audios/sounds/p.m4a" },
                { label: "/r/", audioUrl: "/audios/sounds/r.m4a" },
                { label: "/eɪ/", audioUrl: "/audios/sounds/ay.m4a" }
              ]
            },
            id: "28-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Pray",
        screens: [
          {
            videoTitle: "Say: Pray",
            videoSubtitle: "Now it's your turn! Say Pray!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Pray",
              speechScript: "Now it's your turn! Say Pray!",
              expectedWord: "Pray"
            },
            id: "28-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /r/ Words",
        screens: [
          {
            videoTitle: "Find /r/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /r/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "rain", label: "Rain 🌧️", audioUrl: "/audios/words/rain.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "read", label: "Read 📖", audioUrl: "/audios/words/read.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "pray", label: "Pray 🙏", audioUrl: "/audios/words/pray.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["rain", "read", "pray"],
            },
            id: "28-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-rain", label: "🔊", audioUrl: "/audios/words/rain.m4a" },
                  right: { id: "w-rain", label: "Rain 🌧️" },
                },
                {
                  left: { id: "v-read", label: "🔊", audioUrl: "/audios/words/read.m4a" },
                  right: { id: "w-read", label: "Read 📖" },
                },
                {
                  left: { id: "v-pray", label: "🔊", audioUrl: "/audios/words/pray.m4a" },
                  right: { id: "w-pray", label: "Pray 🙏" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "28-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-rain", label: "🌧️" },
                  right: { id: "t-rain", label: "Rain" },
                },
                {
                  left: { id: "p-read", label: "📖" },
                  right: { id: "t-read", label: "Read" },
                },
                {
                  left: { id: "p-pray", label: "🙏" },
                  right: { id: "t-pray", label: "Pray" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "28-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 29: /j/ ────────────────────────────────────────────────────────────
  {
    id: 29,
    title: "Phonetic Sound: /j/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#CE82FF",
    chapters: [
      {
        id: 1,
        title: "Introduction to /j/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /j/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/j/",
              speechScript: "Hello my stars! Our next sound is — /j/! Let's learn how to say it!",
              phonemes: [{ label: "/j/", audioUrl: "/audios/sounds/y.m4a" }],
            },
            id: "29-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /j/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /j/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/j/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /j/ sound. Ready? Let's go!",
            },
            id: "29-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Yoyo",
        screens: [
          {
            videoTitle: "Yoyo",
            videoSubtitle: "Yoyo has the /j/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Yoyo",
              subContent: "Yoyo has the /j/ sound.",
              emoji: "🪀",
              speechScript: "Yoyo has the /j/ sound.",
              audioUrl: "/audios/words/yoyo.m4a",
              playCount: 3,
              phonemes: [
                { label: "/j/", audioUrl: "/audios/sounds/y.m4a" },
                { label: "/əʊ/", audioUrl: "/audios/sounds/oh.m4a" },
                { label: "/j/", audioUrl: "/audios/sounds/y.m4a" },
                { label: "/əʊ/", audioUrl: "/audios/sounds/oh.m4a" }
              ]
            },
            id: "29-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Yoyo",
        screens: [
          {
            videoTitle: "Say: Yoyo",
            videoSubtitle: "Now it's your turn! Say Yoyo!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Yoyo",
              speechScript: "Now it's your turn! Say Yoyo!",
              expectedWord: "Yoyo"
            },
            id: "29-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: Yacht",
        screens: [
          {
            videoTitle: "Yacht",
            videoSubtitle: "Yacht has the /j/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Yacht",
              subContent: "Yacht has the /j/ sound.",
              emoji: "🛥️",
              speechScript: "Yacht has the /j/ sound.",
              audioUrl: "/audios/words/yacht.m4a",
              playCount: 3,
              phonemes: [
                { label: "/j/", audioUrl: "/audios/sounds/y.m4a" },
                { label: "/ɒ/", audioUrl: "/audios/sounds/o.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "29-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: Yacht",
        screens: [
          {
            videoTitle: "Say: Yacht",
            videoSubtitle: "Now it's your turn! Say Yacht!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Yacht",
              speechScript: "Now it's your turn! Say Yacht!",
              expectedWord: "Yacht"
            },
            id: "29-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Year",
        screens: [
          {
            videoTitle: "Year",
            videoSubtitle: "Year has the /j/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Year",
              subContent: "Year has the /j/ sound.",
              emoji: "📅",
              speechScript: "Year has the /j/ sound.",
              audioUrl: "/audios/words/year.m4a",
              playCount: 3,
              phonemes: [
                { label: "/j/", audioUrl: "/audios/sounds/y.m4a" },
                { label: "/ɪə/", audioUrl: "/audios/sounds/ear.m4a" }
              ]
            },
            id: "29-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Year",
        screens: [
          {
            videoTitle: "Say: Year",
            videoSubtitle: "Now it's your turn! Say Year!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Year",
              speechScript: "Now it's your turn! Say Year!",
              expectedWord: "Year"
            },
            id: "29-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /j/ Words",
        screens: [
          {
            videoTitle: "Find /j/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /j/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "yoyo", label: "Yoyo 🪀", audioUrl: "/audios/words/yoyo.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "yacht", label: "Yacht 🛥️", audioUrl: "/audios/words/yacht.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "year", label: "Year 📅", audioUrl: "/audios/words/year.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["yoyo", "yacht", "year"],
            },
            id: "29-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-yoyo", label: "🔊", audioUrl: "/audios/words/yoyo.m4a" },
                  right: { id: "w-yoyo", label: "Yoyo 🪀" },
                },
                {
                  left: { id: "v-yacht", label: "🔊", audioUrl: "/audios/words/yacht.m4a" },
                  right: { id: "w-yacht", label: "Yacht 🛥️" },
                },
                {
                  left: { id: "v-year", label: "🔊", audioUrl: "/audios/words/year.m4a" },
                  right: { id: "w-year", label: "Year 📅" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "29-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-yoyo", label: "🪀" },
                  right: { id: "t-yoyo", label: "Yoyo" },
                },
                {
                  left: { id: "p-yacht", label: "🛥️" },
                  right: { id: "t-yacht", label: "Yacht" },
                },
                {
                  left: { id: "p-year", label: "📅" },
                  right: { id: "t-year", label: "Year" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "29-11-1",
          },
        ],
      },
    ],
  },

  // ── Module 30: /w/ ────────────────────────────────────────────────────────────
  {
    id: 30,
    title: "Phonetic Sound: /w/",
    subtitle: "Learn the sound and connect it to words!",
    emoji: "🗣️",
    accentColor: "#FF6B6B",
    chapters: [
      {
        id: 1,
        title: "Introduction to /w/",
        screens: [
          {
            videoTitle: "Welcome",
            videoSubtitle: "Hello my stars! Our next sound is — /w/! Let's learn how to say it!",
            exercise: {
              type: "text-lesson",
              content: "/w/",
              speechScript: "Hello my stars! Our next sound is — /w/! Let's learn how to say it!",
              phonemes: [{ label: "/w/", audioUrl: "/audios/sounds/w.m4a" }],
            },
            id: "30-1-1",
          },
        ],
      },
      {
        id: 2,
        title: "Learn /w/ Words",
        screens: [
          {
            videoTitle: "Let's learn words",
            videoSubtitle: "Brilliant! Now let's meet some words that have the /w/ sound. Ready? Let's go!",
            exercise: {
              type: "text-lesson",
              content: "/w/ Words",
              speechScript: "Brilliant! Now let's meet some words that have the /w/ sound. Ready? Let's go!",
            },
            id: "30-2-1",
          },
        ],
      },

      {
        id: 3,
        title: "Listen: Water",
        screens: [
          {
            videoTitle: "Water",
            videoSubtitle: "Water has the /w/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Water",
              subContent: "Water has the /w/ sound.",
              emoji: "💧",
              speechScript: "Water has the /w/ sound.",
              audioUrl: "/audios/words/water.m4a",
              playCount: 3,
              phonemes: [
                { label: "/w/", audioUrl: "/audios/sounds/w.m4a" },
                { label: "/ɔː/", audioUrl: "/audios/sounds/aw.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" },
                { label: "/ə/", audioUrl: "/audios/sounds/uh_schwa.m4a" }
              ]
            },
            id: "30-3-1",
          },
        ],
      },

      {
        id: 4,
        title: "Say: Water",
        screens: [
          {
            videoTitle: "Say: Water",
            videoSubtitle: "Now it's your turn! Say Water!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Water",
              speechScript: "Now it's your turn! Say Water!",
              expectedWord: "Water"
            },
            id: "30-4-1"
          }
        ]
      },

      {
        id: 5,
        title: "Listen: West",
        screens: [
          {
            videoTitle: "West",
            videoSubtitle: "West has the /w/ sound.",
            exercise: {
              type: "text-lesson",
              content: "West",
              subContent: "West has the /w/ sound.",
              emoji: "🧭",
              speechScript: "West has the /w/ sound.",
              audioUrl: "/audios/words/west.m4a",
              playCount: 3,
              phonemes: [
                { label: "/w/", audioUrl: "/audios/sounds/w.m4a" },
                { label: "/ɛ/", audioUrl: "/audios/sounds/eh.m4a" },
                { label: "/s/", audioUrl: "/audios/sounds/s.m4a" },
                { label: "/t/", audioUrl: "/audios/sounds/t.m4a" }
              ]
            },
            id: "30-5-1",
          },
        ],
      },

      {
        id: 6,
        title: "Say: West",
        screens: [
          {
            videoTitle: "Say: West",
            videoSubtitle: "Now it's your turn! Say West!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: West",
              speechScript: "Now it's your turn! Say West!",
              expectedWord: "West"
            },
            id: "30-6-1"
          }
        ]
      },

      {
        id: 7,
        title: "Listen: Whale",
        screens: [
          {
            videoTitle: "Whale",
            videoSubtitle: "Whale has the /w/ sound.",
            exercise: {
              type: "text-lesson",
              content: "Whale",
              subContent: "Whale has the /w/ sound.",
              emoji: "🐳",
              speechScript: "Whale has the /w/ sound.",
              audioUrl: "/audios/words/whale.m4a",
              playCount: 3,
              phonemes: [
                { label: "/w/", audioUrl: "/audios/sounds/w.m4a" },
                { label: "/eɪ/", audioUrl: "/audios/sounds/ay.m4a" },
                { label: "/l/", audioUrl: "/audios/sounds/l.m4a" }
              ]
            },
            id: "30-7-1",
          },
        ],
      },

      {
        id: 8,
        title: "Say: Whale",
        screens: [
          {
            videoTitle: "Say: Whale",
            videoSubtitle: "Now it's your turn! Say Whale!",
            exercise: {
              type: "speaking-assessment",
              instruction: "Say: Whale",
              speechScript: "Now it's your turn! Say Whale!",
              expectedWord: "Whale"
            },
            id: "30-8-1"
          }
        ]
      },

      {
        id: 9,
        title: "Find /w/ Words",
        screens: [
          {
            videoTitle: "Find /w/ Words",
            videoSubtitle: "Time to play detective! Can you find all the words with that sound? Tap them all!",
            exercise: {
              type: "tap-word",
              instruction: "Find words with /w/",
              speechScript: "Time to play detective! Can you find all the words with that sound? Tap them all!",
              words: [
                { id: "water", label: "Water 💧", audioUrl: "/audios/words/water.m4a" },
                { id: "leg", label: "Leg 🦵", audioUrl: "/audios/words/leg.m4a" },
                { id: "west", label: "West 🧭", audioUrl: "/audios/words/west.m4a" },
                { id: "pot", label: "Pot 🍲", audioUrl: "/audios/words/pot.m4a" },
                { id: "whale", label: "Whale 🐳", audioUrl: "/audios/words/whale.m4a" },
                { id: "ten", label: "Ten 🔟", audioUrl: "/audios/words/ten.m4a" },
              ],
              correctIds: ["water", "west", "whale"],
            },
            id: "30-9-1",
          },
        ],
      },

      {
        id: 10,
        title: "Match Voice to Word",
        screens: [
          {
            videoTitle: "Match Voice to Word",
            videoSubtitle: "Listen carefully and match each voice to the right word. You've got this!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the voice to the word",
              speechScript: "Listen carefully and match each voice to the right word. You've got this!",
              pairs: [
                {
                  left: { id: "v-water", label: "🔊", audioUrl: "/audios/words/water.m4a" },
                  right: { id: "w-water", label: "Water 💧" },
                },
                {
                  left: { id: "v-west", label: "🔊", audioUrl: "/audios/words/west.m4a" },
                  right: { id: "w-west", label: "West 🧭" },
                },
                {
                  left: { id: "v-whale", label: "🔊", audioUrl: "/audios/words/whale.m4a" },
                  right: { id: "w-whale", label: "Whale 🐳" },
                },
                {
                  left: { id: "v-bad", label: "🔊", audioUrl: "/audios/words/bad.m4a" },
                  right: { id: "w-bad", label: "Bad 👎" },
                },
              ],
            },
            id: "30-10-1",
          },
        ],
      },

      {
        id: 11,
        title: "Match Picture to Word",
        screens: [
          {
            videoTitle: "Match Picture to Word",
            videoSubtitle: "Now look at the pictures and find their matching words. Let's go!",
            exercise: {
              type: "match-pairs",
              instruction: "Match the picture to the word",
              speechScript: "Now look at the pictures and find their matching words. Let's go!",
              pairs: [
                {
                  left: { id: "p-water", label: "💧" },
                  right: { id: "t-water", label: "Water" },
                },
                {
                  left: { id: "p-west", label: "🧭" },
                  right: { id: "t-west", label: "West" },
                },
                {
                  left: { id: "p-whale", label: "🐳" },
                  right: { id: "t-whale", label: "Whale" },
                },
                {
                  left: { id: "p-bad", label: "👎" },
                  right: { id: "t-bad", label: "Bad" },
                },
              ],
            },
            id: "30-11-1",
          },
        ],
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getModule(moduleId: number): Module | undefined {
  return courseModules.find((m) => m.id === moduleId);
}

export function getChapter(
  moduleId: number,
  chapterId: number,
): { module: Module; chapter: Chapter } | undefined {
  const mod = getModule(moduleId);
  if (!mod) return undefined;
  const chapter = mod.chapters.find((c) => c.id === chapterId);
  if (!chapter) return undefined;
  return { module: mod, chapter };
}

