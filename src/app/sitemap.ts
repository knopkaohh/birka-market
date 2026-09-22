import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://birka-market.ru";
  const now = new Date();
  const staticPages = ["", "/katalog", "/o-kompanii", "/dostavka", "/oplata", "/kontakty", "/faq", "/privacy", "/raschet"];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path || "/"}`, lastModified: now })),
    ...categories.map((item) => ({ url: `${base}/katalog/${item.slug}`, lastModified: now })),
    ...products.map((item) => ({ url: `${base}/${item.slug}`, lastModified: now })),
  ];
}
