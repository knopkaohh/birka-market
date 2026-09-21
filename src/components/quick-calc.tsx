"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { company, getProduct } from "@/lib/site";

export function QuickCalc() {
  const router = useRouter();
  const pathname = usePathname();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLInputElement>("input[name='name']")?.focus();
    }
    if (!open && dialog?.open) dialog.close();
    document.body.classList.toggle("quick-calc-open", open && pathname !== "/spasibo");
  }, [open, pathname]);

  if (pathname === "/spasibo") return null;

  const close = () => {
    setOpen(false);
    setStatus("idle");
    triggerRef.current?.focus();
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
      router.push("/spasibo");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="quick-calc-dock">
        <button
          ref={triggerRef}
          type="button"
          className="quick-cta"
          aria-haspopup="dialog"
          aria-expanded={open}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setStatus("idle");
            setOpen(true);
            const dialog = dialogRef.current;
            if (dialog && !dialog.open) dialog.showModal();
          }}
        >
          Быстрый расчет
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className="quick-calc-dialog"
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false);
          setStatus("idle");
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="quick-calc-panel">
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
            <div className="field full">
              <label htmlFor={`${titleId}-name`}>Имя</label>
              <Input
                id={`${titleId}-name`}
                name="name"
                autoComplete="name"
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
      </dialog>
    </>
  );
}
