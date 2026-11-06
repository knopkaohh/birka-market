import type { MetadataRoute } from "next";
import { catalogHref, catalogItems } from "@/lib/catalog";
import { newsPosts } from "@/lib/news";
import { categories, products } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://birka-market.ru";
  const now = new Date();
  const staticPages = ["", "/katalog", "/kak-vybrat", "/o-kompanii", "/rabota", "/novosti", "/dostavka", "/oplata", "/kontakty", "/faq", "/dokumenty", "/privacy", "/raschet"];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path || "/"}`, lastModified: now })),
    ...categories.map((item) => ({ url: `${base}/katalog/${item.slug}`, lastModified: now })),
    ...products.map((item) => ({ url: `${base}/${item.slug}`, lastModified: now })),
    ...catalogItems.map((item) => ({ url: `${base}${catalogHref(item)}`, lastModified: now })),
    ...newsPosts.map((item) => ({
      url: `${base}/novosti/${item.slug}`,
      lastModified: new Date(`${item.date}T12:00:00`),
    })),
  ];
}
