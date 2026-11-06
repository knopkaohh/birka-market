import type { Metadata } from "next";
import type { LandingContent } from "@/lib/landings/types";
import { company, type Product } from "@/lib/site";

export const siteUrl = "https://birka-market.ru";

export function canonical(path: string) {
  return { canonical: path === "/" ? `${siteUrl}/` : `${siteUrl}${path}` };
}

/** Старые заголовки Тильды уже содержат ключи и город, шаблон «| Бирка Маркет» их дублирует. */
function landingTitle(title: string): Metadata["title"] {
  const keepExact = /логотип|производств|оптом|этикет|ФлексТран|DTF-печать|Пуллеры|ПВД-пакеты|Крафтовые пакеты|маркировки/.test(title);
  return keepExact ? { absolute: title } : title;
}

export function landingMetadata(landing: LandingContent, product: Product): Metadata {
  return {
    title: landingTitle(landing.seoTitle),
    description: landing.seoDescription,
    alternates: { canonical: `${siteUrl}/${landing.slug}` },
    openGraph: {
      title: landing.seoTitle,
      description: landing.seoDescription,
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
    description: landing.seoDescription,
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
