"use client";

import type { CSSProperties } from "react";

type MaskedHeadingProps = {
  text: string;
  mediaType?: "video" | "image";
  src: string;
  poster?: string;
  fillScale?: number;
  parallax?: number;
  reveal?: "scale" | "none";
  trigger?: "view" | "load";
  spotlight?: boolean;
  spotlightRadius?: number;
  outline?: boolean;
  duration?: number;
  stagger?: number;
  drift?: number;
  hoverZoom?: number;
  align?: "center" | "left" | "right";
  brightness?: number;
  saturation?: number;
  grayscale?: boolean;
  outlineWidth?: number;
  weight?: number;
  tracking?: number;
  lineHeight?: number;
  textScale?: number;
  className?: string;
};

function maskUrl(text: string, weight: number, tracking: number) {
  const safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const spacing = (tracking * 168).toFixed(2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 220"><text x="500" y="162" text-anchor="middle" fill="white" font-family="Manrope, Arial, sans-serif" font-weight="${weight}" font-size="168" letter-spacing="${spacing}">${safe}</text></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** Одно слово: видео внутри букв. Строку не склеивает — каждый вызов это одна линия. */
export default function MaskedHeading({
  text,
  mediaType = "video",
  src,
  poster,
  fillScale = 1.25,
  parallax = 26,
  reveal = "scale",
  duration = 1.1,
  drift = 18,
  hoverZoom = 0,
  align = "center",
  brightness = 1,
  saturation = 1,
  grayscale = false,
  outline = false,
  outlineWidth = 1,
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.115,
  className = "",
}: MaskedHeadingProps) {
  const mask = maskUrl(text, weight, tracking);
  const style = {
    "--mh-scale": textScale,
    "--mh-duration": `${duration}s`,
    "--mh-fill": fillScale,
    "--mh-drift": `${drift}px`,
    "--mh-parallax": `${parallax}px`,
    "--mh-zoom": hoverZoom,
    "--mh-bright": brightness,
    "--mh-sat": saturation,
    "--mh-gray": grayscale ? 1 : 0,
    "--mh-line": lineHeight,
    "--mh-outline": outline ? `${outlineWidth}px` : "0px",
    "--mh-mask": mask,
    textAlign: align,
  } as CSSProperties;

  return (
    <div className={`masked-heading ${reveal === "scale" ? "is-reveal" : ""} ${className}`.trim()} style={style}>
      <span className="masked-heading-fill" aria-hidden="true" />
      {mediaType === "video" ? (
        <video className="masked-heading-media" autoPlay muted loop playsInline poster={poster} src={src} />
      ) : (
        <img className="masked-heading-media" src={src} alt="" />
      )}
      <span className="visually-hidden">{text}</span>
    </div>
  );
}
