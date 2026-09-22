import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryTile } from "@/components/category-tile";
import { CatalogBrowser } from "@/components/catalog-browser";
import { categories } from "@/lib/site";

export const metadata: Metadata = {
  title: "Каталог продукции",
  description: "Вшивные и навесные бирки, упаковка, фурнитура, мерч, нанесение, полиграфия и разработка сайтов на заказ.",
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
          36 позиций: бирки, упаковка, фурнитура, мерч, полиграфия и сайты. Откройте категорию или сразу переходите к расчёту.
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
