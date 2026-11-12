import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { CatalogBrowser } from "@/components/catalog-browser";

export const metadata: Metadata = {
  title: "Каталог бирок и этикеток для одежды с логотипом на заказ в Москве — производство оптом",
  description:
    "Каталог Бирка Маркет: вшивные и навесные бирки, ZIP-пакеты, полиграфия, мерч, фурнитура и ПВХ-патчи на заказ от производителя в Москве. Печать оптом.",
  alternates: { canonical: "https://birka-market.ru/katalog" },
  openGraph: {
    title: "Каталог бирок и этикеток для одежды с логотипом на заказ в Москве — производство оптом | Бирка Маркет",
    description:
      "Жаккард, сатин, хлопок, нейлон, силикон, светоотражающие бирки, ZIP-пакеты и ПВХ-патчи на заказ от производителя в Москве. Печать оптом.",
    url: "https://birka-market.ru/katalog",
  },
};

export default function CatalogPage() {
  return (
    <>
    <div className="inner-page">
      <div className="inner-hero">
        <Breadcrumbs items={[{ label: "Каталог" }]} />
        <span className="section-number">КАТАЛОГ</span>
        <h1>
          Вся продукция <br />
          <em>в одном месте</em>
        </h1>
        <p>
          Восемь направлений: от вшивной бирки до сайта. Выберите раздел или оставьте заявку — посчитаем тираж.
        </p>
      </div>
      <div className="guide-banner">
        <p>Не уверены в материале и сгибе? Три вопроса подскажут, что выбрать: жаккард или сатин, подгибку, число цветов и тираж.</p>
        <Link href="/kak-vybrat">
          Как выбрать бирки
          <ArrowDownRight size={16} />
        </Link>
      </div>
      <CatalogBrowser />
    </div>
    <CalculatorBlock title={"Расчёт\nзаказа"} />
    </>
  );
}
