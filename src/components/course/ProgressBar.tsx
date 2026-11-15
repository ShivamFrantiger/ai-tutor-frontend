"use client";

interface ProgressBarProps {
  current: number; // 1-based screen index
  total: number;
  onClose?: () => void;
}

export default function ProgressBar({ current, total, onClose }: ProgressBarProps) {
  const pct = Math.round(((current - 1) / total) * 100);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 16px",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: "2px solid rgba(0,0,0,0.05)",
        flexShrink: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        zIndex: 10,
        position: "relative",
      }}
    >
      {/* ── Close / Back button ────────────────────────────────────────────── */}
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Exit lesson"
          style={{
            flexShrink: 0,
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
            color: "#afafaf",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#f0f0f0")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "transparent")
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6"  y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {/* ── Progress track ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* Node dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: total }).map((_, i) => {
            const done   = i < current - 1;
            const active = i === current - 1;
            return (
              <div
                key={i}
                style={{
                  width:  active ? "16px" : done ? "12px" : "9px",
                  height: active ? "16px" : done ? "12px" : "9px",
                  borderRadius: "50%",
                  background: done
                    ? "var(--green)"
                    : active
                    ? "#fff"
                    : "#d8d8d8",
                  border: active
                    ? "3px solid var(--green)"
                    : "none",
                  boxShadow: active
                    ? "0 0 0 4px rgba(88,204,2,0.22)"
                    : done
                    ? "0 2px 4px rgba(88,204,2,0.3)"
                    : "none",
                  transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>

        {/* Bar track */}
        <div
          style={{
            height: "20px",
            background: "#e8e8e8",
            borderRadius: "999px",
            overflow: "hidden",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {/* Fill */}
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background:
                "linear-gradient(90deg, #46a302 0%, var(--green) 60%, #7fde2a 100%)",
              borderRadius: "999px",
              transition: "width 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
              position: "relative",
            }}
          >
            {/* Shine */}
            {pct > 5 && (
              <div
                style={{
                  position: "absolute",
                  top: "3px",
                  left: "6px",
                  right: "6px",
                  height: "5px",
                  background: "rgba(255,255,255,0.45)",
                  borderRadius: "999px",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Star counter ────────────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: "4px",
          background: "#fff8cc",
          border: "2px solid var(--yellow)",
          borderRadius: "999px",
          padding: "4px 12px",
          fontSize: "0.82rem",
          fontWeight: 800,
          color: "#7a5700",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 0 #c29600",
        }}
      >
        ⭐ {current - 1}/{total}
      </div>

      {/* ── Lives ───────────────────────────────────────────────────────────── */}
      <div
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: "2px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              fontSize: "1.1rem",
              lineHeight: 1,
              animation: `livesHeartbeat 3s ease-in-out ${i * 0.4}s infinite`,
              display: "inline-block",
            }}
          >
            ❤️
          </span>
        ))}
      </div>
    </div>
  );
}
