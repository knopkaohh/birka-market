import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { faqItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Вопросы о тираже, сроках и оплате",
  description:
    "Минимальный тираж, бесплатный макет, образцы, сроки производства, оплата и доставка бирок Бирка Маркет в Москве.",
};

export default function FaqPage() {
  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <span className="section-number">FAQ</span>
          <h1>
            Вопросы,
            <br />
            <em>которые задают чаще всего</em>
          </h1>
          <p>Если ответа нет, оставьте заявку — менеджер и технолог разберут вашу задачу по материалу и тиражу.</p>
        </div>
        <Accordion className="faq-list">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={item.q} className="faq-item">
              <AccordionTrigger className="faq-trigger">
                <span>0{index + 1}</span>
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="faq-content">
                {item.q.includes("материал и сгиб") ? (
                  <>
                    Откройте страницу <Link href="/kak-vybrat">Как выбрать</Link>: три вопроса подскажут материал,
                    подгибку, цвета и тираж. Если останетесь в сомнении — оставьте телефон, менеджер соберёт комплект за
                    10 минут.
                  </>
                ) : (
                  item.a
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <CalculatorBlock />
    </>
  );
}
