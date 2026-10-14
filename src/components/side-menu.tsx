"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import { LogoMark, TagLogo } from "@/components/logo";
import { catalogMenu, matchesProduct, navLinks, products } from "@/lib/site";

function SectionIcon({ slug }: { slug: string }) {
  const props = {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (slug === "vshivnye") {
    return (
      <svg {...props}>
        <path d="M4 8.5h16v8H4z" />
        <path d="M7 8.5v8M17 8.5v8" strokeDasharray="1.4 1.8" />
        <path d="M9.5 12.5h5" />
      </svg>
    );
  }
  if (slug === "navesnye") {
    return (
      <svg {...props}>
        <path d="M7 4h7.2L19 8.8V20H7z" />
        <circle cx="10.2" cy="8" r="1.1" />
        <path d="M10.2 4.2V2.5" />
      </svg>
    );
  }
  if (slug === "pakety") {
    return (
      <svg {...props}>
        <path d="M6.5 9h11l-.8 11h-9.4z" />
        <path d="M9 9V7.2a3 3 0 0 1 6 0V9" />
      </svg>
    );
  }
  if (slug === "upakovka") {
    return (
      <svg {...props}>
        <path d="M4 8h16v11H4z" />
        <path d="M4 12h16M12 8v11" />
      </svg>
    );
  }
  if (slug === "patchi") {
    return (
      <svg {...props}>
        <rect x="4" y="5" width="16" height="14" rx="4" />
        <path d="M12 9.2l1.1 2.2 2.4.3-1.8 1.7.4 2.4L12 14.6 9.9 15.8l.4-2.4-1.8-1.7 2.4-.3z" />
      </svg>
    );
  }
  if (slug === "wide") {
    return (
      <svg {...props}>
        <path d="M5 20V5h8l2 3h4v12z" />
        <path d="M5 9h14" />
      </svg>
    );
  }
  if (slug === "furnitura") {
    return (
      <svg {...props}>
        <rect x="8" y="7" width="8" height="12" rx="2" />
        <path d="M12 7V4.5" />
        <circle cx="12" cy="3.2" r="1.3" />
      </svg>
    );
  }
  if (slug === "nanesenie") {
    return (
      <svg {...props}>
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="M12 9.2l1.1 2.2 2.4.3-1.8 1.7.4 2.4L12 14.6 9.9 15.8l.4-2.4-1.8-1.7 2.4-.3z" />
      </svg>
    );
  }
  if (slug === "corporate" || slug === "merch") {
    return (
      <svg {...props}>
        <path d="M8 6.5 4.5 8.2 6 12l2-1.2V19h8v-8.2l2 1.2 1.5-3.8L16 6.5a4 4 0 0 1-8 0z" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M6 5h12v11H6z" />
      <path d="M8 19h12V8" />
      <path d="M9 10h6M9 13h4" />
    </svg>
  );
}

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function SideMenu({ open, onClose }: SideMenuProps) {
  const pathname = usePathname();
  const currentSlug = catalogMenu.find((section) => {
    if (pathname === section.href) return true;
    return section.items.some((item) => pathname === item.href);
  })?.slug;
  const [opened, setOpened] = useState<string | null>(null);
  const [flyTop, setFlyTop] = useState(96);
  const [query, setQuery] = useState("");
  const matches = useMemo(
    () => products.filter((item) => matchesProduct(item, query)),
    [query],
  );
  const searching = query.trim().length > 0;

  const place = (slug: string, row: Element | null, count: number) => {
    if (row) {
      const top = row.getBoundingClientRect().top;
      const estimated = 54 + count * 42;
      const aligned = top - 6;
      const maxTop = window.innerHeight - estimated - 12;
      setFlyTop(Math.max(12, Math.min(aligned, maxTop)));
    }
    setOpened(slug);
  };

  const toggle = (slug: string, row: Element | null, count: number) => {
    if (opened === slug) {
      setOpened(null);
      return;
    }
    place(slug, row, count);
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
            <Link href="/" className="side-brand" aria-label="Бирка Маркет — на главную" prefetch={false} onClick={onClose}>
              <TagLogo className="tag-logo" />
              <LogoMark className="side-wordmark" />
            </Link>
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
              {catalogMenu.map((category) => {
                const items = category.items;
                const href = category.href;
                const isOpen = opened === category.slug;
                const isCurrent = currentSlug === category.slug;
                const panelId = `side-cat-${category.slug}`;

                return (
                  <li
                    key={category.slug}
                    className="side-menu-item"
                    onMouseEnter={(event) => {
                      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                        place(category.slug, event.currentTarget.querySelector(".side-menu-row"), items.length);
                      }
                    }}
                  >
                    <div className={`side-menu-row ${isOpen || isCurrent ? "is-active" : ""}`}>
                      <Link href={href} className="side-menu-link" prefetch={false} onClick={onClose}>
                        <span className="side-menu-mark">
                          <SectionIcon slug={category.slug} />
                        </span>
                        <span>{category.name}</span>
                      </Link>
                      <button
                        type="button"
                        className={`side-menu-arrow ${isOpen ? "is-open" : ""}`}
                        aria-label={isOpen ? `Скрыть ${category.name}` : `Открыть материалы: ${category.name}`}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={(event) => toggle(category.slug, event.currentTarget.closest(".side-menu-row"), items.length)}
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
                        <span className="side-menu-mark">
                          <SectionIcon slug={category.slug} />
                        </span>
                        <span>{category.name}</span>
                        <ArrowRight size={16} />
                      </Link>
                      <ul className="side-submenu-panel">
                        {items.map((item, index) => {
                          const product = products.find((entry) => `/${entry.slug}` === item.href);
                          return (
                            <li key={item.label} style={{ ["--i" as string]: index }}>
                              <Link
                                href={item.href}
                                className={`side-submenu-link ${pathname === item.href ? "is-current" : ""}`}
                                prefetch={false}
                                onClick={onClose}
                              >
                                <span>{item.label}</span>
                                {product ? <small>от {product.minQty.toLocaleString("ru-RU")}</small> : null}
                              </Link>
                            </li>
                          );
                        })}
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
