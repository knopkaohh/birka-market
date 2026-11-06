"use client";

import { useEffect, useState } from "react";
import FluxLines from "@/components/fx/FluxLines";
import { LogoMark } from "@/components/logo";
import { company } from "@/lib/site";

let introPlayed = false;

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
        glow={0.42}
        rimWidth={0.1}
        lineWidth={0.45}
        flowDirection="down"
        mouseInteraction
        clickSwirl
        speed={0.35}
        scale={1.2}
        turbulence={1}
        fluidity={0.1}
        sharpness={1.7}
        shimmer={0.7}
        mouseStrength={0.08}
        mouseRadius={0.08}
        swirlStrength={0.06}
        swirlRadius={0.05}
        opacity={0.22}
        intro
        lightMode={false}
        aria-hidden="true"
      />
      <div className="loader-wordmark">
        <LogoMark className="loader-logo loader-logo-ghost" />
        <div className="loader-logo-fill">
          <LogoMark className="loader-logo" />
        </div>
      </div>
      <p>{company.slogan}</p>
    </div>
  );
}
