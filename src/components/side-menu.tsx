"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Logo } from "@/components/logo";
import { categories, matchesProduct, navLinks, products, productsByCategory } from "@/lib/site";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function SideMenu({ open, onClose }: SideMenuProps) {
  const pathname = usePathname();
  const currentSlug = categories.find((category) => {
    if (pathname === `/katalog/${category.slug}`) return true;
    return productsByCategory(category.slug).some((item) => pathname === `/${item.slug}`);
  })?.slug;
  const [opened, setOpened] = useState<string | null>(currentSlug ?? null);
  const [query, setQuery] = useState("");
  const matches = useMemo(
    () => products.filter((item) => matchesProduct(item, query)),
    [query],
  );
  const searching = query.trim().length > 0;

  const toggle = (slug: string) => {
    setOpened((value) => (value === slug ? null : slug));
  };

  return (
    <>
      <button
        type="button"
        className={`side-overlay ${open ? "is-visible" : ""}`}
        aria-label="Закрыть меню"
        onClick={onClose}
      />
      <aside
        id="side-menu"
        className={`side-menu ${open ? "is-open" : ""}`}
        aria-label="Каталог продукции"
      >
        <div className="side-menu-inner">
          <div className="side-menu-logo">
            <Logo />
          </div>
          <label className="search-tag search-tag-dark side-search">
            <span className="search-tag-tab" aria-hidden="true">
              <i className="search-tag-eyelet" />
              <Search size={15} strokeWidth={2.2} />
            </span>
            <span className="visually-hidden">Поиск по каталогу</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Сатин, ZIP, лендинг…"
              autoComplete="off"
            />
          </label>
          <Link
            href={searching ? `/katalog?q=${encodeURIComponent(query.trim())}` : "/katalog"}
            className={`side-catalog-link ${pathname === "/katalog" ? "is-current" : ""}`}
            prefetch={false}
            onClick={onClose}
          >
            {searching ? `Все результаты (${matches.length})` : "Вся продукция"}
          </Link>
          {searching ? (
            <ul className="side-search-results">
              {matches.length ? (
                matches.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className={`side-submenu-link ${pathname === `/${item.slug}` ? "is-current" : ""}`}
                      prefetch={false}
                      onClick={onClose}
                    >
                      {item.shortName}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="side-search-empty">Ничего не нашли. Попробуйте «жаккард» или «пакет».</li>
              )}
            </ul>
          ) : (
            <ul className="side-menu-list">
              {categories.map((category) => {
                const items = productsByCategory(category.slug);
                const href = `/katalog/${category.slug}`;
                const isOpen = opened === category.slug;
                const isCurrent = currentSlug === category.slug;
                const panelId = `side-cat-${category.slug}`;

                return (
                  <li key={category.slug} className="side-menu-item">
                    <div className={`side-menu-row ${isOpen || isCurrent ? "is-active" : ""}`}>
                      <Link href={href} className="side-menu-link" prefetch={false} onClick={onClose}>
                        {category.name}
                      </Link>
                      <button
                        type="button"
                        className={`side-menu-arrow ${isOpen ? "is-open" : ""}`}
                        aria-label={isOpen ? `Свернуть ${category.name}` : `Показать материалы: ${category.name}`}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(category.slug)}
                      >
                        <ChevronDown size={18} strokeWidth={2.4} />
                      </button>
                    </div>
                    <div className={`side-submenu ${isOpen ? "is-open" : ""}`} id={panelId}>
                      <ul className="side-submenu-panel">
                        {items.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/${item.slug}`}
                              className={`side-submenu-link ${pathname === `/${item.slug}` ? "is-current" : ""}`}
                              prefetch={false}
                              onClick={onClose}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="side-menu-pages">
            <span>КОМПАНИЯ</span>
            {navLinks
              .filter((item) => item.href !== "/katalog")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname.startsWith(item.href) ? "is-current" : undefined}
                  prefetch={false}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      </aside>
    </>
  );
}
