"use client";

import { FormEvent, useState } from "react";
import { formatRuPhone, isCompleteRuPhone } from "@/lib/phone";

/** Компактная форма «Заказать звонок» в колонке связи. */
export function FooterCallback() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isCompleteRuPhone(phone)) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const body = new FormData();
    body.set("phone", phone);
    body.set("phoneOnly", "1");
    body.set("product", "callback");
    body.set("comment", "Футер: заказать звонок");
    body.set("page", window.location.pathname);
    try {
      const response = await fetch("/api/lead", { method: "POST", body });
      if (!response.ok) throw new Error("lead");
      setStatus("done");
      setPhone("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") return <p className="footer-callback-note">Спасибо, перезвоним в рабочее время.</p>;

  return (
    <form className="footer-callback" onSubmit={submit}>
      <label>
        Заказать звонок
        <input
          inputMode="tel"
          autoComplete="tel"
          name="phone"
          value={phone}
          placeholder="+7 (999) 000-00-00"
          onChange={(event) => {
            setPhone(formatRuPhone(event.target.value));
            if (status === "error") setStatus("idle");
          }}
        />
      </label>
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Жду звонка"}
      </button>
      {status === "error" ? <span>Введите номер в формате +7 (999) 000-00-00</span> : null}
    </form>
  );
}
