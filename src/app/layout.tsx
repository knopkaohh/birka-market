import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MobileBar } from "@/components/mobile-bar";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { UiFallbackScript } from "@/components/ui-fallback-script";
import { company } from "@/lib/site";
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
  title: {
    default: "Бирки, упаковка и мерч на заказ | Бирка Маркет",
    template: "%s | Бирка Маркет",
  },
  description:
    "Производство бирок, упаковки, фурнитуры, мерча и полиграфии для одежды. Тираж от 100 штук, бесплатный макет, доставка по России.",
  openGraph: {
    title: `Бирка Маркет — ${company.slogan}`,
    description: "Бирки, упаковка и фурнитура от макета до готового тиража.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: "https://birka-market.ru",
    telephone: company.phoneHref.replace("tel:", ""),
    email: company.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      streetAddress: company.address,
      addressCountry: "RU",
    },
  };

  return (
    <html lang="ru" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <SiteChrome>
          <main id="top">{children}</main>
          <SiteFooter />
          <MobileBar />
        </SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <UiFallbackScript />
      </body>
    </html>
  );
}
