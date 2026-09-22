"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProduct } from "@/lib/site";

export function QuickCalc() {
  const pathname = usePathname();
  const [calcVisible, setCalcVisible] = useState(false);
  const slug = pathname.replace(/^\//, "").split("/")[0] ?? "";
  const product = getProduct(slug);
  const hiddenPage = pathname === "/raschet" || pathname === "/spasibo";
  const href = product ? `${pathname}#calc` : "/raschet";

  useEffect(() => {
    const node = document.getElementById("calc");
    if (!node || hiddenPage) {
      setCalcVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setCalcVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.28 },
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
