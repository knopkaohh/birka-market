"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownRight, Menu, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { company, navLinks } from "@/lib/site";

export function SiteHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/katalog") return pathname.startsWith("/katalog") || pathname === "/jacquard";
    return pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "is-active" : undefined}
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
          <Link className="header-cta" href="/raschet">
            Расчет заказа
            <ArrowDownRight size={17} />
          </Link>
          <button className="menu-toggle" aria-label="Открыть меню каталога" onClick={onOpenMenu}>
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
