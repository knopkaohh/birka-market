"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { goalForHref, trackGoal, trackPageView } from "@/lib/analytics";

function MetrikaEventsInner() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const skipFirstView = useRef(true);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (skipFirstView.current) {
      skipFirstView.current = false;
      return;
    }
    trackPageView(window.location.href);
  }, [pathname, search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const goal = goalForHref(href);
      if (!goal) return;
      trackGoal(goal, { page: window.location.pathname, href: href.slice(0, 180) });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

export function MetrikaEvents() {
  return <MetrikaEventsInner />;
}
