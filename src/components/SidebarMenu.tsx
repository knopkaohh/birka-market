"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, Search } from "lucide-react";
import BranchedMenu from "@/components/fx/BranchedMenu";
import FluxLines from "@/components/fx/FluxLines";
import { Logo } from "@/components/logo";
import { categories, matchesProduct, products, productsByCategory } from "@/lib/site";

type SidebarMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Тонкие значки разделов в одном начертании. */
function MenuIcon({ slug }: { slug: string }) {
  const paths: Record<string, ReactNode> = {
    produkciya: (
      <>
        <path d="M8 4.5h6.2L17.5 8v11.2a1.3 1.3 0 0 1-1.3 1.3H8a1.3 1.3 0 0 1-1.3-1.3V5.8A1.3 1.3 0 0 1 8 4.5Z" />
        <circle cx="11.2" cy="8.2" r=".8" fill="currentColor" stroke="none" />
      </>
    ),
    "vshivnye-birki": (
      <>
        <path d="M8 4.2h7.2L18.2 7.6V19a1.3 1.3 0 0 1-1.3 1.3H8A1.3 1.3 0 0 1 6.7 19V5.5A1.3 1.3 0 0 1 8 4.2Z" />
        <path d="M9.2 9.2h5.2M9.2 12h5.2M9.2 14.8h3.4" />
        <path d="M6.7 8.2H5M6.7 12H5M6.7 15.8H5" />
      </>
    ),
    "navesnye-birki": (
      <>
        <path d="M12 3.2v2.4" />
        <circle cx="12" cy="3" r=".7" fill="currentColor" stroke="none" />
        <path d="M8.2 6.2h7.6l1.3 2.4V19a1.3 1.3 0 0 1-1.3 1.3H8.2A1.3 1.3 0 0 1 6.9 19V8.6l1.3-2.4Z" />
        <circle cx="12" cy="12.4" r="1.15" />
      </>
    ),
    upakovka: (
      <>
        <path d="M7.2 8.4h9.6l-.8 10.4a1.2 1.2 0 0 1-1.2 1.1H9.2a1.2 1.2 0 0 1-1.2-1.1L7.2 8.4Z" />
        <path d="M9.4 8.4V7a2.6 2.6 0 0 1 5.2 0v1.4" />
      </>
    ),
    furnitura: (
      <>
        <path d="M8.2 5.2h7.6" />
        <path d="M12 5.2v2.8" />
        <rect x="9.3" y="8" width="5.4" height="6.6" rx="1.2" />
        <path d="M12 14.6v3.1" />
        <path d="M9 17.8h6" />
      </>
    ),
    nanesenie: (
      <>
        <path d="M12 3.8 18.6 6.6v5c0 3.3-2.5 6-6.6 7.4-4.1-1.4-6.6-4.1-6.6-7.4v-5L12 3.8Z" />
        <path d="M9.2 11.4 11 13.2l3.6-3.8" />
      </>
    ),
    merch: (
      <path d="M9.1 5.4c.5 1.2 1.6 1.9 2.9 1.9s2.4-.7 2.9-1.9l2.8 1.4-1.5 3h-1.2V19H9V9.8H7.8l-1.5-3 2.8-1.4Z" />
    ),
    poligrafiya: (
      <>
        <path d="M7.2 4.4h7.4L17.8 8v10.6a1.2 1.2 0 0 1-1.2 1.2H7.2A1.2 1.2 0 0 1 6 18.6V5.6a1.2 1.2 0 0 1 1.2-1.2Z" />
        <path d="M14.4 4.6V8h3.2" />
        <path d="M8.6 11.2h5.6M8.6 14h5.6M8.6 16.6h3.6" />
      </>
    ),
    "kak-vybrat": (
      <>
        <circle cx="12" cy="12" r="7.1" />
        <path d="M9.7 9.7a2.3 2.3 0 1 1 3.2 2.1c-.6.4-1 1-1 1.6" />
        <path d="M12 16.6h.01" />
      </>
    ),
  };
  return (
    <svg className="side-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[slug]}
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
  const [productsOpen, setProductsOpen] = useState(true);
  const [query, setQuery] = useState("");
  const branchItems = useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.slug,
        icon: <MenuIcon slug={category.slug} />,
        children: productsByCategory(category.slug).map((item) => ({
          value: item.slug,
          label: item.shortName,
        })),
      })),
    [],
  );
  const openIndex = categories.findIndex((category) => category.slug === currentSlug);
  const activeSlug = products.some((item) => pathname === `/${item.slug}`) ? pathname.slice(1) : "";
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
        <FluxLines
          className="side-menu-flux"
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
          colors={["#ffffff", "#ffffff", "#ffffff"]}
          glow={0.95}
          rimWidth={0.14}
          lineWidth={0.8}
          flowDirection="down"
          mouseInteraction
          clickSwirl
          speed={0.5}
          scale={1.2}
          turbulence={1}
          fluidity={0.1}
          sharpness={1.7}
          shimmer={1.5}
          mouseStrength={0.22}
          mouseRadius={0.1}
          swirlStrength={0.18}
          swirlRadius={0.07}
          intro
          lightMode={false}
          aria-hidden="true"
        />
        <div className="side-menu-inner">
          <div className="side-menu-logo">
            <Logo />
          </div>

          <form className="side-search-panel" onSubmit={submitSearch}>
            <input
              id="side-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Поиск по сайту…"
              aria-label="Поиск по сайту"
              autoComplete="off"
            />
            <button type="submit" className="side-search-go" aria-label="Найти">
              <Search size={15} />
            </button>
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
              <MenuIcon slug="produkciya" />
              <span>Продукция</span>
              <ChevronDown size={16} className={productsOpen ? "is-turned" : ""} aria-hidden="true" />
            </button>
            {productsOpen ? (
              <BranchedMenu
                className="side-branch"
                items={branchItems}
                defaultOpen={openIndex >= 0 ? [openIndex] : []}
                defaultActive={activeSlug}
                onSelect={(value) => {
                  router.push(`/${value}`);
                  onClose();
                }}
                color="#f5f5f5"
                accentColor="#f5f5f5"
                lineColor="#3f3f46"
                width={240}
                rowHeight={40}
                indent={40}
                trunk={14}
                radius={10}
                lineWidth={1.5}
                fontSize={16}
                drawDuration={400}
                foldDuration={300}
              />
            ) : null}

            <Link
              href="/kak-vybrat"
              className={`side-main-link ${pathname.startsWith("/kak-vybrat") ? "is-open" : ""}`}
              prefetch={false}
              onClick={onClose}
            >
              <MenuIcon slug="kak-vybrat" />
              <span>Как выбрать?</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
