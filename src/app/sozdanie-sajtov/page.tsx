import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import DriftWall from "@/components/fx/DriftWall";
import { GoldEnd } from "@/components/gold-end";
import { WebsiteRequest } from "@/components/website-request";

export const metadata: Metadata = {
  title: "Создание сайтов",
  description:
    "Бирка Маркет делает сайты для брендов, фирм и компаний любых направлений. Оставьте заявку — обсудим структуру, стиль и способ связи.",
  alternates: { canonical: "https://birka-market.ru/sozdanie-sajtov" },
};

const heroPhotos = [
  { image: "/images/websites/site-01.jpg", title: "Пример сайта бренда" },
  { image: "/images/websites/site-02.jpg", title: "Пример витрины одежды" },
  { image: "/images/websites/site-03.jpg", title: "Пример сайта на ноутбуке и телефоне" },
  { image: "/images/websites/site-04.jpg", title: "Пример вёрстки страницы" },
  { image: "/images/websites/site-05.jpg", title: "Пример каталога одежды" },
  { image: "/images/websites/site-06.jpg", title: "Пример первого экрана" },
  { image: "/images/websites/site-07.jpg", title: "Пример мобильной витрины" },
];

export default function WebsitePage() {
  return (
    <>
      <section className="jq-hero">
        <div className="jq-hero-copy">
          <Breadcrumbs items={[{ href: "/katalog", label: "Продукция" }, { label: "Создание сайтов" }]} />
          <span className="eyebrow">
            <span />
            Сайты для любой задачи
          </span>
          <h1>
            Создание сайтов
            <br />
            <em>для всех, кому это нужно</em>
          </h1>
          <p className="jq-material-line">
            Бирка Маркет делает сайты для брендов, фирм и компаний любых направлений. Собираем структуру и визуальный
            стиль так, чтобы с первого экрана было понятно, чем вы занимаетесь и как с вами связаться.
          </p>
          <div className="hero-actions">
            <a className="primary-cta" href="#zayavka">
              Оставить заявку
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
        <div className="jq-hero-visual">
          <DriftWall
            className="jq-hero-wall"
            ariaLabel="Примеры сайтов"
            items={heroPhotos}
            columns={3}
            tileWidth={300}
            tileHeight={276}
            gap={18}
            tilt={-1}
            turn={-1}
            perspective={1200}
            depth={120}
            speed={60}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={64}
            fade={0.06}
            dim={1}
            overlayColor="#fffdf8"
            overlayOpacity={0}
            radius={17}
            roll={0}
            pauseOnHover={false}
            grayscale={false}
          />
        </div>
      </section>

      <section className="jq-section" id="zayavka">
        <div className="jq-heading">
          <span className="section-number">01 / ЗАЯВКА</span>
          <h2>
            <GoldEnd text="Расскажите о задаче сайта" />
          </h2>
          <p>
            Напишите, для чего нужен сайт и какой стиль ближе. Если сайт уже есть, отметьте это в форме. Мы
            посмотрим вводные и свяжемся, чтобы обсудить страницы и подачу.
          </p>
        </div>
        <WebsiteRequest />
      </section>
    </>
  );
}
