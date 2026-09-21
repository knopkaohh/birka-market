"use client";

import { FormEvent, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { company, getProduct } from "@/lib/site";

export function QuickCalc() {
  const pathname = usePathname();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [path, setPath] = useState(pathname);

  if (path !== pathname) {
    setPath(pathname);
    setOpen(false);
    setStatus("idle");
  }

  const slug = pathname.replace(/^\//, "").split("/")[0] ?? "";
  const product = getProduct(slug);

  if (pathname === "/spasibo") return null;

  const close = () => {
    setOpen(false);
    setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.currentTarget);
    data.set("product", product?.slug ?? "unknown");
    data.set("page", window.location.pathname);
    data.set("quick", "1");
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      if (!response.ok) throw new Error("Request failed");
      window.location.assign("/spasibo");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="quick-calc-dock">
        <button
          type="button"
          className="quick-cta"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="quick-calc-overlay"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setStatus("idle");
            setOpen(true);
          }}
        >
          Быстрый расчет
        </button>
      </div>
      <div
        id="quick-calc-overlay"
        className={`quick-calc-overlay ${open ? "is-open" : ""}`}
        role="presentation"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="quick-calc-panel" role="dialog" aria-modal={open} aria-labelledby={titleId}>
          <button type="button" className="quick-calc-close" onClick={close} aria-label="Закрыть">
            <X size={22} />
          </button>
          <span className="eyebrow">
            <span />
            Быстрый расчёт
          </span>
          <h2 id={titleId}>Оставьте имя и телефон</h2>
          <p>
            {product
              ? `Перезвоним в рабочее время ${company.hours} и посчитаем тираж по этому материалу.`
              : `Перезвоним в рабочее время ${company.hours} и посчитаем тираж.`}
          </p>
          <form className="calc-form" onSubmit={submit}>
            <input type="hidden" name="product" value={product?.slug ?? "unknown"} />
            <input type="hidden" name="quick" value="1" />
            <div className="field full">
              <label htmlFor={`${titleId}-name`}>Имя</label>
              <input
                id={`${titleId}-name`}
                name="name"
                autoComplete="name"
                placeholder="Как к вам обращаться?"
                required
              />
            </div>
            <div className="field full">
              <label htmlFor={`${titleId}-phone`}>Номер телефона</label>
              <input
                id={`${titleId}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+7 999 000-00-00"
                required
              />
            </div>
            <button type="submit" disabled={status === "sending"} className="submit-button">
              {status === "sending" ? "Отправляем…" : "Получить расчёт"}
              <ArrowRight />
            </button>
            <p className="privacy">
              Нажимая кнопку, вы соглашаетесь с{" "}
              <Link href="/privacy" prefetch={false}>
                политикой конфиденциальности
              </Link>
              .
            </p>
            {status === "error" && (
              <div className="form-message error-message">
                Не удалось отправить заявку. Позвоните: {company.phone}.
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
