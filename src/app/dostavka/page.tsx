import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { SoftQuotes } from "@/components/soft-quotes";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Доставка по Москве и России",
  description:
    "Доставка бирок и упаковки по Москве, России и СНГ. Курьер, СДЭК, Почта России. Самовывоз со склада в Москве, Строительный проезд 2с1.",
};

export default function DeliveryPage() {
  return (
    <>
      <div className="inner-page tone-page">
        <div className="tone-glow" aria-hidden="true" />
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Доставка" }]} />
          <span className="section-number">ДОСТАВКА</span>
          <h1>
            Доставка по Москве,
            <br />
            <em>России и СНГ</em>
          </h1>
          <p>Готовый тираж отправляем курьером и транспортными компаниями или выдаём на складе в Москве.</p>
        </div>
        <SoftQuotes
          items={[
            { text: "Трек-номер присылаем в день отгрузки.", sign: "По России" },
            { text: "Курьер по Москве приезжает в удобный слот после готовности.", sign: "По Москве" },
            { text: "Забрать заказ можно со склада на Строительном проезде.", sign: "Самовывоз" },
          ]}
        />
        <div className="content-grid gold-cards">
          <article>
            <h2>Сроки</h2>
            <p>Обычно доставка занимает 1–5 рабочих дней и зависит от города и объёма. Точный срок назовём вместе с расчётом заказа.</p>
          </article>
          <article>
            <h2>
              По <em>Москве</em>
            </h2>
            <p>Курьерские службы: Яндекс GO и Dostavista. После готовности заказа согласуем удобный слот.</p>
          </article>
          <article>
            <h2>
              По <em>России</em>
            </h2>
            <p>СДЭК, Почта России и Яндекс Доставка, в том числе в пункты выдачи. После отгрузки присылаем трек-номер.</p>
          </article>
          <article>
            <h2>Самовывоз</h2>
            <p>
              {company.address}. После готовности придёт SMS. Забрать заказ можно {company.pickupHours.toLowerCase()}.
            </p>
          </article>
          <article>
            <h2>Стоимость</h2>
            <p>Считается по тарифу выбранной службы в день отгрузки. Не закладываем скрытую «логистику внутри цены бирки».</p>
          </article>
          <article>
            <h2>Получение</h2>
            <p>Проверьте упаковку и соответствие заказу при получении. Для курьера подготовьте документ, удостоверяющий личность.</p>
          </article>
        </div>
      </div>
      <CalculatorBlock />
    </>
  );
}
