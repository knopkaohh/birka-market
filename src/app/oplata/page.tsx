import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";

export const metadata: Metadata = {
  title: "Оплата заказа без НДС",
  description:
    "Оплата тиража Бирка Маркет: расчётный счёт для юрлиц, электронный платёж и сплит. Работаем без НДС. Счёт после согласования макета.",
};

export default function PaymentPage() {
  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Оплата" }]} />
          <span className="section-number">ОПЛАТА</span>
          <h1>
            Прозрачные условия
            <br />
            <em>до запуска тиража</em>
          </h1>
          <p>Работаем с юридическими и физическими лицами. Счёт готовит менеджер после согласования параметров.</p>
        </div>
        <div className="content-grid">
          <article>
            <h2>Расчётный счёт</h2>
            <p>Для юридических лиц без НДС. Комиссия банка — по тарифу банка. Наценка за безналичный расчёт — 8%.</p>
          </article>
          <article>
            <h2>Электронный платёж</h2>
            <p>Оперативная оплата через электронный кошелёк. Наценка — 5% от суммы заказа.</p>
          </article>
          <article>
            <h2>Сплит</h2>
            <p>Можно разделить платёж на две части без переплаты — удобно, если запускаете несколько позиций сразу.</p>
          </article>
          <article>
            <h2>После оплаты</h2>
            <p>Технолог готовит макеты в течение одного рабочего дня. Производство стартует только после вашего согласования.</p>
          </article>
          <article>
            <h2>Изменения</h2>
            <p>Правки возможны до запуска в производство. Если тираж уже пошёл в работу, изменения согласуем отдельно.</p>
          </article>
          <article>
            <h2>Отмена</h2>
            <p>Заказ можно отменить до запуска производства. Напишите менеджеру как можно раньше — сохраним время обеих сторон.</p>
          </article>
        </div>
      </div>
      <CalculatorBlock />
    </>
  );
}
