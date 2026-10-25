"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownRight, Menu, Phone, X } from "lucide-react";
import { HeaderMessengers } from "@/components/messengers";
import { company, navLinks, products } from "@/lib/site";

const productPaths = new Set(products.map((item) => `/${item.slug}`));

export function SiteHeader({
  menuOpen,
  onToggleMenu,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/katalog") return pathname.startsWith("/katalog") || productPaths.has(pathname);
    return pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="header-slogan"
          href="/"
          aria-label="Бирка Маркет — наверх"
          onClick={(event) => {
            if (pathname !== "/") return;
            event.preventDefault();
            const top = document.querySelector<HTMLElement>("#top");
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            top?.focus({ preventScroll: true });
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          }}
        >
          Ваш бренд -<br />
          наша <em>забота!</em>
        </Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={isActive(item.href) ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="header-contacts">
            <a className="phone-link" href={company.phoneHref}>
              <Phone size={15} />
              {company.phone}
            </a>
            <HeaderMessengers />
            <button
              type="button"
              className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню каталога"}
              aria-expanded={menuOpen}
              aria-controls="side-menu"
              onClick={(event) => {
                event.stopPropagation();
                onToggleMenu();
              }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          <Link className="header-calc" href="/raschet" prefetch={false}>
            <ArrowDownRight size={18} aria-hidden="true" />
            Рассчитать заказ
          </Link>
        </div>
      </div>
    </header>
  );
}
