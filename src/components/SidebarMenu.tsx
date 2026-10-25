"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleHelp, Search } from "lucide-react";
import { Logo } from "@/components/logo";
import { categories, company, matchesProduct, navLinks, products, productsByCategory } from "@/lib/site";

type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Маленькая полупрозрачная бирка рядом с пунктом категории. */
function TagMark() {
  return (
    <svg className="tag-mark" viewBox="0 0 28 36" aria-hidden="true">
      <path
        d="M7 2.5h12.2L24.5 8.2V31a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 31V5A2.5 2.5 0 0 1 7 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="14" cy="9" r="1.7" fill="currentColor" />
    </svg>
  );
}

/** Боковое меню: поиск, блок продукции и блок «Как выбрать?». */
export function SidebarMenu({ open, onClose }: SidebarMenuProps) {
  const pathname = usePathname();
  const currentSlug = categories.find((category) => {
    if (pathname === `/katalog/${category.slug}`) return true;
    return productsByCategory(category.slug).some((item) => pathname === `/${item.slug}`);
  })?.slug;
  const [opened, setOpened] = useState<string | null>(currentSlug ?? null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [query, setQuery] = useState("");
  const matches = useMemo(() => products.filter((item) => matchesProduct(item, query)), [query]);
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
      <aside id="side-menu" className={`side-menu ${open ? "is-open" : ""}`} aria-label="Каталог продукции">
        <div className="side-menu-inner">
          <div className="side-menu-logo">
            <Logo />
            <p className="side-slogan">{company.slogan}</p>
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

          <div className="side-block">
            <Link href="/katalog" className="side-block-title" prefetch={false} onClick={onClose}>
              Продукция
            </Link>
            {searching ? (
              <ul className="side-search-results">
                <li>
                  <Link
                    href={`/katalog?q=${encodeURIComponent(query.trim())}`}
                    className="side-submenu-link"
                    prefetch={false}
                    onClick={onClose}
                  >
                    {`Все результаты (${matches.length})`}
                  </Link>
                </li>
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
                  const isOpen = opened === category.slug;
                  const isCurrent = currentSlug === category.slug;
                  return (
                    <li key={category.slug} className="side-menu-item">
                      <div className={`side-menu-row ${isOpen || isCurrent ? "is-active" : ""}`}>
                        <TagMark />
                        <Link
                          href={`/katalog/${category.slug}`}
                          className="side-menu-link"
                          prefetch={false}
                          onClick={onClose}
                        >
                          {category.name}
                        </Link>
                        <button
                          type="button"
                          className={`side-menu-arrow ${isOpen ? "is-open" : ""}`}
                          aria-expanded={isOpen}
                          aria-label={isOpen ? `Свернуть ${category.name}` : `Показать материалы: ${category.name}`}
                          onClick={() => setOpened((value) => (value === category.slug ? null : category.slug))}
                        >
                          <ChevronDown size={18} strokeWidth={2.4} />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.ul
                            className="side-submenu-motion"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {items.map((item, index) => (
                              <motion.li
                                key={item.slug}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.28 }}
                              >
                                <Link
                                  href={`/${item.slug}`}
                                  className={`side-submenu-link ${pathname === `/${item.slug}` ? "is-current" : ""}`}
                                  prefetch={false}
                                  onClick={onClose}
                                >
                                  {item.name}
                                </Link>
                              </motion.li>
                            ))}
                          </motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="side-block side-block-help">
            <p className="side-block-title">Как выбрать?</p>
            <button type="button" className="side-help-link" onClick={() => setHelpOpen((value) => !value)}>
              <CircleHelp size={16} aria-hidden="true" />
              Мы подскажем, как выбрать
            </button>
            <AnimatePresence initial={false}>
              {helpOpen ? (
                <motion.div
                  className="side-help-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32 }}
                >
                  <p>Подберём материал, сравним варианты и посчитаем тираж под задачу.</p>
                  <Link href="/kak-vybrat" prefetch={false} onClick={onClose}>
                    Открыть подбор
                  </Link>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

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
