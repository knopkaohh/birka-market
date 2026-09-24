import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { CasesSection } from "@/components/cases-section";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "О компании — производство в Москве с 2017",
  description:
    "Бирка Маркет с 2017 года производит бирки, упаковку и фурнитуру в Москве. 19 250 брендов, бесплатный макет, свой контур от расчёта до тиража.",
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
        <CasesSection eyebrow="КЕЙСЫ" compact />
        <p className="inner-note">
          Нужно обсудить задачу напрямую? Перейдите в <Link href="/kontakty">контакты</Link> или сразу оставьте заявку.
        </p>
      </div>
      <CalculatorBlock />
    </>
  );
}
