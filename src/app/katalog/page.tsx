import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { CatalogBrowser } from "@/components/catalog-browser";
import { SoftQuotes } from "@/components/soft-quotes";

export const metadata: Metadata = {
  title: "Каталог бирок, упаковки и мерча на заказ",
  description:
    "Каталог Бирка Маркет: вшивные и навесные бирки, упаковка, фурнитура, мерч и полиграфия. Производство в Москве, тираж от 100 штук.",
};

export default function CatalogPage() {
  return (
    <>
    <div className="inner-page tone-page">
      <div className="tone-glow" aria-hidden="true" />
      <div className="inner-hero">
        <Breadcrumbs items={[{ label: "Каталог" }]} />
        <span className="section-number">КАТАЛОГ</span>
        <h1>
          Вся продукция
          <br />
          <em>в одном месте</em>
        </h1>
        <p>
          Восемь направлений: от вшивной бирки до сайта. Выберите раздел или оставьте заявку — посчитаем тираж.
        </p>
      </div>
      <SoftQuotes
        items={[
          { text: "От вшивной бирки до сайта — в одном каталоге.", sign: "Направления" },
          { text: "Комплект собираем в одном заказе, с одним сроком.", sign: "Вместе" },
          { text: "Тираж посчитаем после материала и количества.", sign: "Расчёт" },
        ]}
      />
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
