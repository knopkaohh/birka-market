import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { ProductCard } from "@/components/product-card";
import { getCategory, getProduct, products, relatedProducts } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return products.filter((item) => item.slug !== "jacquard").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} на заказ`,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const related = relatedProducts(product);

  return (
    <>
      <div className="inner-page product-page">
        <Breadcrumbs
          items={[
            { href: "/katalog", label: "Каталог" },
            { href: `/katalog/${product.category}`, label: category?.name ?? "Категория" },
            { label: product.shortName },
          ]}
        />
        <div className="product-layout">
          <div className="product-hero-image">
            <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 50vw" priority />
            {product.sample && <span className="sample-badge">Можно сделать образец</span>}
          </div>
          <div className="product-copy">
            <span className="section-number">{category?.name}</span>
            <h1>{product.name}</h1>
            <p className="hero-lead">{product.description}</p>
            <div className="hero-proof product-facts">
              <div>
                <strong>от {product.minQty}</strong>
                <span>минимальный тираж</span>
              </div>
              <div>
                <strong>срок</strong>
                <span>{product.leadTime}</span>
              </div>
              <div>
                <strong>0 ₽</strong>
                <span>технический макет</span>
              </div>
            </div>
            <ul className="feature-list">
              {product.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <Link className="primary-cta" href={`/raschet?product=${product.slug}`}>
                Рассчитать стоимость
                <ArrowRight />
              </Link>
              <Link className="text-link" href="/katalog">
                В каталог
              </Link>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="related-block">
            <h2>Рядом в категории</h2>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <CalculatorBlock defaultProduct={product.slug} title={`Рассчитать\n${product.shortName.toLowerCase()}`} />
    </>
  );
}
