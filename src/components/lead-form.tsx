"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/lib/site";

export type LeadVariantOption = { id: string; name: string };

export type LeadDetailFields = {
  variantLabel?: string;
  sizeLabel?: string;
  sizePlaceholder?: string;
  extraLabel?: string;
  extraPlaceholder?: string;
  commentPlaceholder?: string;
};

type LeadFormProps = {
  defaultProduct?: string;
  compact?: boolean;
  details?: boolean;
  defaultVariant?: string;
  defaultQuantity?: string;
  defaultSize?: string;
  defaultExtra?: string;
  defaultComment?: string;
  variants?: LeadVariantOption[];
  detailFields?: LeadDetailFields;
};

const defaultJacquardVariants: LeadVariantOption[] = [
  { id: "standard", name: "Стандарт" },
  { id: "loop", name: "Петелька" },
  { id: "flag", name: "Флаг" },
  { id: "volume", name: "Объём" },
];

export function LeadForm({
  defaultProduct = "unknown",
  compact = false,
  details = false,
  defaultVariant,
  defaultQuantity,
  defaultSize,
  defaultExtra,
  defaultComment,
  variants,
  detailFields,
}: LeadFormProps) {
  const [product, setProduct] = useState(defaultProduct);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const variantOptions = variants?.length ? variants : defaultJacquardVariants;
  const selectedVariant = defaultVariant && variantOptions.some((item) => item.id === defaultVariant)
    ? defaultVariant
    : variantOptions[0]?.id;

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#calc") return;
    const node = document.getElementById("calc");
    if (!node) return;
    const frame = window.requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const fields = {
    variantLabel: "Вариант",
    sizeLabel: "Размер",
    sizePlaceholder: "Например, 20 × 50",
    extraLabel: "Дополнительные параметры",
    extraPlaceholder: "Цвета, плотность, материал",
    commentPlaceholder: details ? "Изделие и особые пожелания" : "Размер, материал, сроки — всё, что уже известно",
    ...detailFields,
  };

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
      window.location.assign("/spasibo");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="calc-form" onSubmit={submit}>
      {details ? (
        <>
          <input type="hidden" name="product" value={defaultProduct} />
          <div className="field">
            <label htmlFor="variant">{fields.variantLabel}</label>
            <select id="variant" name="variant" defaultValue={selectedVariant}>
              {variantOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="size">{fields.sizeLabel}</label>
            <Input id="size" name="size" placeholder={fields.sizePlaceholder} defaultValue={defaultSize} />
          </div>
          <div className="field">
            <label htmlFor="colors">{fields.extraLabel}</label>
            <Input id="colors" name="colors" placeholder={fields.extraPlaceholder} defaultValue={defaultExtra} />
          </div>
        </>
      ) : (
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
      )}
      <div className="field">
        <label htmlFor="quantity">Тираж, шт.</label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min={selected?.minQty ?? 1}
          placeholder={selected ? `От ${selected.minQty}` : "Например, 1000"}
          defaultValue={defaultQuantity}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="name">Ваше имя</label>
        <Input id="name" name="name" placeholder="Как к вам обращаться?" />
      </div>
      <div className={details ? "field" : "field full"}>
        <label htmlFor="phone">Телефон</label>
        <Input id="phone" name="phone" type="tel" placeholder="+7 999 000-00-00" required />
      </div>
      {!compact && !details && (
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
        <Textarea id="comment" name="comment" placeholder={fields.commentPlaceholder} defaultValue={defaultComment} />
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
