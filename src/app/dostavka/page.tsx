import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Доставка бирок и этикеток для одежды с логотипом по Москве — производство оптом",
  description:
    "Доставка бирок и упаковки на заказ от производителя Бирка Маркет по Москве, России и СНГ. Печать оптом. Курьер, СДЭК, Почта России и самовывоз со склада.",
  alternates: { canonical: "https://birka-market.ru/dostavka" },
};

export default function DeliveryPage() {
  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Доставка" }]} />
          <span className="section-number">ДОСТАВКА</span>
          <h1>
            Доставка по Москве, <br />
            <em>России и СНГ</em>
          </h1>
          <p>Готовый тираж отправляем курьером и транспортными компаниями или выдаём на складе в Москве.</p>
        </div>
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
            <p>{company.address}. После готовности придёт SMS.</p>
            {company.schedule.map((line) => (
              <p key={line}>{line}</p>
            ))}
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
