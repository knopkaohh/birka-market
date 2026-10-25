"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
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
        <Link className="header-slogan" href="/" aria-label="Бирка Маркет — на главную">
          Ваш бренд -<br />
          наша <em>забота!</em>
        </Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={[item.href === "/katalog" ? "is-products" : "", isActive(item.href) ? "is-active" : ""].filter(Boolean).join(" ") || undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a className="phone-link" href={company.phoneHref}>
            <Phone size={15} />
            {company.phone}
          </a>
          <HeaderMessengers />
          <Link className="header-calc" href="/raschet" prefetch={false}>
            Рассчитать заказ
          </Link>
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
      </div>
    </header>
  );
}
