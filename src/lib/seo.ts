import type { Metadata } from "next";
import type { LandingContent } from "@/lib/landings/types";
import { company, type Product } from "@/lib/site";

export const siteUrl = "https://birka-market.ru";

export function canonical(path: string) {
  return { canonical: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}` };
}

/** Уникальный title: материал, «на заказ», город и бренд. Шаблон сайта не дублирует имя. */
export function offerTitle(subject: string): { absolute: string } {
  return { absolute: `${subject} на заказ в Москве | Бирка Маркет` };
}

/** Description с материалом, производителем, городом и печатью оптом. */
export function offerDescription(subject: string, detail: string) {
  const text = detail.replace(/\s+/g, " ").trim();
  const body = `${subject} на заказ от производителя Бирка Маркет в Москве. Печать оптом. ${text} Доставка по России.`;
  return body.length > 200 ? `${body.slice(0, 197).trimEnd()}…` : body;
}

export function landingMetadata(landing: LandingContent, product: Product): Metadata {
  const description = offerDescription(product.name, product.summary || landing.seoDescription);
  return {
    title: offerTitle(product.name),
    description,
    alternates: { canonical: `${siteUrl}/${landing.slug}` },
    openGraph: {
      title: `${product.name} на заказ в Москве | Бирка Маркет`,
      description,
      url: `${siteUrl}/${landing.slug}`,
      locale: "ru_RU",
      type: "website",
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export function landingJsonLd(landing: LandingContent, product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: offerDescription(product.name, product.summary || landing.seoDescription),
    image: `${siteUrl}${product.image}`,
    brand: { "@type": "Brand", name: company.name },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "RUB",
      url: `${siteUrl}/${landing.slug}`,
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: product.minQty,
        unitText: "шт",
      },
    },
  };
}
