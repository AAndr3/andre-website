import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          position: "relative",
        }}
      >
        {/* Emerald dot accent */}
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#34d399",
          }}
        />
        {/* A monogram */}
        <span
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#fafafa",
            fontFamily: "system-ui",
            letterSpacing: "-0.05em",
          }}
        >
          A
        </span>
      </div>
    ),
    { ...size }
  );
}
