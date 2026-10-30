import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { company, team } from "@/lib/site";

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
      <div className="jobs-stage">
        <figure className="jobs-film">
          <video
            className="jobs-film-media"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
          <figcaption>Цех в Москве</figcaption>
        </figure>
        <div className="jobs-stills">
          <figure className="jobs-still">
            <Image src="/images/company/cover.jpg" alt="Рулоны ленты на складе производства" fill sizes="420px" />
            <figcaption>Склад ленты</figcaption>
          </figure>
          <figure className="jobs-still">
            <Image src="/images/jacquard/live-01.jpg" alt="Готовые жаккардовые бирки" fill sizes="420px" />
            <figcaption>Готовый тираж</figcaption>
          </figure>
        </div>
      </div>
      <div className="content-grid gold-cards jobs-cards">
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
      <section className="jobs-team" aria-labelledby="jobs-team-title">
        <h2 id="jobs-team-title" className="block-title">
          Кто уже <em>в команде</em>
        </h2>
        <p className="team-intro">
          Офис, продажи и цех. Написать можно на общую почту выше или напрямую со страницы{" "}
          <Link href="/kontakty">контактов</Link>.
        </p>
        <div className="team-grid">
          {team.map((person, index) => (
            <article key={person.name} style={{ animationDelay: `${index * 70}ms` }}>
              <div className="team-photo">
                <Image src={person.photo} alt={person.name} fill sizes="(max-width: 760px) 100vw, 280px" />
              </div>
              <div className="team-copy">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
