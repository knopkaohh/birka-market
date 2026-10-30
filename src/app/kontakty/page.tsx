import Image from "next/image";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { SoftQuotes } from "@/components/soft-quotes";
import { YandexMap } from "@/components/yandex-map";
import { company, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты производства в Москве",
  description:
    "Телефон +7 495 003-88-81, почта, Telegram, WhatsApp и адрес склада Бирка Маркет в Москве. Менеджер свяжется за 10 минут в рабочее время.",
};

export default function ContactsPage() {
  return (
    <>
      <div className="inner-page tone-page">
        <div className="tone-glow" aria-hidden="true" />
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Контакты" }]} />
          <span className="section-number">КОНТАКТЫ</span>
          <h1>
            Напишите или
            <br />
            <em>приезжайте в офис</em>
          </h1>
          <p>Менеджер поможет выбрать материал и оформить заказ. Срок и тираж подтверждаем до запуска в производство.</p>
        </div>
        <SoftQuotes
          items={[
            { text: "Один менеджер ведёт заказ от первого звонка до отгрузки.", sign: "Как отвечаем" },
            { text: `В рабочее время перезваниваем за ${company.replyIn}.`, sign: "Срок ответа" },
            { text: "Офис и склад — Строительный проезд, дом 2, строение 1.", sign: "Куда ехать" },
          ]}
        />
        <div className="contact-board">
          <a href={company.phoneHref}>
            <span>ТЕЛЕФОН</span>
            <strong>{company.phone}</strong>
          </a>
          <a href={`mailto:${company.email}`}>
            <span>ПОЧТА</span>
            <strong>{company.email}</strong>
          </a>
          <a className="is-messenger" href={company.telegram} target="_blank" rel="noreferrer">
            <span>TELEGRAM</span>
            <strong>birka_market_ru</strong>
          </a>
          <a className="is-messenger" href={company.whatsapp} target="_blank" rel="noreferrer">
            <span>WHATSAPP</span>
            <strong>+7 916 354-92-87</strong>
          </a>
          <a className="is-messenger" href={company.max} target="_blank" rel="noreferrer">
            <span>МАКС</span>
            <strong>max.ru</strong>
          </a>
        </div>
        <div className="content-grid gold-cards contact-facts">
          <article>
            <h2>
              Офис и <em>склад</em>
            </h2>
            <p>Москва, Строительный проезд, дом 2, строение 1.</p>
            <p>Этаж 1, офис № 1.</p>
            <p>Понедельник – пятница, с 10:00 до 18:00.</p>
            <p>Готовые заказы выдаём на этом же складе.</p>
            <p>В выходные можно приехать по договорённости с менеджером.</p>
            <p>В праздники график может измениться.</p>
            <p>Позвоните, подскажем.</p>
          </article>
          <article>
            <h2>
              Как <em>добраться</em>
            </h2>
            <p>Метро «Сходненская», второй выход.</p>
            <p>Трамвай 6 до остановки «Западный мост».</p>
            <p>Дальше две минуты пешком.</p>
            <p>Коричневые ворота, затем направо во двор.</p>
            <p>Отдельный подъём и железная дверь.</p>
            <p>Звонок слева от двери.</p>
          </article>
          <article>
            <h2>
              На <em>карте</em>
            </h2>
            <p>Производство бирок и упаковки для одежды.</p>
            <p>Строительный проезд, дом 2, строение 1.</p>
            <p>Офис в первом подъезде, со стороны двора.</p>
            <a href={company.map.route} target="_blank" rel="noreferrer">
              Открыть Яндекс Карты
            </a>
          </article>
        </div>
        <h2 className="block-title">Команда</h2>
        <div className="team-grid">
          {team.map((person) => (
            <article key={person.name}>
              <div className="team-photo">
                <Image src={person.photo} alt={person.name} fill sizes="280px" />
              </div>
              <div className="team-copy">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
                {person.email && <a href={`mailto:${person.email}`}>{person.email}</a>}
                {person.phone && <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}>{person.phone}</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
      <YandexMap compact height={560} />
      <CalculatorBlock />
    </>
  );
}
