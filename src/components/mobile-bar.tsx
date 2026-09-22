import { Phone } from "lucide-react";
import Link from "next/link";
import { MobileMessengers } from "@/components/messengers";
import { company } from "@/lib/site";

export function MobileBar() {
  return (
    <div className="mobile-bottom">
      <a href={company.phoneHref}>
        <Phone /> Позвонить
      </a>
      <MobileMessengers />
      <Link className="mobile-calc" href="/raschet">
        Рассчитать заказ
      </Link>
    </div>
  );
}
