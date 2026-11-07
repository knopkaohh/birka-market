"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { CalcResponder } from "@/components/calc-responder";
import { quoteComment, quoteQuantity, type QuotePrefill } from "@/lib/landings/types";

type FormSeed = {
  product?: string;
  comment?: string;
  quantity?: string;
  variant?: string;
};

function withQuery(base: FormSeed): FormSeed {
  const params = new URLSearchParams(window.location.search);
  if (![...params.keys()].length) return base;
  const quote: QuotePrefill = {
    qty: params.get("qty") ?? undefined,
    size: params.get("size") ?? undefined,
    spec: params.get("spec") ?? undefined,
    time: params.get("time") ?? undefined,
    price: params.get("price") ?? undefined,
  };
  const extra = [params.get("comment"), quoteComment(quote)].filter(Boolean).join(". ");
  return {
    product: params.get("product") || base.product,
    comment: [base.comment, extra].filter(Boolean).join(". "),
    quantity: quote.qty ? quoteQuantity(quote.qty) : base.quantity,
    variant: params.get("variant") || base.variant,
  };
}

export function CalculatorBlock({
  defaultProduct,
  defaultComment,
  title = "Расскажите\nо вашей задаче",
  titleAccent,
  lead = "Можно не знать точных параметров. Оставьте телефон — менеджер свяжется в течение 10 минут, уточнит задачу и подготовит расчёт.",
  heading = "h2",
  surface = "material",
  bullets = ["Быстрый расчёт", "Своё производство", "Макет до печати"],
  defaultQuantity,
  variants,
  defaultVariant,
}: {
  defaultProduct?: string;
  defaultComment?: string;
  defaultQuantity?: string;
  title?: string;
  titleAccent?: string;
  lead?: string;
  heading?: "h1" | "h2";
  surface?: "dark" | "material";
  bullets?: string[];
  variants?: { id: string; name: string }[];
  defaultVariant?: string;
}) {
  const lines = title.split("\n");
  const Heading = heading;
  const likeMaterial = surface === "material";
  const [filled, setFilled] = useState<FormSeed>({
    product: defaultProduct,
    comment: defaultComment,
    quantity: defaultQuantity,
    variant: defaultVariant,
  });
  useEffect(() => {
    setFilled(withQuery({ product: defaultProduct, comment: defaultComment, quantity: defaultQuantity, variant: defaultVariant }));
  }, [defaultProduct, defaultComment, defaultQuantity, defaultVariant]);
  return (
    <section className={likeMaterial ? "jq-calc" : "calculator-section"} id="calc">
      <div className={likeMaterial ? "jq-calc-intro" : "calculator-intro"}>
        <span className={likeMaterial ? "section-number" : "section-number light"}>РАСЧЁТ ЗАКАЗА</span>
        <Heading>
          {lines.map((line, index) => (
            <span key={line}>
              {line}
              {(index < lines.length - 1 || titleAccent) && <> <br /></>}
            </span>
          ))}
          {titleAccent ? <em>{titleAccent}</em> : null}
        </Heading>
        <p>{lead}</p>
        <CalcResponder light={likeMaterial} />
        {likeMaterial && bullets?.length ? (
          <ul>
            {bullets.map((item) => (
              <li key={item}>
                <Check size={16} /> {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <LeadForm
        key={`${filled.product ?? "unknown"}-${filled.comment ?? ""}-${filled.variant ?? ""}-${filled.quantity ?? ""}`}
        defaultProduct={filled.product}
        defaultComment={filled.comment}
        defaultQuantity={filled.quantity}
        variants={variants}
        defaultVariant={filled.variant}
      />
    </section>
  );
}
