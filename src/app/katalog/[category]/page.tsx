import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GoldEnd } from "@/components/gold-end";
import { CalculatorBlock } from "@/components/calculator-block";
import { ProductCard } from "@/components/product-card";
import { canonical, offerDescription, pageTitle } from "@/lib/seo";
import { categories, getCategory, productsByCategory } from "@/lib/site";

type Params = { category: string };

export function generateStaticParams() {
  return categories.map((item) => ({ category: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const item = getCategory(category);
  if (!item) return {};
  const titles: Record<string, string> = {
    "vshivnye-birki": "Вшивные бирки и этикетки для одежды с логотипом на заказ в Москве — производство оптом",
    "navesnye-birki": "Навесные бирки для одежды с логотипом на заказ в Москве — производство оптом",
    upakovka: "Упаковка для одежды с логотипом на заказ в Москве — печать оптом",
    poligrafiya: "Полиграфия с логотипом на заказ в Москве — печать оптом",
    merch: "Мерч с логотипом на заказ в Москве — производство оптом",
    furnitura: "Фурнитура для одежды с логотипом на заказ в Москве — производство оптом",
    nanesenie: "ПВХ-патчи и нанесение для одежды с логотипом на заказ в Москве — производство",
    sajty: "Создание сайтов для брендов одежды на заказ в Москве",
  };
  return {
    title: pageTitle(titles[item.slug] ?? `${item.name} для одежды с логотипом на заказ в Москве`),
    description: offerDescription(item.name, item.intro),
    alternates:
      item.slug === "sajty" ? canonical("/sozdanie-sajtov") : canonical(`/katalog/${item.slug}`),
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
