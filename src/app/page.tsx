import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalculatorBlock } from "@/components/calculator-block";
import { Marquee } from "@/components/marquee";
import { CasesSection } from "@/components/cases-section";
import { ProcessParallax } from "@/components/process-parallax";
import { ProductCard } from "@/components/product-card";
import { YandexMap } from "@/components/yandex-map";
import {
  categories,
  company,
  faqItems,
  featuredSlugs,
  getProduct,
  portfolio,
} from "@/lib/site";

const filmShots = [
  { src: "/images/jacquard/hero-board.jpg", alt: "Набор вшивных бирок с реальных тиражей", title: "Бирки" },
  { src: "/images/jacquard/burst.jpg", alt: "Цветные тканые бирки THE BURST", title: "Жаккард" },
  { src: "/images/satin/annilook.jpg", alt: "Сатиновые ленты ANNILOOK", title: "Сатин" },
  { src: "/images/kraft/g6.jpg", alt: "Крафтовые пакеты с ручками", title: "Упаковка" },
  { src: "/images/printing/g1.jpg", alt: "Тираж листовок и флаеров", title: "Полиграфия" },
];

export default function Home() {
  const featured = featuredSlugs.map((slug) => getProduct(slug)).filter(Boolean);
  const showreel = fs.existsSync(path.join(process.cwd(), "public/video/showreel.mp4"));

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            С {company.since} года · ни один бренд не подвели
          </div>
          <h1>
            <span className="hero-line"><span>Бирки,</span></span>
            <span className="hero-line"><span>упаковка</span></span>
            <span className="hero-line"><span>и мерч <em>на тираж</em></span></span>
          </h1>
          <p className="hero-lead">
            {company.slogan} Чем больше тираж, тем выгоднее цена. Давайте сотрудничать — доведём заказ до отгрузки.
          </p>
          <div className="hero-actions">
            <Link className="primary-cta" href="/raschet">
              Рассчитать заказ
              <ArrowRight size={19} />
            </Link>
            <Link className="hero-secondary" href="/katalog">
              Открыть каталог
              <ArrowRight size={18} />
            </Link>
            <a className="hero-phone" href={company.phoneHref}>{company.phone}</a>
            <a className="scroll-cue" href="#categories">
              Направления
              <ArrowDownRight size={16} />
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <strong>с {company.since}</strong>
              <span>ведём до отгрузки</span>
            </div>
            <div>
              <strong>{company.brands}</strong>
              <span>брендов с нами</span>
            </div>
            <div>
              <strong>0</strong>
              <span>подведённых брендов</span>
            </div>
          </div>
        </div>
        <div className="hero-board">
          <figure className="hero-shot hero-shot-main">
            <Image
              src="/images/jacquard/burst.jpg"
              alt="Цветные тканые бирки с реального тиража"
              fill
              unoptimized
              priority
              sizes="(max-width: 900px) 70vw, 32vw"
            />
            <figcaption>Бирки</figcaption>
          </figure>
          <figure className="hero-shot">
            <Image
              src="/images/kraft/g6.jpg"
              alt="Крафтовые пакеты с ручками"
              fill
              unoptimized
              sizes="(max-width: 900px) 40vw, 18vw"
            />
            <figcaption>Упаковка</figcaption>
          </figure>
          <figure className="hero-shot">
            <Image
              src="/images/merchi/g8.jpg"
              alt="Мерч с нанесением для бренда"
              fill
              unoptimized
              sizes="(max-width: 900px) 40vw, 18vw"
            />
            <figcaption>Мерч</figcaption>
          </figure>
        </div>
      </section>

      <Marquee />

      <section className="pick" id="categories">
        <div className="pick-head">
          <span className="section-number">01 / С ЧЕГО НАЧАТЬ</span>
          <h2>
            Семь направлений.
            <br />
            <em>Один клик.</em>
          </h2>
        </div>
        <div className="pick-grid">
          {categories.map((item) => (
            <Link key={item.slug} href={`/katalog/${item.slug}`} className="pick-card">
              <div className="pick-photo">
                <Image src={item.image} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" />
              </div>
              <div className="pick-copy">
                <strong>{item.name}</strong>
                <span>
                  Смотреть
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section products-section">
        <div className="section-heading">
          <div>
            <span className="section-number">02 / ЧАСТО ЗАКАЗЫВАЮТ</span>
            <h2>
              Продукция,
              <br />с которой начинают
            </h2>
          </div>
          <p>Восемь позиций, которые чаще всего открывают сотрудничество. Полный перечень — в каталоге.</p>
        </div>
        <div className="product-grid">
          {featured.map((item, index) => item && (
            <ProductCard
              key={item.slug}
              product={item}
              index={index}
              image={
                {
                  jacquard: "/images/jacquard/aliyation.jpg",
                  "birki-karton": "/images/birki-karton/g3.jpg",
                  kraft: "/images/kraft/g3.jpg",
                  merchi: "/images/merchi/g5.jpg",
                }[item.slug]
              }
            />
          ))}
        </div>
        <div className="choice-banner">
          <div className="choice-icon">
            <MessageCircle />
          </div>
          <div>
            <span>НЕ ЗНАЕТЕ, ЧТО ПОДОЙДЁТ?</span>
            <h3>Опишите изделие — подберём материал за вас</h3>
          </div>
          <Link href="/raschet">
            Рассчитать заказ
            <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="film" aria-label="Кадр с реальными тиражами">
        {showreel ? (
          <video className="film-media" autoPlay muted loop playsInline poster="/images/jacquard/hero-board.jpg">
            <source src="/video/showreel.mp4" type="video/mp4" />
          </video>
        ) : (
          <>
            <div className="film-roll">
              {filmShots.map((shot) => (
                <div className="film-shot" key={shot.src}>
                  <Image className="film-media" src={shot.src} alt={shot.alt} fill unoptimized sizes="100vw" />
                </div>
              ))}
            </div>
            <div className="film-scenes" aria-hidden="true">
              {filmShots.map((shot, index) => (
                <span key={shot.src}>
                  <small>{String(index + 1).padStart(2, "0")} / {String(filmShots.length).padStart(2, "0")}</small>
                  {shot.title}
                </span>
              ))}
            </div>
            <div className="film-meter" aria-hidden="true"><i /></div>
          </>
        )}
        <div className="film-shade" />
        <div className="film-caption">
          <span>Без мокапов</span>
          <h2>
            Реальные
            <br />
            тиражи
          </h2>
          <p>То, что уходит в пошив.</p>
        </div>
      </section>

      <section className="dark-section">
        <div className="dark-intro">
          <span className="section-number light">03 / ПОЧЕМУ МЫ</span>
          <p className="display-quote">
            Не просто печатаем бирки. <em>Вникаем в задачу</em> и отвечаем за результат — от первого файла до последней детали тиража.
          </p>
        </div>
        <div className="advantages">
          {[
            ["01", "Доводим до конца", "С 2017 года ни один бренд не остался без готового тиража. Чем больше объём, тем выгоднее цена."],
            ["02", "Менеджер + технолог", "Проверят параметры, материал и способ обработки до запуска."],
            ["03", "Контроль качества", "Сверяем размер, цвет, читаемость и края с согласованным макетом."],
            ["04", "Всё в одном месте", "Бирки, упаковка, фурнитура, мерч и полиграфия у одного партнёра."],
          ].map(([num, title, text]) => (
            <div className="advantage" key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section works-section" id="works">
        <div className="section-heading compact">
          <div>
            <span className="section-number">04 / НАШИ РАБОТЫ</span>
            <h2>
              Сделано для брендов,
              <br />
              которые ценят детали
            </h2>
          </div>
          <p>Показываем продукт крупно — без мокапов и декоративных обещаний.</p>
        </div>
        <div className="works-grid">
          {portfolio.map((item, index) => (
            <Link href={item.href} className={`work-card work-${index + 1}`} key={item.image}>
              <Image src={item.image} alt={`Пример работы Бирка Маркет: ${item.label}`} fill sizes="(max-width: 700px) 90vw, 45vw" />
              <span>
                <span>{item.label}</span>
                <ArrowDownRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CasesSection eyebrow="05 / КЕЙСЫ" />

      <ProcessParallax />

      <CalculatorBlock />

      <section className="section faq-section">
        <div className="faq-title">
          <span className="section-number">07 / ВОПРОСЫ</span>
          <h2>
            Коротко
            <br />о главном
          </h2>
          <p>
            Не нашли ответ? Напишите в{" "}
            <Link href="/kontakty">контакты</Link> — разберём задачу лично.
          </p>
        </div>
        <Accordion className="faq-list">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={item.q} className="faq-item">
              <AccordionTrigger className="faq-trigger">
                <span>0{index + 1}</span>
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="faq-content">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <YandexMap eyebrow="08 / КАК НАС НАЙТИ" />
    </>
  );
}
