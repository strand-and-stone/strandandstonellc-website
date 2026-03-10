import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Strand & Stone LLC — Digital Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle vignette corners */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 50%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, #C9B99A, transparent)",
            opacity: 0.4,
          }}
        />
        {/* Accent line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, #C9B99A, transparent)",
            opacity: 0.4,
          }}
        />

        {/* EST label */}
        <div
          style={{
            color: "#C9B99A",
            fontSize: 14,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 24,
            fontFamily: "monospace",
          }}
        >
          EST. 2013
        </div>

        {/* Wordmark */}
        <div
          style={{
            color: "#F0EDE8",
            fontSize: 110,
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            display: "flex",
            alignItems: "baseline",
          }}
        >
          STRAND
          <span style={{ color: "#C9B99A", margin: "0 4px" }}>&amp;</span>
          STONE
        </div>

        {/* LLC */}
        <div
          style={{
            color: "#8C7D6B",
            fontSize: 14,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: 16,
            fontFamily: "monospace",
          }}
        >
          LLC
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, transparent, #C9B99A, transparent)",
            opacity: 0.5,
            margin: "32px 0",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            color: "#8C7D6B",
            fontSize: 22,
            fontStyle: "italic",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        >
          Crafting unique digital experiences.
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            color: "#8C7D6B",
            fontSize: 12,
            letterSpacing: "0.2em",
            fontFamily: "monospace",
            opacity: 0.5,
          }}
        >
          STRANDANDSTONELLC.COM
        </div>
      </div>
    ),
    { ...size }
  );
}
