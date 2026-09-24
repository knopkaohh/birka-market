import type { MetadataRoute } from "next";
import { newsPosts } from "@/lib/news";
import { categories, products } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://birka-market.ru";
  const now = new Date();
  const staticPages = ["", "/katalog", "/o-kompanii", "/novosti", "/dostavka", "/oplata", "/kontakty", "/faq", "/privacy", "/raschet"];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path || "/"}`, lastModified: now })),
    ...categories.map((item) => ({ url: `${base}/katalog/${item.slug}`, lastModified: now })),
    ...products.map((item) => ({ url: `${base}/${item.slug}`, lastModified: now })),
    ...newsPosts.map((item) => ({
      url: `${base}/novosti/${item.slug}`,
      lastModified: new Date(`${item.date}T12:00:00`),
    })),
  ];
}
