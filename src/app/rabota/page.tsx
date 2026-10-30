import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Работа у нас",
  description:
    "Приглашаем в команду продаж Бирка Маркет. Ищем молодых людей с опытом продаж, без опыта научим на совещаниях. В цех не набираем. Телефон +7 495 003-88-81.",
};

const paths = [
  {
    n: "01",
    kicker: "Кого зовём",
    title: (
      <>
        Молодых <em>продавцов</em>
      </>
    ),
    text: "Ищем живых людей с характером. Опыт продаж желателен: умеете слушать, держать разговор и доводить клиента до заказа. Энергия здесь важнее длинного стажа.",
  },
  {
    n: "02",
    kicker: "Если опыта нет",
    title: (
      <>
        Научим на <em>совещаниях</em>
      </>
    ),
    text: "Собираемся и разбираем продажи по-настоящему: что предлагаем, как об этом говорить, зачем клиенту этот материал, срок и тираж. Это учёба для менеджеров, а не планёрка для галочки.",
  },
  {
    n: "03",
    kicker: "Куда не берём",
    title: (
      <>
        В цех — <em>никого</em>
      </>
    ),
    text: "Производство укомплектовано, в цех набор закрыт. Открыты места в продажах: в офисе в Москве и удалённо, из своего города.",
  },
] as const;

export default function JobsPage() {
  return (
    <div className="inner-page">
      <div className="inner-hero">
        <Breadcrumbs items={[{ label: "Работа у нас" }]} />
        <span className="section-number">КОМАНДА</span>
        <h1>
          Приглашаем
          <br />
          <em>в команду</em>
        </h1>
        <p>
          Мы расширяем команду продаж. Бирка Маркет производит многое: бирки и ярлыки, упаковку, фурнитуру, мерч и
          полиграфию. Ищем молодых людей, желательно с опытом продаж. Если опыта ещё нет — научим.
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
        Длинную анкету заполнять не нужно. Позвоните или пришлите коротко о себе и резюме — расскажем, какие места
        открыты и на каких условиях.
      </p>
    </div>
  );
}
