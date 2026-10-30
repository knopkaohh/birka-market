import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { SoftQuotes } from "@/components/soft-quotes";
import { LabelGuide } from "@/components/label-guide";
import { colorRules, folds, materials, qtyRules } from "@/lib/guide";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Как выбрать бирки: материал, сгиб, цвет и тираж",
  description:
    "Подсказка для тех, кто впервые заказывает бирки: какой материал выбрать, какую подгибку сделать, сколько цветов заложить и какой тираж взять. Ответ за 10 минут.",
  alternates: { canonical: "https://birka-market.ru/kak-vybrat" },
  openGraph: {
    title: "Как выбрать бирки — Бирка Маркет",
    description: "Материал, вид, подгибка, цвета и тираж без отраслевого жаргона.",
    url: "https://birka-market.ru/kak-vybrat",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/images/products/jacquard.jpg", alt: "Жаккардовые бирки" }],
  },
};

export default function GuidePage() {
  return (
    <>
      <div className="inner-page tone-page">
        <div className="tone-glow" aria-hidden="true" />
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Как выбрать" }]} />
          <span className="section-number">КАК ВЫБРАТЬ</span>
          <h1>
            Не знаете, какие бирки нужны —
            <br />
            <em>начните с этой страницы</em>
          </h1>
          <p>
            Обычно нужен комплект: фирменная бирка и составник. Ниже три коротких вопроса, затем материалы, сгибы, цвета
            и тиражи.             Если сомневаетесь, оставьте телефон — разберём за {company.replyIn}.
          </p>
        </div>
        <SoftQuotes
          items={[
            { text: "Сначала задача: где стоит бирка и что на ней должно читаться.", sign: "Материал" },
            { text: "Обычно нужен комплект: фирменная бирка и составник.", sign: "Комплект" },
            { text: `Если сомневаетесь, разберём за ${company.replyIn}.`, sign: "Подскажем" },
          ]}
        />

        <div className="guide-kit">
          <article id="brend">
            <span>01</span>
            <h2>
              Брендовая <em>бирка</em>
            </h2>
            <p>Это лицо бренда. Обычно её ставят на горловину или на флаг изделия. Чаще выбирают жаккард, иногда сатин или силикон.</p>
          </article>
          <article id="sostav">
            <span>02</span>
            <h2>
              Состав и <em>уход</em>
            </h2>
            <p>Здесь состав ткани и правила ухода. Почти всегда сатин или нейлон, один цвет и боковой шов.</p>
          </article>
          <article id="naves">
            <span>03</span>
            <h2>
              Навес, если <em>нужен</em>
            </h2>
            <p>Картон или калька снаружи изделия. Навес не заменяет вшивную бирку: это первое впечатление в зале.</p>
          </article>
        </div>

        <LabelGuide />

        <section className="guide-section" aria-labelledby="guide-materials-title">
          <div className="jq-heading">
            <span className="section-number">МАТЕРИАЛЫ</span>
            <h2 id="guide-materials-title">
              Какой материал выбрать <em>и зачем</em>
            </h2>
            <p>
              Преимущество каждого материала — не «красивое слово», а задача. Если задача не совпадает, бирка будет
              либо колоться, либо выглядеть дешевле изделия.
            </p>
          </div>
          <div className="guide-materials">
            {materials.map((item) => (
              <article key={item.slug}>
                <Link href={`/${item.slug}`} className="guide-material-photo">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 760px) 100vw, 25vw" />
                </Link>
                <div>
                  <h3>
                    <Link href={`/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <p className="guide-advantage">{item.advantage}</p>
                  <p>
                    <strong>Когда брать.</strong> {item.bestFor}.
                  </p>
                  <p>
                    <strong>Когда не брать.</strong> {item.skip.replace(/^если /, "Если ")}.
                  </p>
                  <ul>
                    <li>{item.minQty}</li>
                    <li>{item.time}</li>
                    <li>{item.colors}</li>
                    <li>{item.folds}</li>
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="guide-section" aria-labelledby="guide-folds-title">
          <div className="jq-heading">
            <span className="section-number">ВИД И ПОДГИБКА</span>
            <h2 id="guide-folds-title">
              Какой сгиб поставить <em>в изделие</em>
            </h2>
            <p>
              Подгибка задаёт, как бирку возьмут на производстве. Верный сгиб сидит ровно: не торчит, не натирает и не
              закрывает размер.
            </p>
          </div>
          <div className="guide-folds">
            {folds.map((item, index) => (
              <article key={item.id}>
                <div className="guide-fold-mark" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <span>{item.fold}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <em>{item.use}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="guide-section guide-two" aria-labelledby="guide-colors-title">
          <div>
            <span className="section-number">ЦВЕТА</span>
            <h2 id="guide-colors-title">
              Сколько цветов <em>закладывать</em>
            </h2>
            <div className="guide-notes">
              {colorRules.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <span className="section-number">ТИРАЖ</span>
            <h2 id="guide-qty-title">
              Сколько штук <em>заказывать</em>
            </h2>
            <div className="guide-notes">
              {qtyRules.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <strong>{item.qty}</strong>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <p className="inner-note">
          Уже поняли материал? Откройте{" "}
          <Link href="/katalog/vshivnye-birki">вшивные бирки</Link> или сразу{" "}
          <Link href="/raschet">оставьте заявку</Link>.
          <span className="guide-note-link">
            <Link href="/jacquard">
              Жаккард
              <ArrowDownRight size={14} />
            </Link>
            <Link href="/satin">
              Сатин
              <ArrowDownRight size={14} />
            </Link>
            <Link href="/silikon">
              Силикон
              <ArrowDownRight size={14} />
            </Link>
          </span>
        </p>
        <p className="guide-handoff">
          Если после подбора всё ещё сомневаетесь — внизу форма: менеджер соберёт комплект за 10 минут.
        </p>
      </div>
      <CalculatorBlock
        title="Если после подбора всё ещё сомневаетесь"
        titleAccent="соберём комплект за 10 минут"
        lead="Оставьте телефон. Менеджер соберёт комплект: материал, сгиб, цвета и тираж."
      />
    </>
  );
}
