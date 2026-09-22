import Image from "next/image";
import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCard } from "@/components/product-card";
import type { LandingContent } from "@/lib/landings/types";
import { getProduct } from "@/lib/site";

export function MaterialDetails({ content }: { content: LandingContent }) {
  const related = content.complement.map((slug) => getProduct(slug)).filter(Boolean);

  return (
    <section className="jq-section jq-more" id="details">
      <div className="jq-heading">
        <span className="section-number">05 / ПОДРОБНЕЕ</span>
        <h2>{content.detailsTitle ?? "Подробнее о материале"}</h2>
        <p>{content.detailsIntro ?? "Техника, условия и ответы — по желанию, после расчёта."}</p>
      </div>
      <Accordion className="jq-more-list" multiple defaultValue={[]}>
        <AccordionItem value="reasons" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>01</span>
            {content.reasonsTitle}
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <div className="jq-reasons">
              {content.reasons.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specs" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>02</span>
            Технические возможности
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <div className="jq-specs">
              {content.specs.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fit" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>03</span>
            {content.fitTitle}
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <div className="jq-fit">
              {content.fit.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="onproduct" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>04</span>
            {content.onProductTitle}
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <p className="jq-more-lead">{content.onProductIntro}</p>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="process" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>05</span>
            {content.processTitle ?? "От заявки до готового тиража"}
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <div className="jq-more-dark">
              <div className="jq-steps">
                {content.steps.map(([title, text], index) => (
                  <article key={title}>
                    <span>0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="terms" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>06</span>
            Условия для спокойного запуска
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <div className="jq-more-dark">
              <div className="jq-term-grid">
                {content.terms.map((item) => (
                  <article key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="checks" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>07</span>
            Проверяем не только внешний вид
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <div className="jq-checks">
              {content.checks.map((item) => (
                <article key={item.title}>
                  <Check />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="complement" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>08</span>
            Дополните комплект
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <p className="jq-more-lead">{content.complementIntro}</p>
            <div className="product-grid">
              {related.map((item, index) => item && <ProductCard key={item.slug} product={item} index={index} />)}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="faq" className="jq-more-item">
          <AccordionTrigger className="jq-more-trigger">
            <span>09</span>
            Вопросы и ответы
          </AccordionTrigger>
          <AccordionContent className="jq-more-panel">
            <div className="jq-more-faq">
              {content.faq.map((item) => (
                <article key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
