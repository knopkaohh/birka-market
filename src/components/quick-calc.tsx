"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { company } from "@/lib/site";

export function QuickCalc({ product }: { product: string }) {
  const router = useRouter();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setStatus("idle");
      triggerRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setStatus("idle");
    triggerRef.current?.focus();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.currentTarget);
    data.set("product", product);
    data.set("page", window.location.pathname);
    data.set("quick", "1");
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      if (!response.ok) throw new Error("Request failed");
      router.push("/spasibo");
    } catch {
      setStatus("error");
    }
  };

  const dialog = open
    ? createPortal(
          <div className="quick-calc-overlay" onClick={close} role="presentation">
            <div
              className="quick-calc-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="quick-calc-close" onClick={close} aria-label="Закрыть">
                <X size={22} />
              </button>
              <span className="eyebrow">
                <span />
                Быстрый расчёт
              </span>
              <h2 id={titleId}>Оставьте имя и телефон</h2>
              <p>Перезвоним в рабочее время {company.hours} и посчитаем тираж по этому материалу.</p>
              <form className="calc-form" onSubmit={submit}>
                <div className="field full">
                  <label htmlFor={`${titleId}-name`}>Имя</label>
                  <Input
                    id={`${titleId}-name`}
                    name="name"
                    autoComplete="name"
                    autoFocus
                    placeholder="Как к вам обращаться?"
                    required
                  />
                </div>
                <div className="field full">
                  <label htmlFor={`${titleId}-phone`}>Номер телефона</label>
                  <Input
                    id={`${titleId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+7 999 000-00-00"
                    required
                  />
                </div>
                <Button type="submit" disabled={status === "sending"} className="submit-button">
                  {status === "sending" ? "Отправляем…" : "Получить расчёт"}
                  <ArrowRight />
                </Button>
                <p className="privacy">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <Link href="/privacy">политикой конфиденциальности</Link>.
                </p>
                {status === "error" && (
                  <div className="form-message error-message">
                    Не удалось отправить заявку. Позвоните: {company.phone}.
                  </div>
                )}
              </form>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="quick-cta"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setStatus("idle");
          setOpen(true);
        }}
      >
        Быстрый расчет
      </button>
      {dialog}
    </>
  );
}
