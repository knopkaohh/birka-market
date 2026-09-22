"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProduct } from "@/lib/site";

const MOBILE_QUERY = "(max-width: 760px)";

export function QuickCalc() {
  const pathname = usePathname();
  const [calcVisible, setCalcVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const slug = pathname.replace(/^\//, "").split("/")[0] ?? "";
  const product = getProduct(slug);
  const hiddenPage = pathname === "/raschet" || pathname === "/spasibo";
  const href = product ? `${pathname}#calc` : "/raschet";

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = document.getElementById("calc");
    if (!node || hiddenPage) {
      setCalcVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setCalcVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0, rootMargin: "0px 0px -90px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [pathname, hiddenPage]);

  if (hiddenPage || calcVisible || isMobile) return null;

  return (
    <div className="quick-calc-dock">
      <Link href={href} prefetch={false} className="quick-cta">
        Рассчитать заказ
      </Link>
    </div>
  );
}
