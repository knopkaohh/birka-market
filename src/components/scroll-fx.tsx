"use client";

import { useEffect } from "react";

export function ScrollFX() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let frame = 0;
    const update = () => {
      const y = window.scrollY;
      document.documentElement.style.setProperty("--scroll-y", String(y));
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((layer) => {
        const depth = Number(layer.dataset.parallax) || 0;
        const base = layer.dataset.parallaxBase ? ` ${layer.dataset.parallaxBase}` : "";
        layer.style.transform = `translate3d(0, ${(-y * depth).toFixed(1)}px, 0)${base}`;
      });
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
