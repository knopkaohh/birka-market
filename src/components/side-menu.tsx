"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/logo";
import { categories, navLinks, productsByCategory } from "@/lib/site";

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

  const toggle = (slug: string) => {
    setOpened((value) => (value === slug ? null : slug));
  };

  return (
    <>
      <button
        className={`side-overlay ${open ? "is-visible" : ""}`}
        aria-label="Закрыть меню"
        onClick={onClose}
      />
      <aside className={`side-menu ${open ? "is-open" : ""}`} aria-label="Каталог продукции">
        <div className="side-menu-inner">
          <div className="side-menu-logo">
            <Logo />
          </div>
          <Link
            href="/katalog"
            className={`side-catalog-link ${pathname === "/katalog" ? "is-current" : ""}`}
            onClick={onClose}
          >
            Вся продукция
          </Link>
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
                    <Link href={href} className="side-menu-link" onClick={onClose}>
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
          <div className="side-menu-pages">
            <span>КОМПАНИЯ</span>
            {navLinks
              .filter((item) => item.href !== "/katalog")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname.startsWith(item.href) ? "is-current" : undefined}
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
