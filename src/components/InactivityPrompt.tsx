"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { formatRuPhone, isCompleteRuPhone } from "@/lib/phone";

const IDLE_MS = 180000;

let sharedAudio: AudioContext | null = null;

/** Создаёт контекст в момент жеста, чтобы браузер разрешил звук позже. */
function armAudio() {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  if (!sharedAudio) sharedAudio = new Ctx();
  void sharedAudio.resume();
}

/** Короткий мягкий щелчок ~0.24 с. Играет только после жеста пользователя. */
function playSoftTick() {
  const ctx = sharedAudio;
  if (!ctx || ctx.state === "suspended") return false;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1200;
  osc.type = "sine";
  osc.frequency.setValueAtTime(640, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.2);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.24);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.26);
  return true;
}

export function InactivityPrompt() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formActive, setFormActive] = useState(false);
  const touchY = useRef(0);
  const interacted = useRef(false);
  const played = useRef(false);

  useEffect(() => {
    if (open) return;
    let timer = window.setTimeout(() => setOpen(true), IDLE_MS);
    const reset = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setOpen(true), IDLE_MS);
    };
    const mark = () => {
      interacted.current = true;
      armAudio();
    };
    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"] as const;
    window.addEventListener("pointerdown", mark, { passive: true });
    window.addEventListener("keydown", mark);
    for (const name of events) window.addEventListener(name, reset, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", mark);
      window.removeEventListener("keydown", mark);
      for (const name of events) window.removeEventListener(name, reset);
    };
  }, [open]);

  useEffect(() => {
    if (!open || played.current || !interacted.current) return;
    try {
      if (playSoftTick()) played.current = true;
    } catch {
      /* Браузер может запретить звук, если жеста ещё не было. */
    }
  }, [open]);

  useEffect(() => {
    if (!open || !formActive) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, formActive]);

  useEffect(() => {
    if (status !== "done") return;
    const timer = window.setTimeout(() => {
      setOpen(false);
      setStatus("idle");
      setPhone("");
      setError("");
      setFormActive(false);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [status]);

  const close = () => {
    setOpen(false);
    setFormActive(false);
    setError("");
    if (status === "done") setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isCompleteRuPhone(phone)) {
      setError("Введите номер в формате +7 (999) 000-00-00");
      return;
    }
    setError("");
    setStatus("sending");
    const body = new FormData();
    body.set("phone", phone);
    body.set("phoneOnly", "1");
    body.set("product", "callback");
    body.set("comment", "Экран-подсказка: нужна консультация по выбору");
    body.set("page", window.location.pathname);
    try {
      const response = await fetch("/api/lead", { method: "POST", body });
      if (!response.ok) throw new Error("lead");
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Не удалось отправить. Позвоните +7 495 003-88-81.");
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={`idle-overlay ${status === "done" ? "is-dimmed" : ""} ${formActive ? "is-locked" : ""}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          role="dialog"
          aria-modal={formActive}
          aria-labelledby="idle-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onWheel={(event) => {
            if (formActive) return;
            window.scrollBy({ top: event.deltaY, left: event.deltaX });
          }}
          onTouchStart={(event) => {
            touchY.current = event.touches[0]?.clientY ?? 0;
          }}
          onTouchMove={(event) => {
            if (formActive) return;
            const next = event.touches[0]?.clientY ?? touchY.current;
            window.scrollBy({ top: touchY.current - next });
            touchY.current = next;
          }}
        >
          <motion.div
            className="idle-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="idle-string" aria-hidden="true" />
            <span className="idle-hole" aria-hidden="true" />
            <button type="button" className="idle-close" aria-label="Закрыть подсказку" onClick={close}>
              <X size={18} />
            </button>
            {status === "done" ? (
              <p id="idle-title" className="idle-thanks">
                Спасибо, перезвоним в рабочее время
              </p>
            ) : (
              <>
                <p id="idle-title">
                  Не уверены, какой материал подойдёт? Мы поможем подобрать — оставьте номер, и наш технолог всё расскажет.
                </p>
                <form onSubmit={submit}>
                  <label>
                    Номер телефона
                    <input
                      inputMode="tel"
                      autoComplete="tel"
                      name="phone"
                      value={phone}
                      placeholder="+7 (999) 000-00-00"
                      onFocus={() => setFormActive(true)}
                      onChange={(event) => {
                        setPhone(formatRuPhone(event.target.value));
                        setError("");
                      }}
                    />
                  </label>
                  {error ? <span className="idle-error">{error}</span> : null}
                  <button type="submit" className="idle-submit" disabled={status === "sending"}>
                    {status === "sending" ? "Отправляем…" : "Отправить"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
