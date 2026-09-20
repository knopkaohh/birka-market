import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://birka-market.ru"),
  title: "Бирки для одежды и упаковка на заказ | Бирка Маркет",
  description:
    "Производство бирок, упаковки и фурнитуры для одежды. Тираж от 100 штук, бесплатный макет, доставка по России.",
  openGraph: {
    title: "Бирка Маркет — детали, которые создают бренд",
    description: "Бирки, упаковка и фурнитура от макета до готового тиража.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Бирка Маркет",
    url: "https://birka-market.ru",
    telephone: "+7-495-003-88-81",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      streetAddress: "Строительный проезд, дом 2, стр. 1, офис № 1",
      addressCountry: "RU",
    },
  };

  return (
    <html lang="ru" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
