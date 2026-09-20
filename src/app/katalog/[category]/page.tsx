import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
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
  return { title: item.name, description: item.intro };
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const item = getCategory(category);
  if (!item) notFound();
  const list = productsByCategory(item.slug);

  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ href: "/katalog", label: "Каталог" }, { label: item.name }]} />
          <span className="section-number">КАТЕГОРИЯ</span>
          <h1>{item.name}</h1>
          <p>{item.intro}</p>
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
