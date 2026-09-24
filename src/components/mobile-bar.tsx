"use client";

import { Phone } from "lucide-react";
import { MobileMessengers } from "@/components/messengers";
import { openQuickCalc } from "@/components/quick-calc";
import { company } from "@/lib/site";

export function MobileBar() {
  return (
    <div className="mobile-bottom">
      <a href={company.phoneHref}>
        <Phone /> Позвонить
      </a>
      <MobileMessengers />
      <button type="button" className="mobile-calc" onClick={openQuickCalc}>
        Быстрый расчёт
      </button>
    </div>
  );
}
