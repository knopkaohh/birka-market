import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadForm } from "@/components/lead-form";
import { ProductCard } from "@/components/product-card";
import { QuickCalc } from "@/components/quick-calc";
import type { LandingContent } from "@/lib/landings/types";
import { company, getCategory, getProduct } from "@/lib/site";

export function ProductLanding({ content, variant }: { content: LandingContent; variant?: string }) {
  const product = getProduct(content.slug);
  if (!product) return null;
  const category = getCategory(product.category);
  const related = content.complement.map((slug) => getProduct(slug)).filter(Boolean);
  const path = `/${content.slug}`;

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
              Рассчитать стоимость
              <ArrowRight size={19} />
            </a>
            <QuickCalc product={content.slug} />
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
            <article className={`jq-variant is-${item.tone}`} key={item.id}>
              <div className="jq-variant-photo">
                <Image src={item.image} alt={item.name} fill sizes="280px" />
              </div>
              <span>{item.fold}</span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <Link href={`${path}?variant=${item.id}#calc`}>
                Рассчитать этот вариант
                <ArrowRight size={16} />
              </Link>
            </article>
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

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">03 / ОРИЕНТИР</span>
          <h2>{content.quotesTitle}</h2>
          <p>{content.quotesIntro}</p>
        </div>
        <div className="jq-quotes">
          {content.quotes.map((item) => (
            <article key={`${item.qty}-${item.spec}`}>
              <strong>{item.price}</strong>
              <span>{content.quoteUnit ?? "за штуку"}</span>
              <ul>
                <li>{item.qty}</li>
                <li>{item.size}</li>
                <li>{item.spec}</li>
                <li>{item.time}</li>
              </ul>
              <a href="#calc">Запросить такой расчёт</a>
            </article>
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
          <ul>
            {content.calcBullets.map((item) => (
              <li key={item}>
                <Check size={16} /> {item}
              </li>
            ))}
          </ul>
        </div>
        <LeadForm
          key={variant ?? content.variants[0]?.id ?? "default"}
          defaultProduct={content.slug}
          details
          defaultVariant={variant ?? content.variants[0]?.id}
          variants={content.variants.map((item) => ({ id: item.id, name: item.name }))}
          detailFields={content.form}
          compact
        />
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">05 / {content.reasonsLabel}</span>
          <h2>{content.reasonsTitle}</h2>
        </div>
        <div className="jq-reasons">
          {content.reasons.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-tech">
        <div className="jq-heading">
          <span className="section-number">06 / ПАРАМЕТРЫ</span>
          <h2>Технические возможности</h2>
        </div>
        <div className="jq-specs">
          {content.specs.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">07 / ПОДБОР</span>
          <h2>{content.fitTitle}</h2>
        </div>
        <div className="jq-fit">
          {content.fit.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">08 / НА ИЗДЕЛИИ</span>
          <h2>{content.onProductTitle}</h2>
          <p>{content.onProductIntro}</p>
        </div>
        <div className="jq-onproduct">
          {content.onProduct.map((item) => (
            <figure key={item.title}>
              <div>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 90vw, 30vw" />
              </div>
              <figcaption>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="jq-process">
        <div className="jq-heading">
          <span className="section-number light">09 / ПРОЦЕСС</span>
          <h2>От заявки до готового тиража</h2>
        </div>
        <div className="jq-steps">
          {content.steps.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-terms">
        <div className="jq-heading">
          <span className="section-number light">10 / УСЛОВИЯ</span>
          <h2>Условия для спокойного запуска</h2>
        </div>
        <div className="jq-term-grid">
          {content.terms.map((item) => (
            <article key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">11 / КОНТРОЛЬ</span>
          <h2>Проверяем не только внешний вид</h2>
        </div>
        <div className="jq-checks">
          {content.checks.map((item) => (
            <article key={item.title}>
              <Check />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">12 / КОМПЛЕКТ</span>
          <h2>Дополните комплект</h2>
          <p>{content.complementIntro}</p>
        </div>
        <div className="product-grid">
          {related.map((item, index) => item && <ProductCard key={item.slug} product={item} index={index} />)}
        </div>
      </section>

      <section className="jq-section jq-faq">
        <div className="jq-heading">
          <span className="section-number">13 / FAQ</span>
          <h2>Вопросы и ответы</h2>
        </div>
        <Accordion className="faq-list">
          {content.faq.map((item, index) => (
            <AccordionItem value={`${content.slug}-${index}`} key={item.q} className="faq-item">
              <AccordionTrigger className="faq-trigger">
                <span>0{index + 1}</span>
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="faq-content">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="jq-final">
        <div>
          <span className="section-number">14 / ЗАЯВКА</span>
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
        <div className="hero-actions">
          <a className="primary-cta" href="#calc">
            Рассчитать стоимость
            <ArrowRight />
          </a>
          <QuickCalc product={content.slug} />
        </div>
      </section>
    </>
  );
}
