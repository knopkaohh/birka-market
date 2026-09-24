import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { YandexMap } from "@/components/yandex-map";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты производства в Москве",
  description:
    "Телефон +7 495 003-88-81, почта, Telegram, WhatsApp и адрес склада Бирка Маркет в Москве. Менеджер свяжется за 10 минут в рабочее время.",
};

export default function ContactsPage() {
  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Контакты" }]} />
          <span className="section-number">КОНТАКТЫ</span>
          <h1>
            Напишите или
            <br />
            <em>приезжайте в офис</em>
          </h1>
          <p>Менеджеры помогают с выбором материала и оформлением заказа. Производство отвечает за сроки и тираж.</p>
        </div>
        <div className="contact-board">
          <a href={company.phoneHref}>
            <span>ТЕЛЕФОН</span>
            <strong>{company.phone}</strong>
          </a>
          <a href={`mailto:${company.email}`}>
            <span>ПОЧТА</span>
            <strong>{company.email}</strong>
          </a>
          <a className="is-messenger" href={company.telegram} target="_blank" rel="noreferrer">
            <span>TELEGRAM</span>
            <strong>birka_market_ru</strong>
          </a>
          <a className="is-messenger" href={company.whatsapp} target="_blank" rel="noreferrer">
            <span>WHATSAPP</span>
            <strong>+7 916 354-92-87</strong>
          </a>
          <a className="is-messenger" href={company.max} target="_blank" rel="noreferrer">
            <span>МАКС</span>
            <strong>max.ru</strong>
          </a>
        </div>
        <div className="content-grid">
          <article>
            <h2>Офис и склад</h2>
            <p>{company.address}</p>
            <p>
              {company.hours}. Выдача готовой продукции: {company.pickupHours}.
            </p>
          </article>
          <article>
            <h2>Как добраться</h2>
            <p>{company.howToGet}</p>
          </article>
          <article>
            <h2>На карте</h2>
            <p>{company.map.description}. Строительный проезд, 2с1 — офис в первом подъезде со стороны двора.</p>
            <a href={company.map.route} target="_blank" rel="noreferrer">
              Открыть Яндекс Карты
            </a>
          </article>
        </div>
      </div>
      <YandexMap compact height={560} />
      <CalculatorBlock />
    </>
  );
}
