"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThanksOverlay } from "@/components/thanks-overlay";
import { formatRuPhone, isCompleteRuPhone } from "@/lib/phone";
import { getProduct } from "@/lib/site";

export const OPEN_QUICK_CALC = "birka:open-quick-calc";

export function openQuickCalc() {
  window.dispatchEvent(new Event(OPEN_QUICK_CALC));
}

export function QuickCalc() {
  const pathname = usePathname();
  const [path, setPath] = useState(pathname);
  const [calcVisible, setCalcVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [errorText, setErrorText] = useState("Не удалось отправить заявку. Позвоните: +7 495 003-88-81.");

  if (path !== pathname) {
    setPath(pathname);
    setCalcVisible(false);
    setOpen(false);
    setShown(false);
  }

  const slug = pathname.replace(/^\//, "").split("/")[0] ?? "";
  const product = getProduct(slug);
  const hiddenPage = pathname === "/raschet" || pathname === "/spasibo";

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => {
    setShown(false);
    document.body.classList.remove("quick-calc-in");
  };

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_QUICK_CALC, onOpen);
    return () => window.removeEventListener(OPEN_QUICK_CALC, onOpen);
  }, []);

  useEffect(() => {
    if (!open) {
      setShown(false);
      document.body.classList.remove("quick-calc-open", "quick-calc-in");
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("quick-calc-open");
    const enter = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setShown(true);
        document.body.classList.add("quick-calc-in");
      });
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const focus = window.setTimeout(() => {
      document.getElementById("quick-name")?.focus();
    }, 280);
    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove("quick-calc-open", "quick-calc-in");
      window.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(enter);
      window.clearTimeout(focus);
    };
  }, [open]);

  useEffect(() => {
    if (hiddenPage) return;
    const node = document.getElementById("calc");
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCalcVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0, rootMargin: "0px 0px -90px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [pathname, hiddenPage]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isCompleteRuPhone(phone)) {
      setPhoneError("Введите номер в формате +7 (999) 000-00-00");
      return;
    }
    setPhoneError("");
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("quick", "1");
    data.set("phone", phone);
    data.set("product", product?.slug ?? "unknown");
    data.set("page", window.location.pathname);
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "Request failed");
      }
      form.reset();
      setPhone("");
      close();
      setStatus("done");
    } catch (error) {
      setErrorText(
        error instanceof Error && error.message && error.message !== "Request failed"
          ? error.message
          : "Не удалось отправить заявку. Позвоните: +7 495 003-88-81.",
      );
      setStatus("error");
    }
  };

  const showTrigger = !hiddenPage && !calcVisible && !open;

  return (
    <>
      {showTrigger ? (
        <div className="quick-calc-dock">
          <button type="button" className="quick-cta" onClick={() => setOpen(true)}>
            Быстрый расчёт
          </button>
        </div>
      ) : null}
      {mounted && open
        ? createPortal(
            <div
              className={`quick-calc-overlay ${shown ? "is-in" : ""}`}
              onClick={close}
              onTransitionEnd={(event) => {
                if (event.target === event.currentTarget && !shown) setOpen(false);
              }}
            >
              <form className="quick-calc-panel" onSubmit={submit} onClick={(event) => event.stopPropagation()}>
                <div className="quick-calc-head">
                  <strong>Быстрый расчёт</strong>
                  <button type="button" onClick={close} aria-label="Закрыть">
                    <X size={18} />
                  </button>
                </div>
                <p>Имя и телефон — перезвоним в течение 10 минут.</p>
                <label className="search-line quick-line" htmlFor="quick-name">
                  <span>Имя</span>
                  <Input
                    id="quick-name"
                    className="quick-line-input"
                    name="name"
                    placeholder="Как к вам обращаться?"
                    required
                  />
                </label>
                <label className="search-line quick-line" htmlFor="quick-phone">
                  <span>Телефон</span>
                  <Input
                    id="quick-phone"
                    className="quick-line-input"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={phone}
                    pattern="^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$"
                    aria-invalid={phoneError ? true : undefined}
                    onChange={(event) => {
                      const next = formatRuPhone(event.target.value);
                      setPhone(next);
                      event.target.setCustomValidity(isCompleteRuPhone(next) ? "" : "Введите номер в формате +7 (999) 000-00-00");
                      if (phoneError) setPhoneError("");
                    }}
                    required
                  />
                </label>
                {phoneError ? <span className="field-error">{phoneError}</span> : null}
                <Button type="submit" disabled={status === "sending"} className="submit-button">
                  {status === "sending" ? "Отправляем…" : "Отправить"}
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
