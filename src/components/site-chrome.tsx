"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import { SideMenu } from "@/components/side-menu";
import { SiteHeader } from "@/components/site-header";
import { QuickCalc } from "@/components/quick-calc";
import { ScrollFX } from "@/components/scroll-fx";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.documentElement.dataset.uiReady = "1";
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      {pathname === "/" ? <Loader /> : null}
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SiteHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((value) => !value)}
      />
      {children}
      <QuickCalc />
      <ScrollFX />
    </>
  );
}
