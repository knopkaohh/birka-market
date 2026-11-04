import type { Metadata } from "next";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { faqItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Вопросы о тираже, сроках и оплате",
  description:
    "Минимальный тираж, макет, образцы, сроки производства, оплата и доставка бирок Бирка Маркет в Москве.",
};

export default function FaqPage() {
  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <span className="section-number">ВОПРОСЫ</span>
          <h1>
            Вопросы,
            <br />
            <em>которые задают чаще всего</em>
          </h1>
          <p>Не нашли ответ — оставьте заявку. Менеджер и технолог разберут задачу: материал, сгиб и тираж.</p>
        </div>
        <Accordion className="faq-list">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={item.q} className="faq-item">
              <AccordionTrigger className="faq-trigger">
                <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="faq-q">{item.q}</span>
              </AccordionTrigger>
              <AccordionContent className="faq-content">
                {item.q.includes("материал и сгиб") ? (
                  <>
                    Начните со страницы <Link href="/kak-vybrat">Как выбрать</Link>: три вопроса собирают брендовую
                    бирку, составник и, если нужен, навес. Если знак спорный, технолог скажет до печати, жаккард это,
                    сатин или силикон. Сомневаетесь — оставьте телефон, комплект разберём за 10 минут.
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
