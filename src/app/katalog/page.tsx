import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { CatalogBrowser } from "@/components/catalog-browser";

export const metadata: Metadata = {
  title: "Каталог бирок, упаковки и мерча на заказ",
  description:
    "Каталог Бирка Маркет: вшивные и навесные бирки, упаковка, фурнитура, мерч и полиграфия. Производство в Москве, тираж от 100 штук.",
};

export default function CatalogPage() {
  return (
    <>
    <div className="inner-page">
      <div className="inner-hero">
        <Breadcrumbs items={[{ label: "Каталог" }]} />
        <span className="section-number">КАТАЛОГ</span>
        <h1>
          Вся продукция
          <br />
          <em>в одном месте</em>
        </h1>
        <p>
          Семь направлений: от вшивной бирки до баннера. Выберите материал или оставьте заявку — посчитаем тираж.
        </p>
      </div>
      <div className="guide-banner">
        <p>Не уверены в материале и сгибе? Три вопроса подскажут жаккард или сатин, подгибку, цвета и тираж.</p>
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
