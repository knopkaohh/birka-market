import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalculatorBlock } from "@/components/calculator-block";
import { YandexMap } from "@/components/yandex-map";
import { categories, company, faqItems } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero hero-atmosphere">
        <Image
          src="/images/company/cover.jpg"
          alt="Производственный склад Бирка Маркет: ленты и готовые бирки"
          width={1280}
          height={960}
          priority
          sizes="100vw"
          className="hero-bg"
        />
        <div className="hero-scrim" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            Производим в Москве • Доставляем по России
          </div>
          <h1 className="type-display">
            Бирки, упаковка
            <br />
            и мерч <em>на заказ</em>
          </h1>
          <p className="hero-lead type-body">
            Ваш бренд, наша забота. Производим в Москве: от бесплатного макета до готового тиража.
            Поможем выбрать материал и рассчитаем заказ.
          </p>
          <div className="hero-actions">
            <Link className="primary-cta" href="/raschet">
              Рассчитать заказ
              <ArrowRight size={19} />
            </Link>
            <Link className="text-link" href="/katalog">
              Смотреть каталог
              <ArrowDownRight size={18} />
            </Link>
            <Link className="text-link" href="/kak-vybrat">
              Как выбрать?
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
              <span>макет для печати</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-number">01 / КАТАЛОГ</span>
            <h2 className="type-title">
              Всё для маркировки, упаковки
              <br />и полиграфии
            </h2>
          </div>
          <p className="type-body">Семь направлений. Выберите задачу, остальное уточним вместе.</p>
        </div>
        <div className="category-list">
          {categories.map((item, index) => (
            <Link className="category-text" href={`/katalog/${item.slug}`} key={item.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.name}</h3>
              <p>{item.intro}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="dark-section">
        <div className="dark-intro">
          <span className="section-number light">02 / ПОЧЕМУ МЫ</span>
          <p className="display-quote type-title">
            Не просто печатаем бирки. <em>Вникаем в задачу</em> и отвечаем за результат — от первого файла до последней детали тиража.
          </p>
        </div>
        <div className="advantages">
          {[
            ["01", "Свой дизайнер", "Бесплатно адаптирует логотип и подготовит макет для печати."],
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

      <CalculatorBlock />

      <section className="section faq-section">
        <div className="faq-title">
          <span className="section-number">03 / ВОПРОСЫ</span>
          <h2 className="type-title">
            Коротко
            <br />о главном
          </h2>
          <p className="type-body">
            Не нашли ответ? Напишите в <Link href="/kontakty">контакты</Link> — разберём задачу лично.
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
