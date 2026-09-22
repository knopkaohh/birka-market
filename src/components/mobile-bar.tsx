import { Phone } from "lucide-react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { company } from "@/lib/site";

export function MobileBar() {
  return (
    <div className="mobile-bottom">
      <a href={company.phoneHref}>
        <Phone /> Позвонить
      </a>
      <a href={company.whatsapp} target="_blank" rel="noreferrer">
        <WhatsAppIcon size={15} /> WhatsApp
      </a>
      <Link href="/raschet">Рассчитать заказ</Link>
    </div>
  );
}
