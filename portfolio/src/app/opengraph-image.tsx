import { ImageResponse } from "next/og";
export const alt =
  "Sherzod Akhmedov. Middle Flutter and Full-stack Developer. Ideas into new worlds.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#10120f",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "60px 70px",
        color: "#eff1e8",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
        <span>SHERZOD AKHMEDOV</span>
        <span style={{ color: "#a2aa97" }}>FLUTTER / FULL-STACK / AI</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 106,
          lineHeight: 1.05,
          letterSpacing: -7,
          marginTop: 92,
        }}
      >
        <span>IDEAS INTO</span>
        <span style={{ color: "#c4e98d" }}>NEW WORLDS.</span>
      </div>
      <div style={{ display: "flex", marginTop: 58, color: "#a2aa97", fontSize: 22 }}>
        Middle Developer · Tashkent · Open to remote opportunities
      </div>
    </div>,
    size,
  );
}
