"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThanksOverlay } from "@/components/thanks-overlay";
import { formatRuPhone, isCompleteRuPhone } from "@/lib/phone";

const WAIT_MS = 28000;
const STORAGE_KEY = "birka-consult";

export function IdleConsult() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const openRef = useRef(false);
  openRef.current = open;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || pathname === "/spasibo") return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    let timer = 0;
    const arm = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (openRef.current || window.sessionStorage.getItem(STORAGE_KEY)) return;
        const busy =
          document.querySelector(".loader") ||
          document.body.classList.contains("menu-open") ||
          document.body.classList.contains("quick-calc-open");
        if (busy) {
          arm();
          return;
        }
        setOpen(true);
      }, WAIT_MS);
    };

    const events = ["pointerdown", "keydown", "scroll", "touchstart", "wheel"] as const;
    events.forEach((eventName) => window.addEventListener(eventName, arm, { passive: true }));
    arm();
    return () => {
      window.clearTimeout(timer);
      events.forEach((eventName) => window.removeEventListener(eventName, arm));
    };
  }, [mounted, pathname]);

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isCompleteRuPhone(phone)) {
      setPhoneError("Введите номер в формате +7 (999) 000-00-00");
      return;
    }
    setPhoneError("");
    setStatus("sending");
    const data = new FormData();
    data.set("quick", "1");
    data.set("name", "Консультация");
    data.set("phone", phone);
    data.set("comment", "Окно: нужна консультация");
    data.set("product", "unknown");
    data.set("page", pathname);
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !payload?.ok) throw new Error(payload?.message || "Request failed");
      window.sessionStorage.setItem(STORAGE_KEY, "1");
      setPhone("");
      setOpen(false);
      setStatus("done");
    } catch (error) {
      setErrorText(
        error instanceof Error && error.message && error.message !== "Request failed"
          ? error.message
          : "Не удалось отправить. Позвоните: +7 495 003-88-81.",
      );
      setStatus("error");
    }
  };

  return (
    <>
      {mounted && open
        ? createPortal(
            <div className="consult-overlay" role="presentation" onClick={dismiss}>
              <form
                className="consult-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="consult-title"
                onSubmit={submit}
                onClick={(event) => event.stopPropagation()}
              >
                <button type="button" className="consult-close" onClick={dismiss} aria-label="Закрыть">
                  <X size={18} />
                </button>
                <p className="consult-kicker">Есть вопросы?</p>
                <h2 id="consult-title">Нужна консультация</h2>
                <p>Оставьте номер — перезвоним и подскажем материал, тираж и срок.</p>
                <label className="search-line quick-line" htmlFor="consult-phone">
                  <span className="visually-hidden">Телефон</span>
                  <Input
                    id="consult-phone"
                    className="quick-line-input"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    autoFocus
                    placeholder="+7 (999) 000-00-00"
                    value={phone}
                    aria-invalid={phoneError ? true : undefined}
                    onChange={(event) => {
                      const next = formatRuPhone(event.target.value);
                      setPhone(next);
                      if (phoneError) setPhoneError("");
                    }}
                    required
                  />
                </label>
                {phoneError ? <span className="field-error">{phoneError}</span> : null}
                <Button type="submit" disabled={status === "sending"} className="submit-button">
                  {status === "sending" ? "Отправляем…" : "Жду звонка"}
                  <ArrowRight />
                </Button>
                {status === "error" ? <div className="form-message error-message">{errorText}</div> : null}
              </form>
            </div>,
            document.body,
          )
        : null}
      <ThanksOverlay open={status === "done"} onClose={() => setStatus("idle")} />
    </>
  );
}
