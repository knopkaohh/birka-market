import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { CasesSection } from "@/components/cases-section";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Производство бирок и этикеток для одежды с логотипом на заказ в Москве — оптом",
  description:
    "Бирка Маркет — производитель бирок, упаковки, мерча и полиграфии в Москве. На заказ, печать оптом, один менеджер на весь тираж.",
  alternates: { canonical: "https://birka-market.ru/o-kompanii" },
};

const steps = [
  {
    n: "01",
    title: (
      <>
        Имя и <em>знак</em>
      </>
    ),
    text: "Присылайте логотип. Смотрим, как знак ляжет на жаккард, сатин, силикон или картон: что останется читаемым с полуметра, а что на узкой ленте сольётся.",
  },
  {
    n: "02",
    title: (
      <>
        Состав и <em>уход</em>
      </>
    ),
    text: "Размер и состав стоят в шве. Подбираем мягкий материал и сгиб, который не торчит и не закрывает размер.",
  },
  {
    n: "03",
    title: (
      <>
        Бирка <em>снаружи</em>
      </>
    ),
    text: "Жаккард на горловине, хлопок на белье, силикон на спорте, картонный ярлык на рукаве. Это первое, что берут в примерочной.",
  },
  {
    n: "04",
    title: (
      <>
        Пакет и <em>коробка</em>
      </>
    ),
    text: "Пакет, вкладыш, коробка. Крафт, бумагу, ZIP или ПВД выбираем под изделие, чтобы комплект выглядел одной маркой и дома.",
  },
  {
    n: "05",
    title: (
      <>
        Фурнитура и <em>мерч</em>
      </>
    ),
    text: "Пуллер, резинка, патч, стикер, визитка. Собираем вместе с тиражом, чтобы сроки не разъехались по разным производствам.",
  },
  {
    n: "06",
    title: (
      <>
        Проверка <em>тиража</em>
      </>
    ),
    text: "Смотрим размер, цвет, читаемость и край. За брак отвечаем сами. Готовый комплект можно забрать на Строительном проезде или отправить по Москве и России.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <div className="inner-page about-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "О компании" }]} />
          <span className="section-number">О КОМПАНИИ</span>
          <h1>
            Собираем бренд <br />
            <em>с нуля</em>
          </h1>
          <p>
            Бирка Маркет больше 10 лет делает маркировку и упаковку на своём производстве в Москве. Один менеджер ведёт
            заказ целиком: бирки, состав, ярлыки, пакеты, фурнитура, мерч, полиграфия и сайт.
          </p>
        </div>
        <figure className="about-cover">
          <Image
            src="/images/company/cover.jpg"
            alt="Склад готовых лент и бирок на производстве Бирка Маркет"
            fill
            sizes="(max-width: 900px) 100vw, 1380px"
            priority
          />
          <figcaption>Производственный склад: готовые ленты, составники и бирки под тираж</figcaption>
        </figure>
        <div className="stat-row">
          <div>
            <strong>более 10 лет</strong>
            <span>своё производство в Москве</span>
          </div>
          <div>
            <strong>{company.brands}</strong>
            <span>брендов: бирки, упаковка и мерч</span>
          </div>
          <div>
            <strong>{company.labels}</strong>
            <span>бирок и этикеток с нашего производства</span>
          </div>
          <div>
            <strong>{company.kinds}</strong>
            <span>видов продукции: от ленты до сайта</span>
          </div>
        </div>

        <section className="about-story" aria-labelledby="about-story-title">
          <div>
            <span className="section-number">С НУЛЯ</span>
            <h2 id="about-story-title">
              От знака в файле
              <br />
              до готового <em>комплекта</em>
            </h2>
          </div>
          <div>
            <p>
              Часто приходят, когда есть название и логотип, а коллекции на полке ещё нет. Нужны бирка, состав, ярлык,
              пакет и всё, что едет вместе с изделием.
            </p>
            <p>
              Берём то, что уже решено: имя, знак и состав ткани. Из этого делаем предметы, которые можно вшить,
              повесить и упаковать. Если знак не читается на узкой ленте, скажем до запуска.
            </p>
          </div>
        </section>

        <div className="about-cards">
          {steps.map((item) => (
            <article key={item.n}>
              <span>{item.n}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <section className="about-block" aria-labelledby="about-promise-title">
          <span className="section-number">КАК РАБОТАЕМ</span>
          <h2 id="about-promise-title">
            Как ведём
            <br />
            каждый <em>заказ</em>
          </h2>
        </section>
        <div className="about-cards">
          <article>
            <h2>
              Качество до <em>запуска</em>
            </h2>
            <p>
              Сверяем размер, цвет, читаемость и край с вашим файлом. Тираж стартует после подтверждения. Если ушла
              ошибка с нашей стороны, это наша ответственность.
            </p>
          </article>
          <article>
            <h2>
              Один <em>менеджер</em>
            </h2>
            <p>
              Отвечает за {company.replyIn} в рабочее время. На первой партии технолог подскажет материал. Достаточно
              сказать, что производите и куда встанет бирка.
            </p>
          </article>
          <article>
            <h2>
              Всё в одном <em>месте</em>
            </h2>
            <p>
              Бирки, упаковка, фурнитура, нанесение, полиграфия и сайт делаем у себя. Срок один, поставка одна: со
              склада на Строительном проезде или доставкой по Москве и России.
            </p>
          </article>
        </div>

        <p className="about-close">
          {company.brands} брендов уже собрали с нами комплект: от первой ленты до тиража, который узнают по бирке и{" "}
          <em>упаковке</em>.
        </p>

        <CasesSection eyebrow="КЕЙСЫ" compact />
        <p className="inner-note">
          Нужно обсудить задачу напрямую? Перейдите в <Link href="/kontakty">контакты</Link> или оставьте заявку ниже.
        </p>
      </div>
      <CalculatorBlock
        title={"Оставьте\nзаявку"}
        lead={`Напишите, что производите и что нужно собрать: бирки, упаковку, мерч, полиграфию или сайт. Менеджер ответит за ${company.replyIn} и назовёт срок и сумму.`}
      />
    </>
  );
}
