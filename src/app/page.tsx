import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { CalculatorBlock } from "@/components/calculator-block";
import { HomeHero } from "@/components/home-hero";
import { MaterialGrid } from "@/components/material-grid";
import { YandexMap } from "@/components/yandex-map";
import { formatNewsDate, newsPosts } from "@/lib/news";

/** Главная: фото и кнопки, затем сетка материалов одной высоты и новости. */
export default function Home() {
  const latestNews = newsPosts.slice(0, 3);

  return (
    <>
      <HomeHero />
      <MaterialGrid />

      <section className="section home-news">
        <div className="section-heading">
          <div>
            <span className="section-number">НОВОСТИ</span>
            <h2 className="type-title">Что происходит сейчас</h2>
          </div>
          <Link className="text-link" href="/novosti">
            Все новости
            <ArrowDownRight size={18} />
          </Link>
        </div>
        <div className="news-grid">
          {latestNews.map((post) => (
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
      </section>

      <CalculatorBlock />
      <YandexMap />
    </>
  );
}
