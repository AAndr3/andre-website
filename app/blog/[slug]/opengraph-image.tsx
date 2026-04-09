import { ImageResponse } from "next/og";
import { posts } from "@/content/blog/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return [{ id: "og", alt: post?.title ?? "André Antunes — Blog" }];
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  emerald: { bg: "rgba(52,211,153,0.12)", text: "#34d399", border: "rgba(52,211,153,0.3)" },
  blue:    { bg: "rgba(96,165,250,0.12)", text: "#60a5fa", border: "rgba(96,165,250,0.3)" },
  purple:  { bg: "rgba(167,139,250,0.12)", text: "#a78bfa", border: "rgba(167,139,250,0.3)" },
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const colors = categoryColors[post?.categoryColor ?? "emerald"];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: colors.bg,
            filter: "blur(100px)",
          }}
        />

        {/* Top: category + author */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 999,
              padding: "8px 18px",
            }}
          >
            <span style={{ color: colors.text, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em" }}>
              {post?.category?.toUpperCase() ?? "BLOG"}
            </span>
          </div>
          <span style={{ fontSize: 13, color: "#3f3f46", fontFamily: "monospace" }}>andreantunes.co/blog</span>
        </div>

        {/* Middle: title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, zIndex: 1 }}>
          <div
            style={{
              fontSize: post && post.title.length > 60 ? 48 : 56,
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            {post?.title ?? "Blog"}
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#71717a",
              lineHeight: 1.5,
              maxWidth: 760,
            }}
          >
            {post?.description ?? ""}
          </div>
        </div>

        {/* Bottom: author + read time */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(52,211,153,0.12)",
                border: "1px solid rgba(52,211,153,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "#34d399",
              }}
            >
              AA
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#d4d4d8" }}>André Antunes</span>
              <span style={{ fontSize: 13, color: "#52525b" }}>Growth Partner · Portugal</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 999,
              padding: "8px 18px",
            }}
          >
            <span style={{ fontSize: 13, color: "#52525b" }}>{post?.readTime ?? ""} de leitura</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
