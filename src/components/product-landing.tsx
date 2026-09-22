import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalcResponder } from "@/components/calc-responder";
import { LeadForm } from "@/components/lead-form";
import { MaterialDetails } from "@/components/material-details";
import type { LandingContent, QuotePrefill } from "@/lib/landings/types";
import { quoteComment, quoteHref } from "@/lib/landings/types";
import { company, getCategory, getProduct } from "@/lib/site";

function specRows(
  specs: { title: string; text: string }[],
  minQty: number,
  leadTime: string,
) {
  const rows = [...specs];
  const titles = rows.map((item) => item.title.toLowerCase()).join(" ");
  if (!/тира[жш]|запуск/.test(titles)) {
    rows.push({ title: "Минимальный тираж", text: `от ${minQty} шт.` });
  }
  if (!/срок/.test(titles)) {
    rows.push({ title: "Срок", text: leadTime });
  }
  return rows;
}

export function ProductLanding({
  content,
  variant,
  quote,
}: {
  content: LandingContent;
  variant?: string;
  quote?: QuotePrefill;
}) {
  const product = getProduct(content.slug);
  if (!product) return null;
  const category = getCategory(product.category);
  const path = `/${content.slug}`;
  const selectedVariant = variant ?? content.variants[0]?.id;
  const formKey = [selectedVariant, quote?.qty, quote?.size, quote?.spec, quote?.price].filter(Boolean).join("-");
  const prefillComment = quote ? quoteComment(quote) : "";

  return (
    <>
      <section className="jq-hero">
        <div className="jq-hero-copy">
          <Breadcrumbs
            items={[
              { href: "/katalog", label: "Продукция" },
              { href: `/katalog/${product.category}`, label: category?.name ?? "Категория" },
              { label: product.shortName },
            ]}
          />
          <span className="eyebrow">
            <span />
            {content.eyebrow}
          </span>
          <h1>
            {content.title}
            <br />
            <em>{content.titleEm}</em>
          </h1>
          <p>{content.lead}</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#calc">
              Рассчитать заказ
              <ArrowRight size={19} />
            </a>
            <a className="ghost-cta" href="#variants">
              Подобрать вариант
            </a>
          </div>
          <div className="hero-proof">
            {content.proof.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="jq-hero-visual">
          <div className="jq-hero-main">
            <Image src={content.hero[0]} alt={content.heroAlts[0]} fill sizes="(max-width: 900px) 100vw, 50vw" priority />
          </div>
          <div className="jq-hero-small">
            <Image src={content.hero[1]} alt={content.heroAlts[1]} fill sizes="280px" />
          </div>
          <div className="jq-hero-mid">
            <Image src={content.hero[2]} alt={content.heroAlts[2]} fill sizes="240px" />
          </div>
        </div>
      </section>

      <section className="jq-section" id="variants">
        <div className="jq-heading">
          <span className="section-number">01 / {content.variantLabel}</span>
          <h2>{content.variantTitle}</h2>
          <p>{content.variantIntro}</p>
        </div>
        <div className="jq-variants">
          {content.variants.map((item) => (
            <Link
              href={item.href ?? `${path}?variant=${item.id}#calc`}
              prefetch={false}
              className={`jq-variant is-${item.tone}`}
              key={item.id}
            >
              <div className="jq-variant-photo">
                <Image src={item.image} alt={item.name} fill sizes="280px" />
              </div>
              <span className="jq-variant-fold">{item.fold}</span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <span className="jq-variant-cta">
                {item.href ? "Открыть страницу" : "Рассчитать заказ"}
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="jq-section" id="works">
        <div className="jq-heading">
          <span className="section-number">02 / РАБОТЫ</span>
          <h2>{content.galleryTitle}</h2>
          <p>{content.galleryIntro}</p>
        </div>
        <div className="jq-gallery">
          {content.gallery.map((item) => (
            <figure key={item.src}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
            </figure>
          ))}
        </div>
      </section>

      <section className="jq-section" id="orientir">
        <div className="jq-heading">
          <span className="section-number">03 / ОРИЕНТИР</span>
          <h2>{content.quotesTitle}</h2>
          <p>{content.quotesIntro}</p>
        </div>
        <table className="jq-tech-table">
          <caption>Параметры материала, тираж и срок</caption>
          <tbody>
            {specRows(content.specs, product.minQty, product.leadTime).map((item) => (
              <tr key={item.title}>
                <th scope="row">{item.title}</th>
                <td>{item.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="jq-quotes">
          {content.quotes.map((item) => (
            <Link
              href={quoteHref(content.slug, item, content.variants)}
              prefetch={false}
              className="jq-quote"
              key={`${item.qty}-${item.size}-${item.spec}`}
            >
              <strong>{item.price}</strong>
              <span className="jq-quote-unit">{content.quoteUnit ?? "за штуку"}</span>
              <ul>
                <li>{item.qty}</li>
                <li>{item.size}</li>
                <li>{item.spec}</li>
                <li>{item.time}</li>
              </ul>
              <span className="jq-quote-cta">
                Рассчитать заказ
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="jq-calc" id="calc">
        <div className="jq-calc-intro">
          <span className="section-number">04 / РАСЧЁТ</span>
          <h2>
            {content.calcTitle.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p>
            {content.calcIntro} Ответим в рабочее время {company.hours}.
          </p>
          <CalcResponder light />
          <ul>
            {content.calcBullets.map((item) => (
              <li key={item}>
                <Check size={16} /> {item}
              </li>
            ))}
          </ul>
        </div>
        <LeadForm
          key={formKey || "default"}
          defaultProduct={content.slug}
          details
          defaultVariant={selectedVariant}
          defaultQuantity={quote?.qty ?? content.form.quantityPlaceholder}
          defaultSize={quote?.size}
          defaultExtra={quote?.spec}
          defaultComment={prefillComment}
          variants={content.variants.map((item) => ({ id: item.id, name: item.name }))}
          detailFields={content.form}
          compact
        />
      </section>

      <MaterialDetails content={content} />

      <section className="jq-final">
        <div>
          <span className="section-number">06 / ЗАЯВКА</span>
          <h2>
            {content.finalTitle.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p>{content.finalText}</p>
        </div>
        <a className="primary-cta" href="#calc">
          Рассчитать заказ
          <ArrowRight />
        </a>
      </section>
    </>
  );
}
