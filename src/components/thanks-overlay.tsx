"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ThanksCard } from "@/components/thanks-card";

export function ThanksOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
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
