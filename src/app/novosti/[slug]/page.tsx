import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { formatNewsDate, getNewsNeighbors, getNewsPost, newsPosts } from "@/lib/news";
import { company } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return newsPosts.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://birka-market.ru/novosti/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://birka-market.ru/novosti/${post.slug}`,
      locale: "ru_RU",
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.cover, alt: post.title }],
    },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();
  const { prev, next } = getNewsNeighbors(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
    image: `https://birka-market.ru${post.cover}`,
    mainEntityOfPage: `https://birka-market.ru/novosti/${post.slug}`,
    author: { "@type": "Organization", name: company.name },
    publisher: { "@type": "Organization", name: company.name },
  };

  return (
    <>
      <article className="inner-page news-article">
        <div className="inner-hero">
          <Breadcrumbs
            items={[
              { href: "/novosti", label: "Новости" },
              { label: post.title },
            ]}
          />
          <span className="section-number">НОВОСТИ</span>
          <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
          <h1>{post.title}</h1>
        </div>
        <figure className="news-cover">
          <Image src={post.cover} alt={post.title} fill sizes="(max-width: 900px) 100vw, 860px" priority />
        </figure>
        <div className="news-body" dangerouslySetInnerHTML={{ __html: post.html }} />
        <nav className="news-pager" aria-label="Другие новости">
          {prev ? (
            <Link href={`/novosti/${prev.slug}`}>
              <span>Ранее</span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/novosti/${next.slug}`}>
              <span>Позднее</span>
              {next.title}
              <ArrowDownRight size={16} />
            </Link>
          ) : (
            <span />
          )}
        </nav>
        <p className="inner-note">
          Нужен расчёт тиража по материалу из новости? Оставьте заявку — менеджер свяжется за {company.replyIn}.
        </p>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorBlock />
    </>
  );
}
