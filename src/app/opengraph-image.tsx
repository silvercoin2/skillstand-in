import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const mark = await readFile(join(process.cwd(), "public/brand/mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#09110d",
          backgroundImage:
            "linear-gradient(to right, rgba(38,55,44,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(38,55,44,0.45) 1px, transparent 1px), radial-gradient(circle at 88% 12%, rgba(105,229,154,0.28), transparent 42%)",
          backgroundSize: "48px 48px, 48px 48px, 100% 100%",
          color: "#f3f8f4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={markSrc} width={70} height={101} alt="" />
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            {siteConfig.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 980 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {siteConfig.tagline}
          </div>
          <div style={{ fontSize: 26, color: "#a5b4aa", lineHeight: 1.4, maxWidth: 860 }}>
            Experienced software engineers for AI training, evaluation, coding, and
            human-feedback work.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
