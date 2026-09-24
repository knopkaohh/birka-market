"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ThanksCard } from "@/components/thanks-card";
import { trackLeadConversion } from "@/lib/analytics";

export function ThanksOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!open) {
      tracked.current = false;
      return;
    }
    if (!tracked.current) {
      tracked.current = true;
      trackLeadConversion();
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="thanks-overlay" onClick={onClose}>
      <ThanksCard onClose={onClose} />
    </div>,
    document.body,
  );
}
