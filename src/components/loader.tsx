"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { LogoMark, TagLogo } from "@/components/logo";
import { company } from "@/lib/site";

const fallingTags: Array<{
  left?: string;
  right?: string;
  width: number;
  delay: string;
  duration: string;
  spin: string;
  drift: string;
}> = [
  { left: "3%", width: 46, delay: "0s", duration: "2.5s", spin: "-16deg", drift: "18px" },
  { left: "11%", width: 32, delay: ".2s", duration: "2.9s", spin: "11deg", drift: "-12px" },
  { left: "18%", width: 40, delay: ".55s", duration: "2.6s", spin: "-8deg", drift: "10px" },
  { right: "4%", width: 50, delay: ".1s", duration: "2.7s", spin: "14deg", drift: "-16px" },
  { right: "13%", width: 34, delay: ".35s", duration: "3s", spin: "-12deg", drift: "8px" },
  { right: "20%", width: 42, delay: ".7s", duration: "2.4s", spin: "8deg", drift: "-10px" },
];

let introPlayed = false;

export function Loader() {
  const [hidden, setHidden] = useState(introPlayed);

  useEffect(() => {
    if (hidden) return;
    const timer = window.setTimeout(() => {
      introPlayed = true;
      setHidden(true);
    }, 3200);
    return () => {
      window.clearTimeout(timer);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-rain">
        {fallingTags.map((tag) => (
          <span
            key={`${tag.left ?? ""}-${tag.right ?? ""}-${tag.delay}`}
            className="loader-fall"
            style={{
              left: tag.left,
              right: tag.right,
              width: tag.width,
              animationDelay: tag.delay,
              animationDuration: tag.duration,
              "--spin": tag.spin,
              "--drift": tag.drift,
            } as CSSProperties}
          >
            <TagLogo />
          </span>
        ))}
      </div>
      <div className="loader-wordmark">
        <LogoMark className="loader-logo loader-logo-ghost" />
        <div className="loader-logo-fill">
          <LogoMark className="loader-logo" />
        </div>
      </div>
      <p>{company.slogan}</p>
      <span className="loader-meter" aria-hidden="true"><i /></span>
    </div>
  );
}
