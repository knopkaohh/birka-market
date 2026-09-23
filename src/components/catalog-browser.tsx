"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
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

  return (
    <>
      <div className="catalog-toolbar">
        <div>
          <span className="section-number">ВСЕ ПОЗИЦИИ</span>
          <h2>Полный перечень</h2>
        </div>
        <label className="search-line catalog-search">
          <Search size={16} strokeWidth={1.8} aria-hidden="true" />
          <span className="visually-hidden">Поиск по каталогу</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Сатин, ZIP, лендинг…"
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
      {list.length ? (
        <div className="product-grid">
          {list.map((item, index) => (
            <ProductCard key={item.slug} product={item} index={index} />
          ))}
        </div>
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
