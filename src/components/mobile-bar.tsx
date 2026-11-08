"use client";

import { Phone } from "lucide-react";
import { MobileMessengers } from "@/components/messengers";
import { openQuickCalc } from "@/components/quick-calc";
import { company } from "@/lib/site";

export function MobileBar() {
  return (
    <div className="mobile-bottom">
      <a className="mobile-call" href={company.phoneHref}>
        <Phone size={18} aria-hidden="true" />
        <span>Позвонить</span>
      </a>
      <MobileMessengers />
      <button type="button" className="mobile-calc" onClick={openQuickCalc}>
        Быстрый расчёт
      </button>
    </div>
  );
}
