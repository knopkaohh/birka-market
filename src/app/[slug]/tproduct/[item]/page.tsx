import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { MaterialCatalog, catalogBlurb } from "@/components/material-catalog";
import { catalogItems, catalogOrderHref, getCatalogItem, lowestQuote } from "@/lib/catalog";
import { getLanding } from "@/lib/landings";
import { quoteComment, quoteQuantity, type QuotePrefill } from "@/lib/landings/types";
import { canonical, siteUrl } from "@/lib/seo";
import { getCategory, getProduct } from "@/lib/site";

type Params = { slug: string; item: string };
type Search = QuotePrefill & { example?: string };

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
  const description = `${catalogBlurb(item)}. ${product.shortName} на заказ в Москве, производство Бирка Маркет.`;
  const title = `${item.title} на заказ в Москве`;
  return {
    title,
    description,
    alternates: canonical(`/${slug}/tproduct/${item.path}`),
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${slug}/tproduct/${item.path}`,
      images: [{ url: item.image, alt: item.title }],
    },
  };
}

export default async function CatalogExamplePage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug, item: path } = await params;
  const query = await searchParams;
  const item = getCatalogItem(slug, path);
  const product = getProduct(slug);
  const landing = getLanding(slug);
  if (!item || !product || !landing) notFound();
  const category = getCategory(product.category);
  const { head, tail } = titleParts(item.title);
  const from = lowestQuote(landing.quotes);
  const quote = query.price ? query : undefined;
  const comment = [`Пример: ${item.title}`, quote ? quoteComment(quote) : ""].filter(Boolean).join(". ");

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
          {from ? (
            <div className="catalog-offer">
              <strong>{from.price.trim().toLowerCase().startsWith("от") ? from.price : `от ${from.price}`}</strong>
              <span>
                {from.qty} · {from.size} · {from.spec}
              </span>
              <Link className="primary-cta" href={catalogOrderHref(item, from)}>
                Заказать
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : null}
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
          <p>Цена примера считается как у {product.shortName.toLowerCase()}: размер, тираж и печать. Под каждой ценой можно заказать такой же комплект.</p>
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
                Заказать
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div id="zakaz">
        <CalculatorBlock
          key={[query.qty, query.size, query.price, item.uid].filter(Boolean).join("-") || item.uid}
          defaultProduct={product.slug}
          defaultComment={comment}
          defaultQuantity={query.qty ? quoteQuantity(query.qty) : undefined}
          title={"Заказать\nэтот пример"}
          lead={`Оставьте телефон — посчитаем комплект «${item.title}» и скажем, что нужно для макета.`}
        />
      </div>

      <MaterialCatalog
        slug={slug}
        except={item.path}
        title="Другие примеры"
        intro={`Ещё готовые комплекты: ${product.name.toLowerCase()}.`}
      />
    </>
  );
}
