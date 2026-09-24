import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryTile } from "@/components/category-tile";
import { CatalogBrowser } from "@/components/catalog-browser";
import { categories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Каталог бирок, упаковки и мерча на заказ",
  description:
    "32 позиции на заказ в Москве: вшивные и навесные бирки, упаковка, фурнитура, мерч и полиграфия. Тираж от 100 штук, макет бесплатно.",
};

export default function CatalogPage() {
  return (
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
          32 позиции: бирки, упаковка, фурнитура, мерч и полиграфия. Откройте категорию или сразу переходите к расчёту.
        </p>
      </div>
      <div className="guide-banner">
        <p>Не разбираетесь в материалах и сгибах? Три вопроса подскажут жаккард или сатин, подгибку, цвета и тираж.</p>
        <Link href="/kak-vybrat">
          Как выбрать бирки
          <ArrowDownRight size={16} />
        </Link>
      </div>
      <div className="category-grid">
        {categories.map((item, index) => (
          <CategoryTile key={item.slug} category={item} index={index} />
        ))}
      </div>
      <CatalogBrowser />
    </div>
  );
}
