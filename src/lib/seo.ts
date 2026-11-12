import type { Metadata } from "next";
import type { LandingContent } from "@/lib/landings/types";
import { company, type Product } from "@/lib/site";

export const siteUrl = "https://birka-market.ru";

export function canonical(path: string) {
  return { canonical: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}` };
}

/** Title без шаблона сайта, чтобы бренд не дублировался. */
export function pageTitle(title: string): { absolute: string } {
  const clean = title.replace(/\s+/g, " ").trim().replace(/\s*\|\s*Бирка Маркет\s*$/i, "");
  return { absolute: `${clean} | Бирка Маркет` };
}

/** Уникальный title карточки: материал, «на заказ», город и бренд. */
export function offerTitle(subject: string): { absolute: string } {
  return pageTitle(`${subject} на заказ в Москве`);
}

/** Description с материалом, производителем, городом и печатью оптом. */
export function offerDescription(subject: string, detail: string) {
  const text = detail.replace(/\s+/g, " ").trim();
  const body = `${subject} на заказ от производителя Бирка Маркет в Москве. Печать оптом. ${text} Доставка по России.`;
  return body.length > 200 ? `${body.slice(0, 197).trimEnd()}…` : body;
}

export function landingMetadata(landing: LandingContent, product: Product): Metadata {
  const description = offerDescription(product.name, product.summary || landing.seoDescription);
  const title = pageTitle(landing.seoTitle);
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${landing.slug}` },
    openGraph: {
      title: title.absolute,
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
