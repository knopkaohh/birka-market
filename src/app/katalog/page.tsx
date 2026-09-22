import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryTile } from "@/components/category-tile";
import { CatalogBrowser } from "@/components/catalog-browser";
import { categories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Каталог продукции",
  description: "Вшивные и навесные бирки, упаковка, фурнитура, мерч, нанесение и полиграфия на заказ.",
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
      <div className="category-grid">
        {categories.map((item, index) => (
          <CategoryTile key={item.slug} category={item} index={index} />
        ))}
      </div>
      <CatalogBrowser />
    </div>
  );
}
