"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownRight, Menu, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { company } from "@/lib/site";

const links = [
  { href: "/katalog", label: "Продукция" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/dostavka", label: "Доставка" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakty", label: "Контакты" },
];

export function SiteHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname.startsWith(item.href) ? "is-active" : undefined}
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
            Рассчитать стоимость
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
