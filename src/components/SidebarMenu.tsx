"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  ChevronDown,
  CircleHelp,
  Cog,
  FileText,
  Flag,
  Package,
  RectangleHorizontal,
  Search,
  Shirt,
  Stamp,
  Tag,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { matchesProduct, products } from "@/lib/site";

type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
};

const catalogLinks: { href: string; name: string; icon: LucideIcon }[] = [
  { href: "/neylon", name: "Нейлоновые бирки", icon: Tag },
  { href: "/plastic", name: "Пластиковые бирки", icon: RectangleHorizontal },
  { href: "/merchi", name: "Мерч для бизнеса", icon: Shirt },
  { href: "/katalog/poligrafiya", name: "Полиграфия", icon: FileText },
  { href: "/flags", name: "Печать флагов", icon: Flag },
  { href: "/katalog/vshivnye-birki", name: "Вшивные бирки", icon: Tag },
  { href: "/katalog/navesnye-birki", name: "Навесные бирки", icon: Bookmark },
  { href: "/katalog/upakovka", name: "Упаковка", icon: Package },
  { href: "/katalog/furnitura", name: "Фурнитура", icon: Cog },
  { href: "/katalog/nanesenie", name: "Нанесение и патчи", icon: Stamp },
];

const guideLinks = [
  { href: "/kak-vybrat#brend", name: "Брендовая бирка" },
  { href: "/kak-vybrat#sostav", name: "Состав и уход" },
  { href: "/kak-vybrat#naves", name: "Навес" },
  { href: "/kak-vybrat#guide-materials-title", name: "Материал" },
  { href: "/kak-vybrat#guide-folds-title", name: "Сгиб" },
  { href: "/kak-vybrat#guide-colors-title", name: "Цвета" },
  { href: "/kak-vybrat#guide-qty-title", name: "Тираж" },
];

/** Боковое меню: название, строка поиска и два раздела со значками. */
export function SidebarMenu({ open, onClose }: SidebarMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [productsOpen, setProductsOpen] = useState(true);
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
          <div className="side-brand-row">
            <Link className="side-brand" href="/" prefetch={false} onClick={onClose}>
              Бирка Маркет
            </Link>
            <button type="button" className="side-close" aria-label="Закрыть меню" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <form className="side-search" onSubmit={submitSearch}>
            <Search size={16} aria-hidden="true" />
            <input
              id="side-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Сатин, ZIP, визитки…"
              aria-label="Поиск по каталогу"
              autoComplete="off"
            />
          </form>
          {query.trim() ? (
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
              <Tag size={18} aria-hidden="true" />
              <span>Продукция</span>
              <ChevronDown size={16} className={productsOpen ? "is-turned" : ""} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {productsOpen ? (
                <motion.ul
                  className="side-cats"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {catalogLinks.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04, duration: 0.25 }}
                      >
                        <Link
                          href={item.href}
                          className={pathname === item.href ? "side-cat is-current" : "side-cat"}
                          prefetch={false}
                          onClick={onClose}
                        >
                          <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                          {item.name}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              ) : null}
            </AnimatePresence>

            <div className="side-guide">
              <Link
                href="/kak-vybrat"
                className={`side-main-link ${pathname.startsWith("/kak-vybrat") ? "is-open" : ""}`}
                prefetch={false}
                onClick={onClose}
              >
                <CircleHelp size={18} aria-hidden="true" />
                <span>Как выбрать?</span>
              </Link>
              <ul className="side-guide-list">
                {guideLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} prefetch={false} onClick={onClose}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
