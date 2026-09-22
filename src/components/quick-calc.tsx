"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProduct } from "@/lib/site";

export function QuickCalc() {
  const pathname = usePathname();
  const [path, setPath] = useState(pathname);
  const [calcVisible, setCalcVisible] = useState(false);
  if (path !== pathname) {
    setPath(pathname);
    setCalcVisible(false);
  }

  const slug = pathname.replace(/^\//, "").split("/")[0] ?? "";
  const product = getProduct(slug);
  const hiddenPage = pathname === "/raschet" || pathname === "/spasibo";
  const href = product ? `${pathname}#calc` : "/raschet";

  useEffect(() => {
    if (hiddenPage) return;
    const node = document.getElementById("calc");
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCalcVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0, rootMargin: "0px 0px -90px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [pathname, hiddenPage]);

  if (hiddenPage || calcVisible) return null;

  return (
    <div className="quick-calc-dock">
      <Link href={href} prefetch={false} className="quick-cta">
        Рассчитать заказ
      </Link>
    </div>
  );
}
