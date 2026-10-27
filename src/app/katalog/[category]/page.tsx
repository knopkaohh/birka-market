import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GoldEnd } from "@/components/gold-end";
import { CalculatorBlock } from "@/components/calculator-block";
import { ProductCard } from "@/components/product-card";
import { categories, getCategory, productsByCategory } from "@/lib/site";

type Params = { category: string };

export function generateStaticParams() {
  return categories.map((item) => ({ category: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const item = getCategory(category);
  if (!item) return {};
  return {
    title: `${item.name} на заказ в Москве`,
    description: `${item.intro} Оставьте заявку — менеджер свяжется за 10 минут.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const item = getCategory(category);
  if (!item) notFound();
  const list = productsByCategory(item.slug);

  return (
    <>
      <div className="inner-page">
        <div className="catalog-section-head catalog-page-head">
          <div>
            <Breadcrumbs items={[{ href: "/katalog", label: "Каталог" }, { label: item.name }]} />
            <span className="section-number">КАТЕГОРИЯ</span>
            <h1>
              <GoldEnd text={item.name} />
            </h1>
            <p>{item.intro}</p>
          </div>
          <div className="catalog-section-photo">
            <Image src={item.image} alt={item.name} fill sizes="(max-width: 760px) 100vw, 420px" priority />
          </div>
        </div>
        <div className="product-grid">
          {list.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
      <CalculatorBlock title={`Рассчитать\n${item.name.toLowerCase()}`} />
    </>
  );
}
