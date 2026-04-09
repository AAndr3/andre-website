import { ImageResponse } from "next/og";

export const alt = "André Antunes — Mais pacientes. Em 10 dias. Com garantia.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Emerald glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -160,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(52,211,153,0.12)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(52,211,153,0.07)",
            filter: "blur(80px)",
          }}
        />

        {/* Top: badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.25)",
              borderRadius: 999,
              padding: "8px 16px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
            <span style={{ color: "#34d399", fontSize: 14, fontWeight: 600, letterSpacing: "0.1em" }}>
              GROWTH PARTNER · PROFISSIONAIS DE SAÚDE
            </span>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, zIndex: 1, flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Mais pacientes.
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              background: "linear-gradient(90deg, #34d399, #6ee7b7)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Em 10 dias. Com garantia.
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#71717a",
              marginTop: 8,
              maxWidth: 700,
              lineHeight: 1.5,
            }}
          >
            Site profissional + SEO + Google Maps para médicos e psicólogos em Portugal.
            Garantia de 60 dias ou devolução total.
          </div>
        </div>

        {/* Bottom: stats + domain */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", zIndex: 1 }}>
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { v: "30+", l: "clientes" },
              { v: "4.9★", l: "avaliação" },
              { v: "10 dias", l: "entrega" },
              { v: "60 dias", l: "garantia" },
            ].map((s) => (
              <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#fafafa", fontFamily: "monospace" }}>{s.v}</span>
                <span style={{ fontSize: 13, color: "#52525b" }}>{s.l}</span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 15, color: "#3f3f46", fontFamily: "monospace" }}>andreantunes.co</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
