import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { company, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "О компании",
  description: "Бирка Маркет с 2017 года производит бирки, упаковку и фурнитуру для брендов одежды.",
};

export default function AboutPage() {
  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "О компании" }]} />
          <span className="section-number">О КОМПАНИИ</span>
          <h1>
            Производим детали,
            <br />
            <em>из которых собирается бренд</em>
          </h1>
          <p>
            С {company.since} года помогаем одежным и локальным маркам выглядеть собранно: от размера и состава до вкладыша и упаковки.
            Следим за каждой стадией — от макета до проверки готового тиража.
          </p>
        </div>
        <div className="stat-row">
          <div>
            <strong>с {company.since}</strong>
            <span>работаем и развиваемся</span>
          </div>
          <div>
            <strong>{company.brands}</strong>
            <span>брендов доверили нам маркировку</span>
          </div>
          <div>
            <strong>{company.labels}</strong>
            <span>бирок и этикеток выпущено</span>
          </div>
          <div>
            <strong>{company.kinds}</strong>
            <span>видов продукции в одном контуре</span>
          </div>
        </div>
        <div className="content-grid">
          <article>
            <h2>Качество</h2>
            <p>Проверяем размер, цвет, читаемость и обработку краёв. За брак отвечаем сами: не передаём ответственность клиенту.</p>
          </article>
          <article>
            <h2>Поддержка</h2>
            <p>Менеджер и технолог на связи в рабочее время. Помогаем выбрать материал, если вы запускаете первую партию.</p>
          </article>
          <article>
            <h2>Свой контур</h2>
            <p>Бирки, упаковка, фурнитура, нанесение и полиграфия — без сборки заказа у пяти разных подрядчиков.</p>
          </article>
        </div>
        <h2 className="block-title">Команда</h2>
        <div className="team-grid">
          {team.map((person) => (
            <article key={person.name}>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
              {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
              {person.phone && <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}>{person.phone}</a>}
            </article>
          ))}
        </div>
        <p className="inner-note">
          Нужно обсудить задачу напрямую? Перейдите в <Link href="/kontakty">контакты</Link> или сразу оставьте заявку.
        </p>
      </div>
      <CalculatorBlock />
    </>
  );
}
