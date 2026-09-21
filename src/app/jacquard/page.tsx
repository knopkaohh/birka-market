import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LeadForm } from "@/components/lead-form";
import { ProductCard } from "@/components/product-card";
import {
  jacquardChecks,
  jacquardComplement,
  jacquardFaq,
  jacquardFit,
  jacquardGallery,
  jacquardOnProduct,
  jacquardQuotes,
  jacquardReasons,
  jacquardSpecs,
  jacquardSteps,
  jacquardVariants,
} from "@/lib/jacquard";
import { company, getProduct } from "@/lib/site";

export const metadata: Metadata = {
  title: "Жаккардовые бирки с логотипом на заказ",
  description:
    "Тканые жаккардовые бирки от 100 штук: стандарт, петелька, флаг и объём. Бесплатный технический макет, производство в Москве, доставка по России.",
};

type Search = { variant?: string };

export default async function JacquardPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { variant } = await searchParams;
  const related = jacquardComplement.map((slug) => getProduct(slug)).filter(Boolean);

  return (
    <>
      <section className="jq-hero">
        <div className="jq-hero-copy">
          <Breadcrumbs
            items={[
              { href: "/katalog", label: "Продукция" },
              { href: "/katalog/vshivnye-birki", label: "Вшивные бирки" },
              { label: "Жаккардовые бирки" },
            ]}
          />
          <span className="eyebrow">
            <span />
            Тканый логотип • Тираж от 100 шт.
          </span>
          <h1>
            Жаккардовые бирки
            <br />
            с логотипом <em>на заказ</em>
          </h1>
          <p>
            Ткём бирку на станке, а не печатаем по ленте. Логотип остаётся читаемым после стирок, край не сыпется,
            макет готовим бесплатно. Подскажем сгиб под ваше изделие и посчитаем тираж.
          </p>
          <div className="hero-actions">
            <a className="primary-cta" href="#calc">
              Рассчитать стоимость
              <ArrowRight size={19} />
            </a>
            <a className="ghost-cta" href="#variants">
              Подобрать вариант
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <strong>от 100</strong>
              <span>штук в тираже</span>
            </div>
            <div>
              <strong>4–6</strong>
              <span>рабочих дней</span>
            </div>
            <div>
              <strong>0 ₽</strong>
              <span>технический макет</span>
            </div>
          </div>
        </div>
        <div className="jq-hero-visual">
          <div className="jq-hero-main">
            <Image src="/images/products/jacquard.jpg" alt="Жаккардовые бирки ATELIER" fill sizes="(max-width: 900px) 100vw, 50vw" priority />
          </div>
          <div className="jq-hero-small">
            <Image src="/images/jacquard/g1.jpg" alt="Объёмные жаккардовые бирки" fill sizes="280px" />
          </div>
          <div className="jq-hero-mid">
            <Image src="/images/jacquard/g5.jpg" alt="Цветные тканые бирки" fill sizes="240px" />
          </div>
        </div>
      </section>

      <section className="jq-section" id="variants">
        <div className="jq-heading">
          <span className="section-number">01 / КОНСТРУКЦИЯ</span>
          <h2>Выберите вариант жаккардовой бирки</h2>
          <p>Четыре базовых сгиба. Если не уверены — опишите изделие, подберём сами.</p>
        </div>
        <div className="jq-variants">
          {jacquardVariants.map((item) => (
            <article className={`jq-variant is-${item.tone}`} key={item.id}>
              <div className="jq-variant-photo">
                <Image src={item.image} alt={item.name} fill sizes="280px" />
              </div>
              <span>{item.fold}</span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <Link href={`/jacquard?variant=${item.id}#calc`}>
                Рассчитать этот вариант
                <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-section" id="works">
        <div className="jq-heading">
          <span className="section-number">02 / РАБОТЫ</span>
          <h2>Жаккардовые бирки, которые мы изготавливаем</h2>
          <p>Реальные тиражи: двухцветные, плотные, с мелким текстом и контрастной кромкой.</p>
        </div>
        <div className="jq-gallery">
          {jacquardGallery.map((item) => (
            <figure key={item.src}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 50vw, 25vw" />
            </figure>
          ))}
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">03 / ОРИЕНТИР</span>
          <h2>Примеры расчёта жаккардовых бирок</h2>
          <p>Это ориентиры для типовых задач. Точную сумму менеджер подтвердит после макета и цветов.</p>
        </div>
        <div className="jq-quotes">
          {jacquardQuotes.map((item) => (
            <article key={item.qty}>
              <strong>{item.price}</strong>
              <span>за штуку</span>
              <ul>
                <li>{item.qty}</li>
                <li>{item.size}</li>
                <li>{item.spec}</li>
                <li>{item.time}</li>
              </ul>
              <a href="#calc">Запросить такой расчёт</a>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-calc" id="calc">
        <div className="jq-calc-intro">
          <span className="section-number">04 / РАСЧЁТ</span>
          <h2>
            Рассчитайте стоимость
            <br />
            жаккардовых бирок
          </h2>
          <p>
            Можно не знать точный размер. Оставьте телефон и логотип — уточним сгиб, цвета и назовём стоимость
            в рабочее время {company.hours}.
          </p>
          <ul>
            <li>
              <Check size={16} /> Тираж от 100 штук
            </li>
            <li>
              <Check size={16} /> Макет бесплатно
            </li>
            <li>
              <Check size={16} /> Производство в Москве
            </li>
          </ul>
        </div>
        <LeadForm key={variant ?? "standard"} defaultProduct="jacquard" details defaultVariant={variant} compact />
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">05 / ПОЧЕМУ ЖАККАРД</span>
          <h2>Почему бренды выбирают жаккард</h2>
        </div>
        <div className="jq-reasons">
          {jacquardReasons.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-tech">
        <div className="jq-heading">
          <span className="section-number">06 / ПАРАМЕТРЫ</span>
          <h2>Технические возможности</h2>
        </div>
        <div className="jq-specs">
          {jacquardSpecs.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">07 / ПОДБОР</span>
          <h2>Какой вариант подойдёт вашему изделию</h2>
        </div>
        <div className="jq-fit">
          {jacquardFit.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">08 / НА ИЗДЕЛИИ</span>
          <h2>Прикрепите бирку к своему изделию</h2>
          <p>Место вшива меняет и конструкцию, и ощущение на теле. Три рабочие схемы.</p>
        </div>
        <div className="jq-onproduct">
          {jacquardOnProduct.map((item) => (
            <figure key={item.title}>
              <div>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 90vw, 30vw" />
              </div>
              <figcaption>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="jq-process">
        <div className="jq-heading">
          <span className="section-number light">09 / ПРОЦЕСС</span>
          <h2>От заявки до готового тиража</h2>
        </div>
        <div className="jq-steps">
          {jacquardSteps.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-terms">
        <div className="jq-heading">
          <span className="section-number light">10 / УСЛОВИЯ</span>
          <h2>Условия для спокойного запуска</h2>
        </div>
        <div className="jq-term-grid">
          <article>
            <strong>4–6</strong>
            <span>рабочих дней после макета</span>
          </article>
          <article>
            <strong>0 ₽</strong>
            <span>технический макет</span>
          </article>
          <article>
            <strong>от 100</strong>
            <span>штук минимальный тираж</span>
          </article>
          <article>
            <strong>Москва</strong>
            <span>производство и контроль</span>
          </article>
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">11 / КОНТРОЛЬ</span>
          <h2>Проверяем не только внешний вид</h2>
        </div>
        <div className="jq-checks">
          {jacquardChecks.map((item) => (
            <article key={item.title}>
              <Check />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jq-section">
        <div className="jq-heading">
          <span className="section-number">12 / КОМПЛЕКТ</span>
          <h2>Дополните комплект</h2>
          <p>Жаккард на горловине часто идёт вместе с составником, навесной биркой и упаковкой.</p>
        </div>
        <div className="product-grid">
          {related.map((item, index) => item && <ProductCard key={item.slug} product={item} index={index} />)}
        </div>
      </section>

      <section className="jq-section jq-faq">
        <div className="jq-heading">
          <span className="section-number">13 / FAQ</span>
          <h2>Вопросы и ответы</h2>
        </div>
        <Accordion className="faq-list">
          {jacquardFaq.map((item, index) => (
            <AccordionItem value={`jq-${index}`} key={item.q} className="faq-item">
              <AccordionTrigger className="faq-trigger">
                <span>0{index + 1}</span>
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="faq-content">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="jq-final">
        <div>
          <span className="section-number">14 / ЗАЯВКА</span>
          <h2>
            Рассчитайте бирки
            <br />
            для вашей коллекции
          </h2>
          <p>Пришлите логотип и тираж — ответим в рабочее время и подготовим макет до запуска.</p>
        </div>
        <a className="primary-cta" href="#calc">
          Рассчитать стоимость
          <ArrowRight />
        </a>
      </section>
    </>
  );
}
