"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export function ScrollFX() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main .section"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      nodes.forEach((node) => node.classList.add("is-in"));
      return;
    }
    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          seen.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    nodes.forEach((node) => {
      node.classList.add("reveal");
      seen.observe(node);
    });
    return () => seen.disconnect();
  }, [pathname]);

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
