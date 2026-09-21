"use client";

import { useState } from "react";
import { SideMenu } from "@/components/side-menu";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SiteHeader onOpenMenu={() => setMenuOpen(true)} />
      {children}
    </>
  );
}
