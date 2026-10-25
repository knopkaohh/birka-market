"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleHelp, Search } from "lucide-react";
import { Logo } from "@/components/logo";
import { categories, company, matchesProduct, products, productsByCategory } from "@/lib/site";

type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Тонкая золотая бирка у пункта «Продукция». */
function TagMark() {
  return (
    <svg className="tag-mark" viewBox="0 0 28 36" aria-hidden="true">
      <path
        d="M7 2.5h12.2L24.5 8.2V31a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 31V5A2.5 2.5 0 0 1 7 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="14" cy="9" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Боковое меню: сплошной графит, поиск-иконка и два пункта. */
export function SidebarMenu({ open, onClose }: SidebarMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentSlug = categories.find((category) => {
    if (pathname === `/katalog/${category.slug}`) return true;
    return productsByCategory(category.slug).some((item) => pathname === `/${item.slug}`);
  })?.slug;
  const [productsOpen, setProductsOpen] = useState(Boolean(currentSlug) || pathname.startsWith("/katalog"));
  const [opened, setOpened] = useState<string | null>(currentSlug ?? null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const matches = useMemo(() => products.filter((item) => matchesProduct(item, query)), [query]);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    router.push(`/katalog?q=${encodeURIComponent(value)}`);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        className={`side-overlay ${open ? "is-visible" : ""}`}
        aria-label="Закрыть меню"
        onClick={onClose}
      />
      <aside id="side-menu" className={`side-menu ${open ? "is-open" : ""}`} aria-label="Каталог продукции">
        <div className="side-menu-inner">
          <div className="side-menu-logo">
            <Logo />
            <p className="side-slogan">{company.slogan}</p>
          </div>

          <button
            type="button"
            className="side-search-toggle"
            aria-expanded={searchOpen}
            aria-label={searchOpen ? "Скрыть поиск" : "Открыть поиск"}
            onClick={() => setSearchOpen((value) => !value)}
          >
            <Search size={20} strokeWidth={1.8} />
          </button>
          <AnimatePresence initial={false}>
            {searchOpen ? (
              <motion.form
                className="side-search-panel"
                onSubmit={submitSearch}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Сатин, ZIP, визитки…"
                  aria-label="Поиск по каталогу"
                  autoComplete="off"
                />
                <button type="submit" className="side-search-go" aria-label="Найти">
                  <Search size={18} />
                </button>
              </motion.form>
            ) : null}
          </AnimatePresence>
          {searchOpen && query.trim() ? (
            <ul className="side-search-results">
              {matches.length ? (
                matches.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${item.slug}`} prefetch={false} onClick={onClose}>
                      {item.shortName}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="side-search-empty">Ничего не нашли</li>
              )}
            </ul>
          ) : null}

          <div className="side-main">
            <button
              type="button"
              className={`side-main-link ${productsOpen ? "is-open" : ""}`}
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((value) => !value)}
            >
              <TagMark />
              <span>Продукция</span>
              <ChevronDown size={16} className={productsOpen ? "is-turned" : ""} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {productsOpen ? (
                <motion.ul
                  className="side-subcats"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {categories.map((category) => {
                    const items = productsByCategory(category.slug);
                    const isOpen = opened === category.slug;
                    return (
                      <li key={category.slug}>
                        <button
                          type="button"
                          className="side-subcat"
                          aria-expanded={isOpen}
                          onClick={() => setOpened((value) => (value === category.slug ? null : category.slug))}
                        >
                          {category.name}
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen ? (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {items.map((item, index) => (
                                <motion.li
                                  key={item.slug}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.05, duration: 0.25 }}
                                >
                                  <Link
                                    href={`/${item.slug}`}
                                    className={pathname === `/${item.slug}` ? "is-current" : undefined}
                                    prefetch={false}
                                    onClick={onClose}
                                  >
                                    {item.shortName}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </motion.ul>
              ) : null}
            </AnimatePresence>

            <Link
              href="/kak-vybrat"
              className={`side-main-link ${pathname.startsWith("/kak-vybrat") ? "is-open" : ""}`}
              prefetch={false}
              onClick={onClose}
            >
              <CircleHelp size={18} aria-hidden="true" />
              <span>Как выбрать?</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
