"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hidden ? "loader-hidden" : ""}`} aria-hidden={hidden}>
      <div className="loader-tag">
        <span>БИРКА</span>
        <span>МАРКЕТ</span>
      </div>
      <div className="loader-line">
        <i />
      </div>
      <p>Детали, которые создают бренд</p>
    </div>
  );
}
