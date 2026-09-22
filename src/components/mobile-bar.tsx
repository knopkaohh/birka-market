import { Phone } from "lucide-react";
import Link from "next/link";
import { company } from "@/lib/site";

export function MobileBar() {
  return (
    <div className="mobile-bottom">
      <a href={company.phoneHref}>
        <Phone /> Позвонить
      </a>
      <Link href="/raschet">Рассчитать заказ</Link>
    </div>
  );
}
