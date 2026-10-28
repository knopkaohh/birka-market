"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ChevronRight, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatRuPhone, isCompleteRuPhone } from "@/lib/phone";
import { MAX_FILE_BYTES } from "@/lib/lead";
import { categories, products, productsByCategory } from "@/lib/site";
import { ThanksOverlay } from "@/components/thanks-overlay";
import FluxLines from "@/components/fx/FluxLines";

export type LeadVariantOption = { id: string; name: string };

export type LeadDetailFields = {
  variantLabel?: string;
  sizeLabel?: string;
  sizePlaceholder?: string;
  extraLabel?: string;
  extraPlaceholder?: string;
  commentPlaceholder?: string;
  quantityLabel?: string;
  quantityPlaceholder?: string;
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

function MaterialPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (slug: string) => void;
}) {
  const current = products.find((item) => item.slug === value);
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState<string | null>(current?.category ?? null);

  return (
    <div className={`material-picker ${open ? "is-open" : ""}`}>
      <span className="material-picker-label">Что нужно изготовить?</span>
      <button
        type="button"
        className="material-picker-toggle"
        aria-expanded={open}
        onClick={() => setOpen((item) => !item)}
      >
        <span>{current?.shortName ?? "Нужна помощь с выбором"}</span>
        <ChevronDown size={16} className={open ? "is-turned" : ""} aria-hidden="true" />
      </button>
      {open ? (
        <div className="material-picker-list">
          <button
            type="button"
            className={current ? undefined : "is-current"}
            onClick={() => {
              onChange("unknown");
              setOpen(false);
            }}
          >
            Нужна помощь с выбором
          </button>
          {categories.map((category) => {
            const items = productsByCategory(category.slug);
            const isOpen = opened === category.slug;
            return (
              <div key={category.slug}>
                <button
                  type="button"
                  className="material-picker-cat"
                  aria-expanded={isOpen}
                  onClick={() => setOpened((item) => (item === category.slug ? null : category.slug))}
                >
                  <span>{category.name}</span>
                  <ChevronRight size={15} className={isOpen ? "is-turned" : ""} aria-hidden="true" />
                </button>
                {isOpen ? (
                  <ul>
                    {items.map((item) => (
                      <li key={item.slug}>
                        <button
                          type="button"
                          className={value === item.slug ? "is-current" : undefined}
                          onClick={() => {
                            onChange(item.slug);
                            setOpen(false);
                          }}
                        >
                          {item.shortName}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
      <input type="hidden" name="product" value={value} />
    </div>
  );
}

const defaultJacquardVariants: LeadVariantOption[] = [
  { id: "straight", name: "Прямой рез" },
  { id: "sides", name: "Подгибка с двух сторон" },
  { id: "center", name: "Сгиб по центру" },
  { id: "butterfly", name: "Подгибка бабочка" },
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
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [errorText, setErrorText] = useState("Не удалось отправить заявку. Позвоните: +7 495 003-88-81.");
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
    quantityLabel: "Тираж, шт.",
    quantityPlaceholder: undefined,
    ...detailFields,
  };

  const selected = useMemo(
    () => products.find((item) => item.slug === product),
    [product],
  );

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isCompleteRuPhone(phone)) {
      setPhoneError("Введите номер в формате +7 (999) 000-00-00");
      return;
    }
    setPhoneError("");
    const form = event.currentTarget;
    const attached = form.querySelector<HTMLInputElement>('input[name="file"]')?.files?.[0];
    if (attached && attached.size > MAX_FILE_BYTES) {
      setErrorText("Файл больше 15 МБ. Сожмите макет или пришлите ссылку в комментарии.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    const data = new FormData(form);
    data.set("product", product);
    data.set("phone", phone);
    data.set("page", window.location.pathname);
    try {
      const response = await fetch("/api/lead", { method: "POST", body: data });
      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "Request failed");
      }
      form.reset();
      setPhone("");
      setStatus("done");
    } catch (error) {
      setErrorText(
        error instanceof Error && error.message && error.message !== "Request failed"
          ? error.message
          : "Не удалось отправить заявку. Позвоните: +7 495 003-88-81.",
      );
      setStatus("error");
    }
  };

  return (
    <>
    <form className="calc-form" onSubmit={submit}>
      <FluxLines
        className="calc-form-flux"
        colors={["#ffffff", "#ffffff", "#ffffff"]}
        glow={0.95}
        rimWidth={0.14}
        lineWidth={0.8}
        flowDirection="down"
        mouseInteraction
        clickSwirl
        speed={0.5}
        scale={1.2}
        turbulence={1}
        fluidity={0.1}
        sharpness={1.7}
        shimmer={1.5}
        mouseStrength={0.22}
        mouseRadius={0.1}
        swirlStrength={0.18}
        swirlRadius={0.07}
        intro
        lightMode={false}
        aria-hidden="true"
      />
      <MaterialPicker value={product} onChange={setProduct} />
      {details ? (
        <>
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
      ) : null}
      <div className="field">
        <label htmlFor="quantity">{fields.quantityLabel ?? "Тираж, шт."}</label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min={selected?.minQty ?? 1}
          placeholder={fields.quantityPlaceholder ?? (selected ? `От ${selected.minQty}` : "Например, 1000")}
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
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 (999) 000-00-00"
          value={phone}
          pattern="^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$"
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? "phone-error" : undefined}
          onChange={(event) => {
            const next = formatRuPhone(event.target.value);
            setPhone(next);
            event.target.setCustomValidity(isCompleteRuPhone(next) ? "" : "Введите номер в формате +7 (999) 000-00-00");
            if (phoneError) setPhoneError("");
          }}
          onInvalid={(event) => {
            event.currentTarget.setCustomValidity("Введите номер в формате +7 (999) 000-00-00");
          }}
          required
        />
        {phoneError ? (
          <p id="phone-error" className="field-error">
            {phoneError}
          </p>
        ) : null}
      </div>
      {!compact && !details && (
        <div className="field full">
          <label htmlFor="contact">Как удобнее связаться</label>
          <select id="contact" name="contact" defaultValue="phone">
            <option value="phone">Телефон</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="telegram">Telegram</option>
            <option value="max">Макс</option>
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
          {errorText}
        </div>
      )}
    </form>
    <ThanksOverlay open={status === "done"} onClose={() => setStatus("idle")} />
    </>
  );
}
