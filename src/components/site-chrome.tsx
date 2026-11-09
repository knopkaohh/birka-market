"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { FloatingContact } from "@/components/floating-contact";
import { InactivityPrompt } from "@/components/InactivityPrompt";
import { Loader } from "@/components/loader";
import { SidebarMenu } from "@/components/SidebarMenu";
import { SiteHeader } from "@/components/site-header";
import { QuickCalc } from "@/components/quick-calc";
import { ScrollFX } from "@/components/scroll-fx";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useLayoutEffect(() => {
    if (pathname !== "/" || isAdmin) return;
    const html = document.documentElement;
    html.style.setProperty("overflow-anchor", "none");
    html.style.setProperty("scroll-behavior", "auto", "important");
    const snap = () => {
      html.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    };
    snap();
    const later = window.setTimeout(snap, 80);
    const release = window.setTimeout(() => {
      html.style.removeProperty("scroll-behavior");
      html.style.removeProperty("overflow-anchor");
    }, 600);
    return () => {
      window.clearTimeout(later);
      window.clearTimeout(release);
      html.style.removeProperty("scroll-behavior");
      html.style.removeProperty("overflow-anchor");
    };
  }, [pathname, isAdmin]);

  useEffect(() => {
    document.body.dataset.admin = isAdmin ? "1" : "";
    return () => {
      delete document.body.dataset.admin;
    };
  }, [isAdmin]);

  useEffect(() => {
    document.documentElement.dataset.uiReady = "1";
    document.body.classList.toggle("menu-open", menuOpen);
    document.documentElement.classList.toggle("menu-open", menuOpen);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.classList.remove("menu-open");
      document.documentElement.classList.remove("menu-open");
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
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

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {pathname === "/" ? <Loader /> : null}
      <SidebarMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SiteHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((value) => !value)}
      />
      {children}
      <QuickCalc />
      <ScrollFX />
      <FloatingContact />
      <InactivityPrompt />
    </>
  );
}
