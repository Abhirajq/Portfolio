import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants";

// Rendered at build time and reused for both Open Graph and Twitter cards,
// so shared links stop resolving to an empty grey box.
export const alt = `${SITE_CONFIG.name} — AI/ML Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a1a",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(10,10,26,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(10,10,26,0) 70%)",
            display: "flex",
          }}
        />

        {/* Top row — monogram + role */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            AG
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#94A3B8",
            }}
          >
            AI / ML Engineer
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              color: "#f0f4ff",
              letterSpacing: -2,
            }}
          >
            {SITE_CONFIG.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#CBD5E1",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            {SITE_CONFIG.tagline}
          </div>
        </div>

        {/* Bottom row — focus areas */}
        <div style={{ display: "flex", gap: 14 }}>
          {["LLM Evaluation", "RAG Systems", "Deep Learning", "PyTorch", "Docker"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 9999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                fontSize: 22,
                color: "#94A3B8",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
