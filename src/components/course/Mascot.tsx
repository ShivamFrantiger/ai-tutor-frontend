"use client";

type Mood = "neutral" | "happy" | "celebrating" | "encouraging";

interface MascotProps {
  mood?: Mood;
  size?: number;
  className?: string;
  animate?: boolean;
}

export default function Mascot({
  mood = "neutral",
  size = 100,
  className = "",
  animate = false,
}: MascotProps) {
  // Eye expressions per mood
  const eyeShapes: Record<Mood, { leftPath: string; rightPath: string; eyeColor: string }> = {
    neutral: {
      leftPath:  "M 30 38 a 8 8 0 1 1 16 0 a 8 8 0 1 1 -16 0",
      rightPath: "M 54 38 a 8 8 0 1 1 16 0 a 8 8 0 1 1 -16 0",
      eyeColor: "#fff",
    },
    happy: {
      leftPath:  "M 28 42 Q 38 30 48 42",
      rightPath: "M 52 42 Q 62 30 72 42",
      eyeColor: "#fff",
    },
    celebrating: {
      leftPath:  "M 28 42 Q 38 28 48 42",
      rightPath: "M 52 42 Q 62 28 72 42",
      eyeColor: "#fff",
    },
    encouraging: {
      leftPath:  "M 30 38 a 8 8 0 1 1 16 0 a 8 8 0 1 1 -16 0",
      rightPath: "M 54 38 a 8 8 0 1 1 16 0 a 8 8 0 1 1 -16 0",
      eyeColor: "#fff",
    },
  };

  const { leftPath, rightPath, eyeColor } = eyeShapes[mood];
  const isRoundEye = mood === "neutral" || mood === "encouraging";
  const bodyColor = mood === "celebrating" ? "#58CC02" : mood === "encouraging" ? "#FFC800" : "#58CC02";
  const bellColor = "#e8ffd0";

  const bounceClass = animate ? "anim-mascot-bounce" : "";

  return (
    <div
      className={`inline-block ${bounceClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 110"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Shadow */}
        <ellipse cx="50" cy="107" rx="22" ry="5" fill="rgba(0,0,0,0.10)" />

        {/* Wings */}
        <ellipse cx="18" cy="72" rx="14" ry="22" fill={bodyColor} transform="rotate(-18,18,72)" opacity="0.9" />
        <ellipse cx="82" cy="72" rx="14" ry="22" fill={bodyColor} transform="rotate(18,82,72)" opacity="0.9" />

        {/* Body */}
        <ellipse cx="50" cy="72" rx="30" ry="34" fill={bodyColor} />

        {/* Belly */}
        <ellipse cx="50" cy="78" rx="18" ry="20" fill={bellColor} />

        {/* Head */}
        <circle cx="50" cy="40" r="32" fill={bodyColor} />

        {/* Ear tufts */}
        <polygon points="24,14 18,2 30,10" fill={bodyColor} />
        <polygon points="76,14 82,2 70,10" fill={bodyColor} />

        {/* Face disc */}
        <ellipse cx="50" cy="42" rx="26" ry="24" fill={bellColor} opacity="0.6" />

        {/* Eyes */}
        {isRoundEye ? (
          <>
            {/* Left eye */}
            <circle cx="38" cy="38" r="10" fill="#fff" />
            <circle cx="38" cy="38" r="6"  fill="#2d2d2d" />
            <circle cx="40" cy="36" r="2"  fill="#fff" />
            {/* Right eye */}
            <circle cx="62" cy="38" r="10" fill="#fff" />
            <circle cx="62" cy="38" r="6"  fill="#2d2d2d" />
            <circle cx="64" cy="36" r="2"  fill="#fff" />
          </>
        ) : (
          <>
            {/* Happy/celebrating arc eyes */}
            <path d={leftPath}  stroke="#2d2d2d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d={rightPath} stroke="#2d2d2d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Little stars for celebrating */}
            {mood === "celebrating" && (
              <>
                <text x="22" y="30" fontSize="10" textAnchor="middle">✨</text>
                <text x="78" y="30" fontSize="10" textAnchor="middle">✨</text>
              </>
            )}
          </>
        )}

        {/* Beak */}
        <polygon
          points={mood === "celebrating" || mood === "happy" ? "50,50 44,46 56,46" : "50,50 44,47 56,47"}
          fill="#FFC800"
        />

        {/* Smile for happy/celebrating */}
        {(mood === "happy" || mood === "celebrating") && (
          <path d="M 41 54 Q 50 62 59 54" stroke="#2d2d2d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* Encouraging eyebrows (slightly tilted inward to look caring) */}
        {mood === "encouraging" && (
          <>
            <path d="M 30 28 Q 37 24 44 28" stroke="#5a3a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 56 28 Q 63 24 70 28" stroke="#5a3a00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Belly pattern — subtle horizontal lines */}
        <ellipse cx="50" cy="82" rx="10" ry="1.5" fill={bodyColor} opacity="0.2" />
        <ellipse cx="50" cy="86" rx="8"  ry="1.5" fill={bodyColor} opacity="0.2" />
      </svg>
    </div>
  );
}
