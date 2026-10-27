"use client";

import { useEffect, useState } from "react";
import FluxLines from "@/components/fx/FluxLines";
import MaskedHeading from "@/components/fx/MaskedHeading";
import { company } from "@/lib/site";

let introPlayed = false;

const word = {
  mediaType: "video" as const,
  src: "/video/hero.mp4",
  poster: "/images/hero-poster.jpg",
  fillScale: 1.25,
  parallax: 26,
  reveal: "scale" as const,
  trigger: "view" as const,
  spotlight: false,
  spotlightRadius: 180,
  outline: false,
  duration: 1.1,
  stagger: 0.09,
  drift: 18,
  hoverZoom: 0,
  align: "center" as const,
  brightness: 0.46,
  saturation: 0.85,
  grayscale: false,
  outlineWidth: 1,
  weight: 700,
  tracking: -0.03,
  lineHeight: 1.06,
  textScale: 0.072,
};

export function Loader() {
  const [hidden, setHidden] = useState(introPlayed);

  useEffect(() => {
    if (hidden) return;
    const timer = window.setTimeout(() => {
      introPlayed = true;
      setHidden(true);
    }, 2300);
    return () => {
      window.clearTimeout(timer);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className="loader" aria-hidden="true">
      <FluxLines
        className="loader-flux"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        colors={["#ffffff", "#ffffff", "#ffffff"]}
        glow={0.55}
        rimWidth={0.1}
        lineWidth={0.4}
        flowDirection="down"
        mouseInteraction
        clickSwirl
        speed={0.28}
        scale={1.2}
        turbulence={1}
        fluidity={0.1}
        sharpness={1.7}
        shimmer={0.35}
        mouseStrength={0.06}
        mouseRadius={0.08}
        swirlStrength={0.04}
        swirlRadius={0.05}
        opacity={0.34}
        intro={false}
        lightMode
        aria-hidden="true"
      />
      <div className="loader-wordmark">
        <MaskedHeading text="БИРКА" {...word} />
        <MaskedHeading text="МАРКЕТ" {...word} />
      </div>
      <p>{company.slogan}</p>
    </div>
  );
}
