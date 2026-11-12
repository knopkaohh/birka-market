import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { formatNewsDate, newsPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "Новости о бирках и этикетках для одежды с логотипом — производство оптом в Москве",
  description:
    "Новости Бирка Маркет: акции на бирки и упаковку на заказ от производителя в Москве. Печать оптом, выставки и кейсы производства.",
  alternates: { canonical: "https://birka-market.ru/novosti" },
  openGraph: {
    title: "Новости о бирках и этикетках для одежды с логотипом — производство оптом в Москве | Бирка Маркет",
    description:
      "Новости Бирка Маркет: бирки и упаковка на заказ от производителя в Москве. Печать оптом, акции и выставки.",
    url: "https://birka-market.ru/novosti",
    locale: "ru_RU",
    type: "website",
    images: [{ url: newsPosts[0].cover, alt: newsPosts[0].title }],
  },
};

export default function NewsPage() {
  return (
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Новости" }]} />
          <span className="section-number">НОВОСТИ</span>
          <h1>
            Что происходит <br />
            <em>на производстве и в отрасли</em>
          </h1>
          <p>Акции, выставки и заметки с производства: что делаем и куда ездим.</p>
        </div>
        <div className="news-grid">
          {newsPosts.map((post) => (
            <Link key={post.slug} href={`/novosti/${post.slug}`} className="news-card">
              <span className="news-card-photo">
                <Image src={post.cover} alt={post.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
              </span>
              <span className="news-card-copy">
                <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <em>Читать</em>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <CalculatorBlock />
    </>
  );
}
