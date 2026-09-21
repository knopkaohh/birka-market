import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Новости",
  description: "Новости и обновления Бирка Маркет. Следите за публикациями в Telegram и VK.",
};

export default function NewsPage() {
  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Новости" }]} />
          <span className="section-number">НОВОСТИ</span>
          <h1>
            Пока нет
            <br />
            <em>опубликованных новостей</em>
          </h1>
          <p>
            На сайте нет отдельных публикаций — как и на действующей странице /news. Свежие материалы и акции
            приходят в мессенджеры. Если нужна консультация по тиражу, лучше сразу оставить заявку.
          </p>
        </div>
        <div className="content-grid">
          <article>
            <h2>Telegram</h2>
            <p>Коротко пишем о запуске позиций, материалах и сроках.</p>
            <a href={company.telegram} target="_blank" rel="noreferrer">
              t.me/birka_market_ru
            </a>
          </article>
          <article>
            <h2>VK</h2>
            <p>Примеры работ и новости компании — в сообществе Бирка Маркет.</p>
            <a href={company.vk} target="_blank" rel="noreferrer">
              vk.com/birka_market
            </a>
          </article>
          <article>
            <h2>Расчёт</h2>
            <p>Если задача уже есть, не ждите новость — пришлите параметры, посчитаем тираж.</p>
            <Link href="/raschet">Рассчитать заказ</Link>
          </article>
        </div>
      </div>
      <CalculatorBlock />
    </>
  );
}
