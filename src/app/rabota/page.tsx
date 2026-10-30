import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Работа у нас",
  description:
    "Вакансии Бирка Маркет: офис и производство в Москве, удалённые онлайн-продажи. Открытые места — по телефону +7 495 003-88-81 или на prod@birka-market.ru.",
};

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
          Бирка Маркет производит бирки, ярлыки и маркировку для одежды. Компания растёт, и мы регулярно открываем
          места в офисе, на производстве и в удалённых продажах.
        </p>
        <div className="jobs-contacts">
          <a className="jobs-phone" href={company.phoneHref}>
            {company.phone}
          </a>
          <a className="jobs-mail" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          <span>Звоните в часы работы офиса: {company.hours}.</span>
        </div>
      </div>
      <div className="content-grid gold-cards">
        <article>
          <h2>
            Офис и <em>производство</em>
          </h2>
          <p>
            Для тех, кто хочет работать с изделием и клиентами на месте. Офис и склад: {company.address}. График:{" "}
            {company.hours}.
          </p>
        </article>
        <article>
          <h2>
            Онлайн-<em>продажи</em>
          </h2>
          <p>
            Удалённый формат: продаёте бирки и ведёте клиентов через интернет, из любого города. Производство остаётся
            в Москве, связь с командой — по телефону и почте.
          </p>
        </article>
        <article>
          <h2>
            Как узнать <em>о вакансиях</em>
          </h2>
          <p>
            Длинные анкеты на сайте не собираем. Позвоните — расскажем, какие места открыты и на каких условиях. Или
            пришлите коротко о себе и резюме на почту, мы ответим.
          </p>
        </article>
      </div>
    </div>
  );
}
