import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { MaterialCatalog, catalogBlurb } from "@/components/material-catalog";
import { catalogItems, catalogOrderHref, getCatalogItem } from "@/lib/catalog";
import { getLanding } from "@/lib/landings";
import { canonical, offerDescription, offerTitle, siteUrl } from "@/lib/seo";
import { getCategory, getProduct } from "@/lib/site";

type Params = { slug: string; item: string };

function titleParts(title: string) {
  const lower = title.toLowerCase();
  for (const marker of ["этикетка ", "бирка ", "пакет "]) {
    const index = lower.indexOf(marker);
    if (index >= 0) {
      const cut = index + marker.length;
      const tail = title.slice(cut).trim();
      if (tail) return { head: title.slice(0, cut).trim(), tail };
    }
  }
  const words = title.trim().split(/\s+/);
  if (words.length < 2) return { head: title, tail: "" };
  const tail = words.pop() ?? "";
  return { head: words.join(" "), tail };
}

export function generateStaticParams() {
  return catalogItems.map((item) => ({ slug: item.material, item: item.path }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug, item: path } = await params;
  const item = getCatalogItem(slug, path);
  const product = getProduct(slug);
  if (!item || !product) return {};
  const description = offerDescription(`${item.title}, ${product.name}`, catalogBlurb(item));
  const title = offerTitle(`${item.title} — ${product.shortName}`);
  return {
    title,
    description,
    alternates: canonical(`/${slug}/tproduct/${item.path}`),
    openGraph: {
      title: title.absolute,
      description,
      url: `${siteUrl}/${slug}/tproduct/${item.path}`,
      images: [{ url: item.image, alt: item.title }],
    },
  };
}

export default async function CatalogExamplePage({ params }: { params: Promise<Params> }) {
  const { slug, item: path } = await params;
  const item = getCatalogItem(slug, path);
  const product = getProduct(slug);
  const landing = getLanding(slug);
  if (!item || !product || !landing) notFound();
  const category = getCategory(product.category);
  const { head, tail } = titleParts(item.title);
  const comment = `Пример: ${item.title}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: item.title,
            description: catalogBlurb(item),
            image: `${siteUrl}${item.image}`,
            brand: { "@type": "Brand", name: "Бирка Маркет" },
            category: product.name,
          }),
        }}
      />
      <section className="jq-hero">
        <div className="jq-hero-copy">
          <Breadcrumbs
            items={[
              { href: "/katalog", label: "Продукция" },
              { href: `/katalog/${product.category}`, label: category?.name ?? "Категория" },
              { href: `/${product.slug}`, label: product.shortName },
              { label: item.title },
            ]}
          />
          <span className="eyebrow">
            <span />
            Пример из каталога · {product.shortName}
          </span>
          <h1>
            {head} <br />
            {tail ? <em>{tail}</em> : null}
          </h1>
          <p>{catalogBlurb(item)}</p>
          {item.characteristics.length ? (
            <ul className="catalog-facts">
              {item.characteristics.map((fact) => (
                <li key={fact.title}>
                  <span>{fact.title}</span>
                  {fact.value}
                </li>
              ))}
            </ul>
          ) : null}
          <Link className="primary-cta catalog-offer-cta" href="#zakaz">
            Рассчитать свой заказ
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="jq-hero-visual">
          <Image
            className="catalog-hero-photo"
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
          />
        </div>
      </section>

      <section className="jq-section" id="orientir">
        <div className="jq-heading">
          <span className="section-number">ЦЕНА</span>
          <h2>Ориентир по этому материалу</h2>
          <p>Цена примера считается как у {product.shortName.toLowerCase()}: размер, тираж и печать. Под каждой ценой можно рассчитать свой заказ.</p>
        </div>
        <div className="jq-quotes">
          {landing.quotes.map((tier) => (
            <Link
              href={catalogOrderHref(item, tier)}
              prefetch={false}
              className="jq-quote"
              key={`${tier.qty}-${tier.size}-${tier.price}`}
            >
              <strong>{tier.price}</strong>
              <span className="jq-quote-unit">{landing.quoteUnit ?? "за штуку"}</span>
              <ul>
                <li>{tier.qty}</li>
                <li>{tier.size}</li>
                <li>{tier.spec}</li>
                <li>{tier.time}</li>
              </ul>
              <span className="jq-quote-cta">
                Рассчитать свой заказ
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <MaterialCatalog
        slug={slug}
        except={item.path}
        title="Другие примеры"
        intro={`Ещё готовые комплекты: ${product.name.toLowerCase()}.`}
      />

      <div id="zakaz">
        <CalculatorBlock
          key={item.uid}
          defaultProduct={product.slug}
          defaultComment={comment}
          title={"Заказать\nэтот пример"}
          lead={`Оставьте телефон — посчитаем комплект «${item.title}» и скажем, что нужно для макета.`}
        />
      </div>
    </>
  );
}
