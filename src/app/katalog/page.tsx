import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/site";

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
          <Link className="category-tile" href={`/katalog/${item.slug}`} key={item.slug}>
            <span>0{index + 1}</span>
            <h3>{item.name}</h3>
            <p>{item.intro}</p>
            <em>
              Смотреть
              <ArrowRight />
            </em>
          </Link>
        ))}
      </div>
      <div className="section-heading compact catalog-all">
        <div>
          <span className="section-number">ВСЕ ПОЗИЦИИ</span>
          <h2>Полный перечень</h2>
        </div>
      </div>
      <div className="product-grid">
        {products.map((item, index) => (
          <ProductCard key={item.slug} product={item} index={index} />
        ))}
      </div>
    </div>
  );
}
