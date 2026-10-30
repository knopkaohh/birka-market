import Link from "next/link";
import { Mail, MessageCircle, Send } from "lucide-react";
import { BackToTop } from "@/components/back-to-top";
import { company } from "@/lib/site";

function VkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z" />
    </svg>
  );
}

/** Последний блок: связь, адрес, график и компания. */
export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-contact">
          <span className="footer-heading-amber">Связь с нами</span>
          <a className="footer-phone" href={company.phoneHref}>
            {company.phone}
          </a>
          <div className="footer-messengers">
            <a href={company.whatsapp} target="_blank" rel="noreferrer">
              <span className="messenger-bubble" aria-hidden="true">
                <MessageCircle size={18} />
              </span>
              <small>WhatsApp</small>
            </a>
            <a href={company.telegram} target="_blank" rel="noreferrer">
              <span className="messenger-bubble" aria-hidden="true">
                <Send size={18} />
              </span>
              <small>Telegram</small>
            </a>
            <a href={company.vk} target="_blank" rel="noreferrer">
              <span className="messenger-bubble" aria-hidden="true">
                <VkIcon />
              </span>
              <small>ВКонтакте</small>
            </a>
          </div>
          <a href={`mailto:${company.email}`}>
            <Mail size={14} aria-hidden="true" />
            {company.email}
          </a>
        </div>
        <div>
          <span className="footer-heading-amber">Приезжайте в наш офис</span>
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
          <span className="footer-heading-amber">Компания</span>
          <Link href="/o-kompanii">О нас</Link>
          <Link href="/rabota">Работа у нас</Link>
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
