"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/lib/site";

type LeadFormProps = {
  defaultProduct?: string;
  compact?: boolean;
};

export function LeadForm({ defaultProduct = "unknown", compact = false }: LeadFormProps) {
  const router = useRouter();
  const [product, setProduct] = useState(defaultProduct);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const selected = useMemo(
    () => products.find((item) => item.slug === product),
    [product],
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("product", product);
    data.set("page", window.location.pathname);
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      if (!response.ok) throw new Error("Request failed");
      router.push("/spasibo");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="calc-form" onSubmit={submit}>
      <div className="field full">
        <label htmlFor="product">Что нужно изготовить?</label>
        <select
          id="product"
          name="product"
          value={product}
          onChange={(event) => setProduct(event.target.value)}
        >
          <option value="unknown">Нужна помощь с выбором</option>
          {products.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="quantity">Тираж, шт.</label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min={selected?.minQty ?? 1}
          placeholder={selected ? `От ${selected.minQty}` : "Например, 1000"}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="name">Ваше имя</label>
        <Input id="name" name="name" placeholder="Как к вам обращаться?" />
      </div>
      <div className="field full">
        <label htmlFor="phone">Телефон</label>
        <Input id="phone" name="phone" type="tel" placeholder="+7 999 000-00-00" required />
      </div>
      {!compact && (
        <div className="field full">
          <label htmlFor="contact">Как удобнее связаться</label>
          <select id="contact" name="contact" defaultValue="phone">
            <option value="phone">Телефон</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
          </select>
        </div>
      )}
      <div className="field full">
        <label htmlFor="comment">Комментарий</label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Размер, материал, сроки — всё, что уже известно"
        />
      </div>
      {selected?.sample && (
        <label className="sample-toggle">
          <input type="checkbox" name="sample" />
          <span>
            <Check />
          </span>
          Нужен образец перед тиражом
        </label>
      )}
      <label className="file-field">
        <FileUp />
        <span>
          <strong>Прикрепить логотип или макет</strong>
          <small>PDF, AI, SVG, PNG или JPG до 15 МБ</small>
        </span>
        <input type="file" name="file" accept=".pdf,.ai,.svg,.png,.jpg,.jpeg,.eps,.cdr" />
      </label>
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
          Не удалось отправить заявку. Позвоните: +7 495 003-88-81.
        </div>
      )}
    </form>
  );
}
