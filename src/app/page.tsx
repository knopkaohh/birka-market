import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronRight,
  CircleCheck,
  MessageCircle,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalculatorBlock } from "@/components/calculator-block";
import { Loader } from "@/components/loader";
import { Marquee } from "@/components/marquee";
import { ProductCard } from "@/components/product-card";
import { YandexMap } from "@/components/yandex-map";
import {
  categories,
  company,
  faqItems,
  featuredSlugs,
  getProduct,
  portfolio,
  processSteps,
} from "@/lib/site";

export default function Home() {
  const featured = featuredSlugs.map((slug) => getProduct(slug)).filter(Boolean);

  return (
    <>
      <Loader />
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            Производим в Москве • Доставляем по России
          </div>
          <h1>
            Ваш бренд -
            <br />
            наша <em>забота!</em>
          </h1>
          <p className="hero-lead">
            Бирки, упаковка, фурнитура, мерч и полиграфия — от бесплатного макета до готового тиража.
            Поможем выбрать материал и рассчитаем заказ.
          </p>
          <div className="hero-actions">
            <Link className="primary-cta" href="/raschet">
              Рассчитать стоимость
              <ArrowRight size={19} />
            </Link>
            <Link className="text-link" href="/katalog">
              Смотреть каталог
              <ArrowDownRight size={18} />
            </Link>
          </div>
          <div className="hero-proof">
            <div>
              <strong>с {company.since}</strong>
              <span>на рынке</span>
            </div>
            <div>
              <strong>{company.brands}</strong>
              <span>брендов</span>
            </div>
            <div>
              <strong>0 ₽</strong>
              <span>технический макет</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" aria-label="Примеры изготовленных бирок">
          <div className="hero-yellow-shape" />
          <div className="floating-note note-one">
            <Sparkles size={16} />
            Реальные работы
          </div>
          <div className="photo-card photo-main">
            <Image
              src="/images/products/jacquard.jpg"
              alt="Жаккардовые бирки, изготовленные Бирка Маркет"
              fill
              sizes="(max-width: 900px) 80vw, 35vw"
              priority
            />
          </div>
          <div className="photo-card photo-small">
            <Image src="/images/products/cotton.jpg" alt="Хлопковые бирки с логотипом" fill sizes="220px" />
          </div>
          <div className="quality-stamp">
            <span>с 2017</span>
            <small>
              заботимся
              <br />о брендах
            </small>
          </div>
          <div className="scroll-cue">
            <span>Листайте</span>
            <ArrowDownRight />
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-number">01 / КАТАЛОГ</span>
            <h2>
              Всё для маркировки
              <br />и упаковки бренда
            </h2>
          </div>
          <p>Семь направлений — от вшивной бирки до мерча и полиграфии. Выберите задачу, остальное уточним вместе.</p>
        </div>
        <div className="category-grid">
          {categories.map((item, index) => (
            <Link className="category-tile" href={`/katalog/${item.slug}`} key={item.slug}>
              <span>0{index + 1}</span>
              <h3>{item.name}</h3>
              <p>{item.intro}</p>
              <em>
                Смотреть
                <ArrowRight />
              </em>
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
          {featured.map((item, index) => item && <ProductCard key={item.slug} product={item} index={index} />)}
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
            Нужна помощь
            <ArrowRight />
          </Link>
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
            ["01", "Свой дизайнер", "Бесплатно адаптирует логотип и подготовит технический макет."],
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
            <figure className={`work-card work-${index + 1}`} key={item.image}>
              <Image src={item.image} alt={`Пример работы Бирка Маркет: ${item.label}`} fill sizes="(max-width: 700px) 90vw, 45vw" />
              <figcaption>
                <span>{item.label}</span>
                <ArrowDownRight />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-photo">
          <Image src="/images/process.jpg" alt="Процесс производства и контроля продукции" fill sizes="(max-width: 900px) 100vw, 45vw" />
          <div className="process-photo-label">
            <PackageCheck />
            <span>
              Контролируем
              <br />
              каждый тираж
            </span>
          </div>
        </div>
        <div className="process-content">
          <span className="section-number">05 / КАК МЫ РАБОТАЕМ</span>
          <h2>
            Понятный путь
            <br />
            от идеи до тиража
          </h2>
          <div className="steps">
            {processSteps.map(([title, text], index) => (
              <div className="step" key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                {index === 3 ? <CircleCheck /> : <ChevronRight />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CalculatorBlock />

      <section className="section faq-section">
        <div className="faq-title">
          <span className="section-number">06 / ВОПРОСЫ</span>
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

      <YandexMap />
    </>
  );
}
