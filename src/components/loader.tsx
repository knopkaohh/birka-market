"use client";

import { useEffect, useState } from "react";
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
      <div className="loader-tag">
        <span>БИРКА</span>
        <span>МАРКЕТ</span>
      </div>
      <div className="loader-line">
        <i />
      </div>
      <p>{company.slogan}</p>
    </div>
  );
}
