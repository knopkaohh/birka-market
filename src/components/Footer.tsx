import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { Logo } from "@/components/logo";
import { categories, company } from "@/lib/site";

const companyLinks = [
  { href: "/o-kompanii", label: "О нас" },
  { href: "/dokumenty", label: "Документы" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "Политика конфиденциальности" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-brand">
        <Logo />
        <p className="footer-slogan">Ваш бренд, наша забота</p>
      </div>
      <div className="footer-grid">
        <div>
          <span>Связаться</span>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href={company.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={company.max} target="_blank" rel="noreferrer">
            Макс
          </a>
        </div>
        <div>
          <span>Адрес</span>
          <p>{company.address}</p>
          <p className="footer-hours">
            <i className="hours-dot" aria-hidden="true" />
            {company.hours}
          </p>
          <p className="footer-hours-note">{company.hoursNote}</p>
        </div>
        <div>
          <span>Каталог</span>
          {categories.map((item) => (
            <Link key={item.slug} href={`/katalog/${item.slug}`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <span>Компания</span>
          {companyLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <p className="footer-copy">
            © {year} {company.name}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          {company.legal} · ИНН {company.inn} · ОГРНИП {company.ogrnip}
        </span>
        <span>Бирки • упаковка • фурнитура • мерч</span>
        <BackToTop />
      </div>
    </footer>
  );
}
