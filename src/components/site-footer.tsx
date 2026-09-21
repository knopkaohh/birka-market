import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { BackToTop } from "@/components/back-to-top";
import { Logo } from "@/components/logo";
import { categories, company, navLinks } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-top">
        <Logo />
        <h2>
          Ваш бренд -
          <br />
          наша <em>забота!</em>
        </h2>
        <Link className="footer-circle" href="/raschet">
          Обсудить
          <br />
          задачу
          <ArrowDownRight />
        </Link>
      </div>
      <div className="footer-grid">
        <div>
          <span>СВЯЗАТЬСЯ</span>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href={company.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
        <div>
          <span>АДРЕС</span>
          <p>
            {company.address}
            <br />
            {company.hours}
          </p>
        </div>
        <div>
          <span>КАТАЛОГ</span>
          {categories.slice(0, 4).map((item) => (
            <Link key={item.slug} href={`/katalog/${item.slug}`}>
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          <span>КОМПАНИЯ</span>
          {navLinks
            .filter((item) => item.href !== "/katalog")
            .map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          <Link href="/privacy">Конфиденциальность</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} БИРКА МАРКЕТ</span>
        <span>Бирки • упаковка • фурнитура • мерч</span>
        <BackToTop />
      </div>
    </footer>
  );
}
