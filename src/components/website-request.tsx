"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { trackLeadConversion } from "@/lib/analytics";
import { websiteCurrentOptions } from "@/lib/lead";
import { formatRuPhone, isCompleteRuPhone } from "@/lib/phone";

export function WebsiteRequest() {
  const [phone, setPhone] = useState("+7");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const [invalid, setInvalid] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const companyName = String(data.get("company") ?? "").trim();
    const style = String(data.get("style") ?? "").trim();
    const purpose = String(data.get("purpose") ?? "").trim();
    const currentSite = String(data.get("currentSite") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const comment = String(data.get("comment") ?? "").trim();
    let message = "";
    let field = "";
    if (companyName.length < 2) {
      message = "Укажите название фирмы.";
      field = "company";
    } else if (style.length < 2) {
      message = "Опишите, какой стиль сайта хотели бы.";
      field = "style";
    } else if (purpose.length < 2) {
      message = "Напишите, для чего нужен сайт.";
      field = "purpose";
    } else if (!websiteCurrentOptions.includes(currentSite as (typeof websiteCurrentOptions)[number])) {
      message = "Укажите, есть ли сайт сейчас.";
      field = "currentSite";
    } else if (name.length < 2) {
      message = "Укажите имя.";
      field = "name";
    } else if (!isCompleteRuPhone(phone)) {
      message = "Укажите номер телефона.";
      field = "phone";
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
    data.set("website", "1");
    data.set("consent", "1");
    data.set("page", "/sozdanie-sajtov");
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !payload?.ok) throw new Error(payload?.message || "Request failed");
      form.reset();
      setPhone("+7");
      setConsent(false);
      setStatus("done");
      trackLeadConversion();
    } catch (error) {
      setErrorText(
        error instanceof Error && error.message && error.message !== "Request failed"
          ? error.message
          : "Не удалось отправить заявку. Позвоните: +7 495 003-88-81.",
      );
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="site-request" role="status">
        <p className="site-request-success">Заявку получили. Свяжемся с вами.</p>
      </div>
    );
  }

  return (
    <form className="site-request" onSubmit={submit} noValidate>
      <input type="hidden" name="website" value="1" />
      <input type="hidden" name="product" value="sozdanie-sajtov" />
      <div className="site-request-field">
        <label htmlFor="site-company">Название фирмы</label>
        <input id="site-company" name="company" autoComplete="organization" aria-invalid={invalid === "company" || undefined} required />
      </div>
      <div className="site-request-field full">
        <label htmlFor="site-style">Какой стиль сайта хотели бы</label>
        <input
          id="site-style"
          name="style"
          placeholder="Спокойный, яркий, близко к вашему бренду"
          aria-invalid={invalid === "style" || undefined}
          required
        />
      </div>
      <div className="site-request-field">
        <label htmlFor="site-purpose">Для чего нужен сайт</label>
        <input
          id="site-purpose"
          name="purpose"
          placeholder="Витрина бренда, магазин, услуги"
          aria-invalid={invalid === "purpose" || undefined}
          required
        />
      </div>
      <div className="site-request-field">
        <label htmlFor="site-current">Есть ли сайт сейчас</label>
        <select id="site-current" name="currentSite" defaultValue="" aria-invalid={invalid === "currentSite" || undefined} required>
          <option value="" disabled>
            Выберите
          </option>
          {websiteCurrentOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="site-request-field">
        <label htmlFor="site-name">Имя</label>
        <input id="site-name" name="name" autoComplete="name" aria-invalid={invalid === "name" || undefined} required />
      </div>
      <div className="site-request-field">
        <label htmlFor="site-phone">Телефон</label>
        <input
          id="site-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          aria-invalid={invalid === "phone" || undefined}
          onChange={(event) => setPhone(formatRuPhone(event.target.value))}
          required
        />
      </div>
      <div className="site-request-field full">
        <label htmlFor="site-comment">Комментарий</label>
        <textarea id="site-comment" name="comment" placeholder="Ссылка, страницы, что уже есть" />
      </div>
      <label className="site-request-consent site-request-field full">
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
        <p className="site-request-error site-request-field full" role="alert">
          {errorText}
        </p>
      ) : null}
      <div className="site-request-field full">
        <button type="submit" className="site-request-submit" disabled={status === "sending"}>
          {status === "sending" ? "Отправляем…" : "Отправить заявку"}
        </button>
      </div>
    </form>
  );
}
