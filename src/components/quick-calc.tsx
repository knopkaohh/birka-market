"use client";

import { FormEvent, useEffect, useState } from "react";
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
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [errorText, setErrorText] = useState("Не удалось отправить заявку. Позвоните: +7 495 003-88-81.");

  if (path !== pathname) {
    setPath(pathname);
    setCalcVisible(false);
    setOpen(false);
  }

  const slug = pathname.replace(/^\//, "").split("/")[0] ?? "";
  const product = getProduct(slug);
  const hiddenPage = pathname === "/raschet" || pathname === "/spasibo";

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_QUICK_CALC, onOpen);
    return () => window.removeEventListener(OPEN_QUICK_CALC, onOpen);
  }, []);

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
      setOpen(false);
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
      {showTrigger || open ? (
        <div className={`quick-calc-dock ${open ? "is-open" : ""}`}>
          {open ? (
            <form className="quick-calc-panel" onSubmit={submit}>
              <div className="quick-calc-head">
                <strong>Быстрый расчёт</strong>
                <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть">
                  <X size={18} />
                </button>
              </div>
              <p>Имя и телефон — перезвоним в течение 10 минут.</p>
              <label htmlFor="quick-name">Имя</label>
              <Input id="quick-name" name="name" placeholder="Как к вам обращаться?" required />
              <label htmlFor="quick-phone">Телефон</label>
              <Input
                id="quick-phone"
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
              {phoneError ? <span className="field-error">{phoneError}</span> : null}
              <Button type="submit" disabled={status === "sending"} className="submit-button">
                {status === "sending" ? "Отправляем…" : "Отправить"}
                <ArrowRight />
              </Button>
              {status === "error" ? <div className="form-message error-message">{errorText}</div> : null}
            </form>
          ) : (
            <button type="button" className="quick-cta" onClick={() => setOpen(true)}>
              Быстрый расчёт
            </button>
          )}
        </div>
      ) : null}
      <ThanksOverlay open={status === "done"} onClose={() => setStatus("idle")} />
    </>
  );
}
