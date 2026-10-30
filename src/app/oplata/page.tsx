import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { SoftQuotes } from "@/components/soft-quotes";

export const metadata: Metadata = {
  title: "Оплата заказа без НДС",
  description:
    "Оплата тиража Бирка Маркет: расчётный счёт для юрлиц и электронный платёж. Работаем без НДС. Счёт после согласования файла и тиража.",
};

export default function PaymentPage() {
  return (
    <>
      <div className="inner-page tone-page">
        <div className="tone-glow" aria-hidden="true" />
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Оплата" }]} />
          <span className="section-number">ОПЛАТА</span>
          <h1>
            Прозрачные условия
            <br />
            <em>до запуска тиража</em>
          </h1>
          <p>Работаем с юридическими и физическими лицами. Менеджер готовит счёт, когда согласованы материал, тираж и ваш файл.</p>
        </div>
        <SoftQuotes
          items={[
            { text: "Счёт выставляем, когда согласованы материал, тираж и ваш файл.", sign: "До оплаты" },
            { text: "Работаем без НДС. Наценку за способ оплаты называем сразу.", sign: "Прозрачно" },
            { text: "Тираж запускаем после вашего подтверждения.", sign: "До станка" },
          ]}
        />
        <div className="content-grid gold-cards">
          <article>
            <h2>
              Расчётный <em>счёт</em>
            </h2>
            <p>Для юридических лиц без НДС. Комиссия банка — по тарифу банка. Наценка за безналичный расчёт — 8%.</p>
          </article>
          <article>
            <h2>
              Электронный <em>платёж</em>
            </h2>
            <p>Оперативная оплата через электронный кошелёк. Наценка — 5% от суммы заказа.</p>
          </article>
          <article>
            <h2>
              До <em>запуска</em>
            </h2>
            <p>
              Ваш файл сверяем до станка. Если макета нет, подготовку посчитаем отдельно и назовём срок до старта.
              Производство начинается после вашего подтверждения.
            </p>
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
