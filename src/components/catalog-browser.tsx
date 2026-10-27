"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { GoldEnd } from "@/components/gold-end";
import { ProductCard } from "@/components/product-card";
import { categories, matchesProduct, products } from "@/lib/site";

function CatalogBrowserInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState("");

  const list = useMemo(() => {
    return products.filter((item) => {
      if (category && item.category !== category) return false;
      return matchesProduct(item, query);
    });
  }, [query, category]);

  const groups = useMemo(() => {
    return categories
      .map((item, index) => ({
        item,
        index,
        products: list.filter((product) => product.category === item.slug),
      }))
      .filter((group) => group.products.length > 0);
  }, [list]);

  return (
    <>
      <div className="catalog-toolbar">
        <div>
          <span className="section-number">РАЗДЕЛЫ</span>
        </div>
        <label className="search-line catalog-search">
          <Search size={16} strokeWidth={1.8} aria-hidden="true" />
          <span className="visually-hidden">Поиск по каталогу</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Сатин, ZIP, визитки…"
            autoComplete="off"
          />
        </label>
      </div>
      <div className="catalog-chips" role="group" aria-label="Категории">
        <button type="button" className={!category ? "is-active" : undefined} onClick={() => setCategory("")}>
          Все
        </button>
        {categories.map((item) => (
          <button
            type="button"
            key={item.slug}
            className={category === item.slug ? "is-active" : undefined}
            onClick={() => setCategory(item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {groups.length ? (
        groups.map((group) => (
          <section className="catalog-section" id={group.item.slug} key={group.item.slug}>
            <div className="catalog-section-head">
              <div>
                <span className="section-number">
                  {String(group.index + 1).padStart(2, "0")} / {group.item.name}
                </span>
                <h2>
                  <GoldEnd text={group.item.name} />
                </h2>
                <p>{group.item.intro}</p>
                <Link className="catalog-section-more" href={`/katalog/${group.item.slug}`}>
                  Открыть раздел
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="catalog-section-photo">
                <Image
                  src={group.item.image}
                  alt={group.item.name}
                  fill
                  sizes="(max-width: 760px) 100vw, 360px"
                />
              </div>
            </div>
            <div className="product-grid">
              {group.products.map((item, index) => (
                <ProductCard key={item.slug} product={item} index={index} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className="catalog-empty">
          Ничего не нашли по запросу «{query}». Попробуйте другое слово или{" "}
          <Link href="/raschet">оставьте заявку</Link> — подберём материал.
        </p>
      )}
    </>
  );
}

export function CatalogBrowser() {
  return (
    <Suspense>
      <CatalogBrowserInner />
    </Suspense>
  );
}
