import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Работа у нас",
  description:
    "Работа в Бирка Маркет: офис и производство в Москве, удалённые продажи. Открытые места — по телефону +7 495 003-88-81 или на prod@birka-market.ru.",
};

const paths = [
  {
    n: "01",
    kicker: "На месте",
    title: (
      <>
        Офис и <em>цех</em>
      </>
    ),
    text: "День среди ленты, станков и разговоров с клиентами. Здесь видно, как из нитки получается бирка, и можно подержать тираж до отгрузки.",
  },
  {
    n: "02",
    kicker: "На расстоянии",
    title: (
      <>
        Продажи <em>онлайн</em>
      </>
    ),
    text: "Ведёте бренд из своего города: от первого звонка до согласованного заказа. Цех остаётся в Москве, вам нужны спокойный разговор, телефон и почта.",
  },
  {
    n: "03",
    kicker: "Без анкеты",
    title: (
      <>
        Короткий <em>отклик</em>
      </>
    ),
    text: "Длинные формы не просим. Позвоните — расскажем, какие места открыты и на каких условиях. Или пришлите несколько строк о себе и резюме.",
  },
] as const;

export default function JobsPage() {
  return (
    <div className="inner-page">
      <div className="inner-hero">
        <Breadcrumbs items={[{ label: "Работа у нас" }]} />
        <span className="section-number">РАБОТА</span>
        <h1>
          Дело, которое
          <br />
          <em>остаётся на одежде</em>
        </h1>
        <p>
          Бирка Маркет производит бирки, ярлыки и маркировку. Тираж рождается в Москве, а разговор с брендом можно
          начать из любого города. Мы расширяем штат: в офис, в цех и на удалённые продажи.
        </p>
        <div className="jobs-contacts">
          <a className="jobs-phone" href={company.phoneHref}>
            {company.phone}
          </a>
          <a className="jobs-mail" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          <span>
            {company.address}. Звоните {company.hours.toLowerCase()}.
          </span>
        </div>
      </div>

      <svg className="jobs-thread" viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden="true">
        <path d="M8 10 H992" />
      </svg>

      <ol className="jobs-paths">
        {paths.map((item) => (
          <li key={item.n}>
            <span className="jobs-index">{item.n}</span>
            <span className="jobs-kicker">{item.kicker}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>

      <p className="jobs-afterword">
        Если удобнее сначала увидеть, как устроен день, приезжайте в офис. Письмо, отправленное вечером, дождётся утра —
        и мы ответим.
      </p>
    </div>
  );
}
