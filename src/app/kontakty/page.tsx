import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { company, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Телефон, почта, адрес офиса и склада Бирка Маркет в Москве.",
};

export default function ContactsPage() {
  const managers = team.filter((person) => person.phone || person.email);

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
          <a href={company.telegram} target="_blank" rel="noreferrer">
            <span>TELEGRAM</span>
            <strong>birka_market_ru</strong>
          </a>
          <a href={company.whatsapp} target="_blank" rel="noreferrer">
            <span>WHATSAPP</span>
            <strong>+7 916 354-92-87</strong>
          </a>
        </div>
        <div className="content-grid">
          <article>
            <h2>Офис и склад</h2>
            <p>{company.address}</p>
            <p>{company.hours}. Выдача готовой продукции: {company.pickupHours}.</p>
          </article>
          <article>
            <h2>Как добраться</h2>
            <p>
              Метро Сходненская, 2-й выход, трамвай 6 до остановки «Западный мост». Дальше 2 минуты пешком: коричневые ворота, направо во двор, отдельный подъём с железной дверью. Позвоните в звонок слева.
            </p>
          </article>
        </div>
        <h2 className="block-title">Команда</h2>
        <div className="team-grid">
          {managers.map((person) => (
            <article key={person.name}>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
              {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
              {person.phone && <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}>{person.phone}</a>}
            </article>
          ))}
        </div>
      </div>
      <CalculatorBlock />
    </>
  );
}
