"use client";

import Link from "next/link";
import { Search } from "lucide-react";

/** Шапка на всю ширину: название слева, слоган по центру, лупа справа. */
export function SiteHeader({
  menuOpen,
  onToggleMenu,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const focusSearch = () => {
    const field = document.getElementById("side-search");
    const narrow = window.matchMedia("(max-width: 1150px)").matches;
    if (narrow && !menuOpen) onToggleMenu();
    window.setTimeout(() => field?.focus(), narrow ? 280 : 0);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="header-brand" href="/" prefetch={false}>
          Бирка Маркет
        </Link>
        <p className="header-slogan">
          <span>Ваш бренд</span>
          <i className="header-slogan-dot" aria-hidden="true" />
          <span>
            наша <em>забота</em>
          </span>
        </p>
        <div className="header-tools">
          <button
            type="button"
            className="header-search"
            aria-label={menuOpen ? "К поиску в меню" : "Открыть поиск"}
            onClick={focusSearch}
          >
            <Search size={20} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}
