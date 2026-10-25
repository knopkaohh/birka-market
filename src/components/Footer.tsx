import Link from "next/link";
import { ArrowDownRight, Mail, MessageCircle, Send } from "lucide-react";
import { BackToTop } from "@/components/back-to-top";
import { Logo } from "@/components/logo";
import { company } from "@/lib/site";

/** Четыре колонки под слоганом: связь, адрес, график и компания. */
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Logo />
        <p className="footer-copy">© {new Date().getFullYear()} Бирка Маркет</p>
        <Link className="footer-circle" href="/raschet">
          Рассчитать
          <br />
          заказ
          <ArrowDownRight />
        </Link>
      </div>
      <div className="footer-grid">
        <div>
          <span className="footer-heading-muted">Связь с нами</span>
          <a className="footer-phone" href={company.phoneHref}>
            {company.phone}
          </a>
          <div className="footer-messengers">
            <a href={company.whatsapp} target="_blank" rel="noreferrer">
              <span className="messenger-bubble" aria-hidden="true">
                <MessageCircle size={16} />
              </span>
              <small>WhatsApp</small>
            </a>
            <a href={company.telegram} target="_blank" rel="noreferrer">
              <span className="messenger-bubble" aria-hidden="true">
                <Send size={16} />
              </span>
              <small>Telegram</small>
            </a>
          </div>
          <a href={`mailto:${company.email}`}>
            <Mail size={14} aria-hidden="true" />
            {company.email}
          </a>
        </div>
        <div>
          <span className="footer-heading-muted">Приезжайте в наш офис</span>
          <p>г. Москва, Строительный проезд, дом 2 стр. 1, этаж 1, офис № 1.</p>
          <strong>Выдача заказов и самовывоз со склада</strong>
          <p>
            Выдача готовой продукции осуществляется на территории нашего складского комплекса. Для вашего удобства мы
            открыты в течение всего рабочего дня.
          </p>
        </div>
        <div>
          <span className="footer-heading-amber">График работы офиса</span>
          <p className="hours-main">
            <i className="gold-dot" aria-hidden="true" />
            Понедельник – Пятница с 10:00 до 18:00
          </p>
          <p>Суббота и воскресенье: по согласованию с менеджером.</p>
          <p>В праздничные дни график может отличаться — пожалуйста, звоните для уточнения.</p>
        </div>
        <div>
          <span>Компания</span>
          <Link href="/o-kompanii">О нас</Link>
          <Link href="/dokumenty">Документы</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Политика конфиденциальности</Link>
          <p>© {new Date().getFullYear()} Бирка Маркет</p>
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
