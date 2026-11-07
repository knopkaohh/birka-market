"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { formatRuPhone, isCompleteRuPhone } from "@/lib/phone";

const IDLE_MS = 50_000;

let sharedAudio: AudioContext | null = null;

function audioContext() {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedAudio) sharedAudio = new Ctx();
  return sharedAudio;
}

/** Запоминает жест, чтобы браузер разрешил звук в момент появления бирки. */
function armAudio() {
  const ctx = audioContext();
  if (ctx && ctx.state === "suspended") void ctx.resume();
}

/** Короткий мягкий перезвон. Только когда бирка выезжает, не на клики. */
function playChime() {
  const ctx = audioContext();
  if (!ctx || ctx.state !== "running") return false;
  const now = ctx.currentTime;
  [523.25, 783.99].forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    osc.type = "sine";
    osc.frequency.value = freq;
    const start = now + index * 0.11;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.06, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.44);
  });
  return true;
}

export function InactivityPrompt() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [formActive, setFormActive] = useState(false);
  const touchY = useRef(0);
  const shownOn = useRef(new Set<string>());
  const played = useRef(false);

  useEffect(() => {
    const arm = () => armAudio();
    window.addEventListener("pointerdown", arm, { passive: true });
    window.addEventListener("keydown", arm);
    return () => {
      window.removeEventListener("pointerdown", arm);
      window.removeEventListener("keydown", arm);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setFormActive(false);
    if (shownOn.current.has(pathname)) return;

    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        shownOn.current.add(pathname);
        played.current = false;
        setOpen(true);
      }, IDLE_MS);
    };
    schedule();

    let lastMove = 0;
    const bump = () => {
      if (shownOn.current.has(pathname)) return;
      schedule();
    };
    const onMove = () => {
      const now = Date.now();
      if (now - lastMove < 700) return;
      lastMove = now;
      bump();
    };

    const opts = { passive: true, capture: true } as const;
    window.addEventListener("pointerdown", bump, opts);
    window.addEventListener("keydown", bump);
    window.addEventListener("wheel", bump, opts);
    window.addEventListener("scroll", bump, opts);
    window.addEventListener("touchmove", bump, opts);
    window.addEventListener("mousemove", onMove, opts);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", bump, opts);
      window.removeEventListener("keydown", bump);
      window.removeEventListener("wheel", bump, opts);
      window.removeEventListener("scroll", bump, opts);
      window.removeEventListener("touchmove", bump, opts);
      window.removeEventListener("mousemove", onMove, opts);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open || played.current) return;
    try {
      if (playChime()) played.current = true;
    } catch {
      /* Звук возможен после первого жеста на странице. */
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
    body.set("comment", "Подсказка: клиент просит менеджера подобрать материал и перезвонить");
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
            className="idle-hanger"
            initial={{ opacity: 0, y: -36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <span className="idle-string" aria-hidden="true" />
            <div className="idle-card">
            <span className="idle-hole" aria-hidden="true" />
            <button type="button" className="idle-close" aria-label="Закрыть подсказку" onClick={close}>
              <X size={18} />
            </button>
            {status === "done" ? (
              <p id="idle-title" className="idle-thanks">
                Менеджер перезвонит в рабочее время
              </p>
            ) : (
              <>
                <p id="idle-title">
                  Не знаете, какой материал вам подойдёт? Наш менеджер всё расскажет, подскажет и подберёт. Хотите, чтобы с вами связались — оставьте номер телефона.
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
                    {status === "sending" ? "Отправляем…" : "Оставить номер"}
                  </button>
                </form>
              </>
            )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
