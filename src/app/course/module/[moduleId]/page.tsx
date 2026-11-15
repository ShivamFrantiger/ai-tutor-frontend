import Link from "next/link";
import { getModule } from "@/lib/courseData";
import { notFound } from "next/navigation";
import ModuleIntroClient from "@/components/course/ModuleIntroClient";

export default async function ModuleIntroPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = getModule(Number(moduleId));
  if (!mod) notFound();

  const firstChapterUrl = `/course/module/${mod.id}/learn`;

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        background: "linear-gradient(160deg, #f0fff4 0%, #e8f5e9 50%, #f9fbe7 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        gap: "0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-display)",
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: "absolute", top: "-60px", left: "-60px",
        width: "300px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(88,204,2,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-80px", right: "-60px",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(28,176,246,0.10) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Module badge */}
      <div
        className="anim-fade-in"
        style={{
          background: "rgba(88,204,2,0.12)",
          border: "2px solid var(--green)",
          borderRadius: "999px",
          padding: "6px 20px",
          fontSize: "0.85rem",
          fontWeight: 800,
          color: "#2a6600",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "28px",
        }}
      >
        Module {mod.id}
      </div>

      {/* Big emoji */}
      <div
        className="anim-float-bounce"
        style={{ fontSize: "6rem", lineHeight: 1, marginBottom: "24px" }}
      >
        {mod.emoji}
      </div>

      {/* Title */}
      <h1
        className="anim-fade-in"
        style={{
          fontSize: "clamp(1.8rem, 6vw, 2.8rem)",
          fontWeight: 900,
          color: "#2a6600",
          textAlign: "center",
          margin: "0 0 12px",
          lineHeight: 1.2,
          maxWidth: "360px",
          animationDelay: "0.1s",
        }}
      >
        {mod.title}
      </h1>

      {/* Subtitle */}
      <p
        className="anim-fade-in"
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#558b2f",
          textAlign: "center",
          margin: "0 0 36px",
          maxWidth: "320px",
          animationDelay: "0.2s",
        }}
      >
        {mod.subtitle}
      </p>

      {/* Chapter count */}
      <div
        className="anim-fade-in"
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "44px",
          animationDelay: "0.25s",
        }}
      >
        {mod.chapters.map((_, i) => (
          <div
            key={i}
            style={{
              width: "36px",
              height: "8px",
              borderRadius: "999px",
              background: i === 0 ? "var(--green)" : "#c8e6c9",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>

      {/* Chapter count label */}
      <p
        className="anim-fade-in"
        style={{
          fontSize: "0.9rem",
          fontWeight: 700,
          color: "#7cad6a",
          marginBottom: "32px",
          animationDelay: "0.3s",
        }}
      >
        {mod.chapters.length} chapters to complete
      </p>

      {/* CTA Button with Audio */}
      <ModuleIntroClient firstChapterUrl={firstChapterUrl} />

      {/* Back link */}
      <Link
        href="/"
        style={{
          marginTop: "24px",
          fontSize: "0.875rem",
          fontWeight: 700,
          color: "#afafaf",
          textDecoration: "none",
        }}
      >
        ← Back to home
      </Link>
    </div>
  );
}
