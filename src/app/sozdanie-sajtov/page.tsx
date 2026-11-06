import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import DriftWall from "@/components/fx/DriftWall";
import { GoldEnd } from "@/components/gold-end";
import { GoldRun } from "@/components/gold-run";
import { WebsiteRequest } from "@/components/website-request";

export const metadata: Metadata = {
  title: "Создание сайтов и редизайн сайтов",
  description:
    "Бирка Маркет делает новые сайты и редизайн уже работающих. Оставьте заявку — обсудим структуру, стиль и способ связи.",
  alternates: { canonical: "https://birka-market.ru/sozdanie-sajtov" },
};

const siteLines = [
  "СОЗДАНИЕ САЙТОВ",
  "РЕДИЗАЙН САЙТОВ",
  "БРЕНДЫ, ФИРМЫ И КОМПАНИИ",
  "ПОЛНЫЙ ЦИКЛ",
];

const siteQuotes = [
  {
    text: "Новый сайт или редизайн текущего: от первой бирки и упаковки до страницы, которая представляет бренд.",
    sign: "Бирка Маркет",
  },
  {
    text: "Полный цикл для бренда, фирмы и компании любого направления. Одна команда на производство и страницу.",
    sign: "Как мы работаем",
  },
  {
    text: "Слышим, чем вы занимаетесь, и показываем это с первого экрана — ясно, спокойно и в вашем характере.",
    sign: "Про сайт",
  },
];

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
          <Breadcrumbs items={[{ href: "/katalog", label: "Продукция" }, { label: "Создание и редизайн сайтов" }]} />
          <span className="eyebrow">
            <span />
            Новый сайт или редизайн
          </span>
          <h1>
            Создание сайтов
            <br />
            <em>и редизайн сайтов</em>
          </h1>
          <p className="jq-material-line">
            Делаем сайты с нуля и обновляем уже работающие — для брендов, фирм и компаний любых направлений. Собираем
            структуру и визуальный стиль так, чтобы с первого экрана было понятно, чем вы занимаетесь и как с вами
            связаться.
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

      <section className="site-apply" id="zayavka">
        <div className="site-apply-main">
          <div className="jq-heading">
            <span className="section-number">01 / ЗАЯВКА</span>
            <h2>
              <GoldEnd text="Расскажите о задаче сайта" />
            </h2>
            <p>
              Напишите, нужен новый сайт или редизайн, и какой стиль ближе. Если сайт уже есть, отметьте это в форме.
              Посмотрим вводные и свяжемся, чтобы обсудить страницы и подачу.
            </p>
          </div>
          <div className="gold-frame">
            <GoldRun items={siteLines} />
            <WebsiteRequest />
            <GoldRun items={siteLines} reverse />
          </div>
        </div>
        <ul className="site-quotes">
          {siteQuotes.map((quote) => (
            <li className="site-quote" key={quote.sign}>
              <p>«{quote.text}»</p>
              <span>{quote.sign}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
