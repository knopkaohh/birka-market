"use client";

import { usePathname } from "next/navigation";
import { YandexMap } from "@/components/yandex-map";

/** На главной карта идёт после футера: нижняя панель и панель над ней меняются местами. */
export function HomeMapSlot() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return (
    <div className="home-map">
      <YandexMap />
    </div>
  );
}
