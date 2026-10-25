import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalcResponder } from "@/components/calc-responder";
import { LeadForm } from "@/components/lead-form";
import { MaterialDetails } from "@/components/material-details";
import { PhotoFrame } from "@/components/photo-frame";
import type { LandingContent, QuotePrefill } from "@/lib/landings/types";
import { quoteComment, quoteHref, quoteQuantity } from "@/lib/landings/types";
import { importedPhotos } from "@/lib/imported-photos";
import { photoKey } from "@/lib/photo-id";
import { firstUniquePhoto, takeUniquePhoto, usablePhoto } from "@/lib/photos";
import { landingJsonLd } from "@/lib/seo";
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
  const live = (importedPhotos[content.slug] ?? []).filter((item) => usablePhoto(item.src));
  const usedPhotos = new Set<string>();
  const heroPhoto = live[0]?.src ?? takeUniquePhoto(content.hero[0], usedPhotos);
  if (live[0]) usedPhotos.add(photoKey(live[0].src));
  const variantPhoto = firstUniquePhoto(
    content.variants.map((item) => ({ src: item.image, alt: item.name })),
    usedPhotos,
  );
  const galleryItems = live.slice(1);
  const galleryPhoto = galleryItems.length > 0 ? null : firstUniquePhoto(content.gallery, usedPhotos);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(content, product)) }}
      />
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
          <PhotoFrame
            src={heroPhoto}
            alt={content.heroAlts[0]}
            width={1400}
            height={1600}
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
            cover
          />
        </div>
      </section>

      <section className="jq-section" id="variants">
        <div className="jq-heading">
          <span className="section-number">01 / {content.variantLabel}</span>
          <h2>{content.variantTitle}</h2>
          <p>{content.variantIntro}</p>
        </div>
        <div className="section-photo">
          <PhotoFrame
            src={variantPhoto?.src}
            alt={variantPhoto?.alt ?? content.variantTitle}
            width={1200}
            height={900}
            sizes="(max-width: 900px) 100vw, 720px"
            cover
          />
        </div>
        <div className="jq-variants">
          {content.variants.map((item) => (
            <Link
              href={item.href ?? `${path}?variant=${item.id}#calc`}
              prefetch={false}
              className={`jq-variant is-${item.tone}`}
              key={item.id}
            >
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
        {galleryItems.length > 0 ? (
          <div className="jq-gallery">
            {galleryItems.map((item, index) => (
              <figure key={item.src}>
                <PhotoFrame
                  src={item.src}
                  alt={`${product.shortName}: фото ${index + 1}`}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 900px) 100vw, 33vw"
                  cover
                />
              </figure>
            ))}
          </div>
        ) : (
          <div className="section-photo">
            <PhotoFrame
              src={galleryPhoto?.src}
              alt={galleryPhoto?.alt ?? content.galleryTitle}
              width={1400}
              height={1000}
              sizes="(max-width: 900px) 100vw, 900px"
              cover
            />
          </div>
        )}
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
            {content.calcIntro} Менеджер свяжется в течение {company.replyIn} в рабочее время {company.hours}.
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
          defaultQuantity={quote?.qty ? quoteQuantity(quote.qty) : content.form.quantityPlaceholder}
          defaultSize={quote?.size}
          defaultExtra={quote?.spec}
          defaultComment={prefillComment}
          variants={content.variants.map((item) => ({ id: item.id, name: item.name }))}
          detailFields={content.form}
          compact
        />
      </section>

      <MaterialDetails content={content} usedPhotos={usedPhotos} />

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
