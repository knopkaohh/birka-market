"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, CircleHelp, Search } from "lucide-react";
import { Logo } from "@/components/logo";
import { categories, matchesProduct, navLinks, products, productsByCategory } from "@/lib/site";

type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function SidebarMenu({ open, onClose }: SidebarMenuProps) {
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
  const companyLinks = navLinks.filter((item) => item.href !== "/katalog" && item.href !== "/kak-vybrat");

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
            href="/katalog"
            className={`side-products-link ${pathname === "/katalog" || pathname.startsWith("/katalog") ? "is-current" : ""}`}
            prefetch={false}
            onClick={onClose}
          >
            Продукция
          </Link>
          <div className="side-products">
            {searching ? (
              <>
                <Link
                  href={`/katalog?q=${encodeURIComponent(query.trim())}`}
                  className="side-catalog-link"
                  prefetch={false}
                  onClick={onClose}
                >
                  {`Все результаты (${matches.length})`}
                </Link>
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
                </>
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
                              onClick={() => setOpened((value) => (value === category.slug ? null : category.slug))}
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
          </div>
          <Link href="/kak-vybrat" className="side-help-link" prefetch={false} onClick={onClose}>
            <CircleHelp size={16} aria-hidden="true" />
            Как выбрать?
          </Link>
          <div className="side-menu-pages">
            <span>Компания</span>
            {companyLinks.map((item) => (
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
