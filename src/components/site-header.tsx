"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowDownRight, ChevronRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { categories, company } from "@/lib/site";

const links = [
  { href: "/katalog", label: "Продукция", mega: true },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/dostavka", label: "Доставка" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakty", label: "Контакты" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map((item) => (
            <div
              key={item.href}
              className={item.mega ? "nav-item-mega" : undefined}
              onMouseEnter={() => item.mega && setMegaOpen(true)}
              onMouseLeave={() => item.mega && setMegaOpen(false)}
            >
              <Link href={item.href} className={pathname.startsWith(item.href) ? "is-active" : undefined}>
                {item.label}
              </Link>
              {item.mega && megaOpen && (
                <div className="mega-menu">
                  {categories.map((category) => (
                    <Link key={category.slug} href={`/katalog/${category.slug}`}>
                      {category.name}
                      <ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        {[...links, { href: "/oplata", label: "Оплата" }, { href: "/raschet", label: "Рассчитать стоимость" }].map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
            <ChevronRight />
          </Link>
        ))}
        <a href={company.phoneHref}>{company.phone}</a>
      </div>
    </header>
  );
}
