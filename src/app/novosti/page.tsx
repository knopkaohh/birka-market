import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { formatNewsDate, newsPosts } from "@/lib/news";

export const metadata: Metadata = {
  title: "Новости производства и акций",
  description:
    "Новости Бирка Маркет: акции на бирки и упаковку, выставки, кейсы и обновления производства. Все публикации со старого сайта с датами и полным текстом.",
  alternates: { canonical: "https://birka-market.ru/novosti" },
  openGraph: {
    title: "Новости Бирка Маркет",
    description: "Акции, выставки и материалы о бирках, упаковке и мерче.",
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
            Что происходит
            <br />
            <em>на производстве и в отрасли</em>
          </h1>
          <p>
            {newsPosts.length} публикаций с датами и полным текстом со старого сайта birka-market.ru: акции, выставки,
            материалы о бирках и упаковке.
          </p>
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
                <em>
                  Читать
                  <ArrowDownRight size={16} />
                </em>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <CalculatorBlock />
    </>
  );
}
