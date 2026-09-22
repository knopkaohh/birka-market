"use client";

import { useEffect, useState } from "react";
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
    }, 1100);
    return () => {
      window.clearTimeout(timer);
      introPlayed = true;
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className="loader" aria-hidden="true">
      <LogoMark className="loader-logo" />
      <div className="loader-line">
        <i />
      </div>
      <p>{company.slogan}</p>
    </div>
  );
}
