"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { TelegramIcon } from "@/components/messenger-icons";
import { trackLeadConversion } from "@/lib/analytics";
import { formatRuPhone, isReachablePhone } from "@/lib/phone";
import { company } from "@/lib/site";

type RevealTag = "div" | "li" | "h2" | "section";

export function JobsReveal({
  as = "div",
  delay = 0,
  className = "",
  id,
  children,
}: {
  as?: RevealTag;
  delay?: number;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        seen.disconnect();
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );
    seen.observe(node);
    return () => seen.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`${className}${shown ? " is-in" : ""}`.trim()}
      data-jobs-reveal=""
      style={{ "--d": delay } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function JobsMotion({ children }: { children: ReactNode }) {
  return (
    <div className="jobs-page inner-page">
      <div className="jobs-bg" aria-hidden="true" />
      <div className="jobs-content">{children}</div>
    </div>
  );
}

function VkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z" />
    </svg>
  );
}

export function JobApplication({ part = "all" }: { part?: "form" | "direct" | "all" }) {
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [invalid, setInvalid] = useState("");

  useEffect(() => {
    if (status !== "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStatus("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [status]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const previousWork = String(data.get("previous") ?? "").trim();
    const sales = String(data.get("sales") ?? "").trim();
    const about = String(data.get("about") ?? "").trim();
    const years = Number(age);
    let message = "";
    let field = "";
    if (name.length < 2) {
      message = "Укажите имя.";
      field = "name";
    } else if (!isReachablePhone(phone)) {
      message = "Укажите номер телефона.";
      field = "phone";
    } else if (city.length < 2) {
      message = "Укажите город.";
      field = "city";
    } else if (!/^\d{2}$/.test(age) || years < 14 || years > 80) {
      message = "Укажите возраст.";
      field = "age";
    } else if (previousWork.length < 2) {
      message = "Напишите, где работали ранее.";
      field = "previous";
    } else if (sales.length < 2) {
      message = "Опишите опыт в продажах или сильные стороны.";
      field = "sales";
    } else if (about.length < 2) {
      message = "Кратко расскажите о себе.";
      field = "about";
    } else if (!consent) {
      message = "Нужно согласие на обработку персональных данных.";
      field = "consent";
    }
    if (message) {
      setInvalid(field);
      setErrorText(message);
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorText("");
    setInvalid("");
    data.set("phone", phone);
    data.set("age", age);
    data.set("consent", "1");
    data.set("job", "1");
    data.set("page", "/rabota");
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !payload?.ok) throw new Error(payload?.message || "Request failed");
      form.reset();
      setPhone("");
      setAge("");
      setConsent(false);
      setStatus("done");
      trackLeadConversion();
    } catch (error) {
      setErrorText(
        error instanceof Error && error.message && error.message !== "Request failed"
          ? error.message
          : "Не удалось отправить отклик. Позвоните: +7 495 003-88-81.",
      );
      setStatus("error");
    }
  };

  const onPhone = (value: string) => {
    const cleaned = value.replace(/[^\d+\s()-]/g, "").slice(0, 22);
    const digits = cleaned.replace(/\D/g, "");
    if (digits.length >= 10 && (digits.startsWith("7") || digits.startsWith("8") || digits.startsWith("9"))) {
      setPhone(formatRuPhone(cleaned));
      return;
    }
    setPhone(cleaned);
  };

  const formBlock = (
      <JobsReveal as="section" className="jobs-apply">
        <h2>Отклик</h2>
        <form className="jobs-form" onSubmit={submit} noValidate>
          <input type="hidden" name="job" value="1" />
          <div className="jobs-field">
            <label htmlFor="job-name">Ваше имя</label>
            <input
              id="job-name"
              name="name"
              autoComplete="name"
              aria-invalid={invalid === "name" || undefined}
              required
            />
          </div>
          <div className="jobs-field">
            <label htmlFor="job-phone">Номер телефона</label>
            <input
              id="job-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Мобильный или городской"
              value={phone}
              aria-invalid={invalid === "phone" || undefined}
              onChange={(event) => onPhone(event.target.value)}
              required
            />
          </div>
          <div className="jobs-field">
            <label htmlFor="job-city">Город</label>
            <input
              id="job-city"
              name="city"
              autoComplete="address-level2"
              aria-invalid={invalid === "city" || undefined}
              required
            />
          </div>
          <div className="jobs-field">
            <label htmlFor="job-age">Возраст</label>
            <input
              id="job-age"
              name="age"
              inputMode="numeric"
              autoComplete="off"
              value={age}
              aria-invalid={invalid === "age" || undefined}
              onChange={(event) => setAge(event.target.value.replace(/\D/g, "").slice(0, 2))}
              required
            />
          </div>
          <div className="jobs-field full">
            <label htmlFor="job-previous">Где работали ранее</label>
            <input id="job-previous" name="previous" aria-invalid={invalid === "previous" || undefined} required />
          </div>
          <div className="jobs-field span-2">
            <label htmlFor="job-sales">Опыт в продажах или сильные стороны</label>
            <textarea
              id="job-sales"
              name="sales"
              placeholder="Если опыта нет — напишите, в чём вы сильны"
              aria-invalid={invalid === "sales" || undefined}
              required
            />
          </div>
          <div className="jobs-field span-2">
            <label htmlFor="job-about">Кратко о себе</label>
            <textarea
              id="job-about"
              name="about"
              placeholder="Чем хотите заниматься и что важно в работе"
              aria-invalid={invalid === "about" || undefined}
              required
            />
          </div>
          <label className="jobs-consent jobs-field full">
            <input
              type="checkbox"
              name="consent"
              value="1"
              checked={consent}
              aria-invalid={invalid === "consent" || undefined}
              onChange={(event) => setConsent(event.target.checked)}
            />
            <span>
              Согласен на обработку <Link href="/privacy">персональных данных</Link>
            </span>
          </label>
          {status === "error" ? (
            <p className="jobs-error jobs-field full" role="alert">
              {errorText}
            </p>
          ) : null}
          <div className="jobs-field full">
            <button type="submit" className="jobs-submit" disabled={status === "sending"}>
              {status === "sending" ? "Отправляем…" : "Отправить отклик"}
            </button>
          </div>
        </form>
      </JobsReveal>
  );

  const directBlock = (
      <JobsReveal as="section" className="jobs-direct" delay={1}>
        <p>
          Удобнее связаться напрямую? Пришлите краткое резюме (указав город, возраст и опыт) на почту или
          напишите/позвоните нам:
        </p>
        <div className="jobs-direct-row">
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <div className="jobs-social">
            <a className="jobs-social-link" href={company.telegram} target="_blank" rel="noreferrer" aria-label="Telegram">
              <TelegramIcon size={22} />
            </a>
            <a className="jobs-social-link" href={company.vk} target="_blank" rel="noreferrer" aria-label="ВКонтакте">
              <VkIcon />
            </a>
          </div>
        </div>
      </JobsReveal>
  );

  return (
    <>
      {part !== "direct" ? formBlock : null}
      {part !== "form" ? directBlock : null}
      {part !== "direct" && status === "done" && typeof document !== "undefined"
        ? createPortal(
            <div className="jobs-thanks" onClick={() => setStatus("idle")}>
              <div
                className="jobs-thanks-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="job-thanks-title"
                onClick={(event) => event.stopPropagation()}
              >
                <p id="job-thanks-title">Спасибо! Мы получили ваш отклик и свяжемся с вами в ближайшее время.</p>
                <button type="button" onClick={() => setStatus("idle")} autoFocus>
                  Закрыть
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
