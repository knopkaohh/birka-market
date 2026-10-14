"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
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
  const [opened, setOpened] = useState<string | null>(null);
  const [flyTop, setFlyTop] = useState(96);
  const [query, setQuery] = useState("");
  const matches = useMemo(
    () => products.filter((item) => matchesProduct(item, query)),
    [query],
  );
  const searching = query.trim().length > 0;

  const place = (slug: string, row: Element | null) => {
    if (row) {
      const top = row.getBoundingClientRect().top;
      const count = productsByCategory(slug).length;
      const estimated = 96 + count * 48;
      const spaceBelow = window.innerHeight - top - 16;
      const next = spaceBelow < Math.min(estimated, 320) ? Math.max(88, top + 44 - Math.min(estimated, 460)) : Math.max(88, top - 12);
      setFlyTop(Math.min(next, Math.max(88, window.innerHeight - 220)));
    }
    setOpened(slug);
  };

  const toggle = (slug: string, row: Element | null) => {
    if (opened === slug) {
      setOpened(null);
      return;
    }
    place(slug, row);
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
        onMouseLeave={() => {
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) setOpened(null);
        }}
      >
        <div className="side-menu-inner">
          <div className="side-menu-logo">
            <Logo />
          </div>
          <label className="search-line search-line-dark side-search">
            <Search size={15} strokeWidth={1.8} aria-hidden="true" />
            <span className="visually-hidden">Поиск по каталогу</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Сатин, ZIP, визитки…"
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
                  <li
                    key={category.slug}
                    className="side-menu-item"
                    onMouseEnter={(event) => {
                      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                        place(category.slug, event.currentTarget.querySelector(".side-menu-row"));
                      }
                    }}
                  >
                    <div className={`side-menu-row ${isOpen || isCurrent ? "is-active" : ""}`}>
                      <Link href={href} className="side-menu-link" prefetch={false} onClick={onClose}>
                        {category.name}
                      </Link>
                      <button
                        type="button"
                        className={`side-menu-arrow ${isOpen ? "is-open" : ""}`}
                        aria-label={isOpen ? `Скрыть ${category.name}` : `Открыть материалы: ${category.name}`}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={(event) => toggle(category.slug, event.currentTarget.closest(".side-menu-row"))}
                      >
                        <ChevronRight size={18} strokeWidth={2.4} />
                      </button>
                    </div>
                    <div
                      className={`side-submenu ${isOpen ? "is-open" : ""}`}
                      id={panelId}
                      style={{ ["--fly-top" as string]: `${flyTop}px` }}
                    >
                      <button type="button" className="side-flyout-back" onClick={() => setOpened(null)}>
                        <ChevronRight size={16} />
                        Все разделы
                      </button>
                      <Link href={href} className="side-flyout-title" prefetch={false} onClick={onClose}>
                        {category.name}
                        <ArrowRight size={18} />
                      </Link>
                      <ul className="side-submenu-panel">
                        {items.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/${item.slug}`}
                              className={`side-submenu-link ${pathname === `/${item.slug}` ? "is-current" : ""}`}
                              prefetch={false}
                              onClick={onClose}
                            >
                              <span>{item.shortName}</span>
                              <small>от {item.minQty.toLocaleString("ru-RU")}</small>
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
