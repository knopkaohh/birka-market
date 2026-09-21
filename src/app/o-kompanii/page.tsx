import Image from "next/image";
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
          <Breadcrumbs items={[{ label: "О Компании" }]} />
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
        <figure className="about-cover">
          <Image
            src="/images/company/cover.jpg"
            alt="Склад готовых лент и бирок на производстве Бирка Маркет"
            fill
            sizes="(max-width: 900px) 100vw, 1380px"
            priority
          />
          <figcaption>Производственный склад: готовые ленты, составники и бирки под тираж</figcaption>
        </figure>
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
        <h2 className="block-title">Знакомьтесь с командой</h2>
        <p className="team-intro">
          Быстрая производственная команда: продажи, маркетинг и цех в одном контуре. Напишите человеку по задаче или оставьте общую заявку.
        </p>
        <div className="team-grid">
          {team.map((person) => (
            <article key={person.name}>
              <div className="team-photo">
                <Image src={person.photo} alt={person.name} fill sizes="280px" />
              </div>
              <div className="team-copy">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
                {person.phone && <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}>{person.phone}</a>}
              </div>
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
