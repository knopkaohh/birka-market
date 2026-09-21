"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { menuGroups } from "@/lib/site";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function SideMenu({ open, onClose }: SideMenuProps) {
  const pathname = usePathname();
  const currentGroup = menuGroups.find(
    (group) => group.href === pathname || group.items.some((item) => item.href === pathname),
  )?.name;
  const [opened, setOpened] = useState<string | null>(currentGroup ?? null);

  const toggle = (name: string) => {
    setOpened((value) => (value === name ? null : name));
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
          <ul className="side-menu-list">
            {menuGroups.map((group) => {
              const isOpen = opened === group.name;
              const isCurrent = currentGroup === group.name;
              return (
                <li key={group.name} className="side-menu-item">
                  <button
                    type="button"
                    className={`side-menu-btn ${isOpen || isCurrent ? "is-active" : ""}`}
                    aria-expanded={isOpen}
                    onClick={() => toggle(group.name)}
                  >
                    {group.name}
                  </button>
                  <ul className={`side-submenu ${isOpen ? "is-open" : ""}`}>
                    <li>
                      <Link href={group.href} className="side-submenu-link" onClick={onClose}>
                        Все в разделе
                      </Link>
                    </li>
                    {group.items.map((item) => (
                      <li key={`${group.name}-${item.href}-${item.label}`}>
                        <Link
                          href={item.href}
                          className={`side-submenu-link ${pathname === item.href ? "is-current" : ""}`}
                          onClick={onClose}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
