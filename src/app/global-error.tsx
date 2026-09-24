"use client";

import { Cormorant_Garamond, Manrope } from "next/font/google";
import { FaultScreen } from "@/components/fault-screen";
import "./globals.css";

const manrope = Manrope({ subsets: ["cyrillic", "latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
});

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <FaultScreen
          code="500"
          title="Тираж"
          titleEm="остановился"
          text="Страница Бирка Маркет не собралась. Обновите её или вернитесь в каталог."
          onRetry={reset}
        />
      </body>
    </html>
  );
}
