import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GoldRun } from "@/components/gold-run";
import { JobApplication, JobsMotion } from "@/components/job-application";

export const metadata: Metadata = {
  title: "Работа у нас",
  description:
    "Команда БИРКА МАРКЕТ. Полный цикл для бренда: бирки, упаковка, полиграфия, мерч и сайты. Расширяем команду и ждём отклик.",
};

const seekers = [
  {
    n: "01",
    text: (
      <>
        <strong>Энергия</strong>, горящие глаза и желание развиваться важнее, чем огромный стаж. Есть стремление —{" "}
        <span className="jobs-line">всему научим</span> и поможем на старте.
      </>
    ),
  },
  {
    n: "02",
    text: (
      <>
        Тех, кто любит <strong>живое общение</strong> и умеет <span className="jobs-line">слышать клиента</span>.
      </>
    ),
  },
  {
    n: "03",
    text: (
      <>
        Внимательных к <strong>мелочам</strong>, качеству и <span className="jobs-line">эстетике брендов</span>.
      </>
    ),
  },
];

const jobLines = [
  "КОМАНДА БИРКА МАРКЕТ",
  "ГОРЯЩИЕ ГЛАЗА ВАЖНЕЕ СТАЖА",
  "НАУЧИМ НА СТАРТЕ",
  "СЛЫШАТЬ КЛИЕНТА",
  "ПОЛНЫЙ ЦИКЛ",
];

export default function JobsPage() {
  return (
    <JobsMotion>
      <section className="jobs-hero">
        <div className="jobs-seek">
          <span className="section-number">КОГО МЫ ИЩЕМ</span>
          <h2>
            Люди, с которыми
            <br />
            <em>хочется работать</em>
          </h2>
          <ol>
            {seekers.map((item) => (
              <li key={item.n}>
                <b>{item.n}</b>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="jobs-hero-copy">
          <Breadcrumbs items={[{ label: "Работа у нас" }]} />
          <span className="section-number">КОМАНДА</span>
          <h1>
            Команда
            <br />
            <em>БИРКА МАРКЕТ</em>
          </h1>
          <p>
            <strong className="jobs-gold">БИРКА МАРКЕТ</strong> — производитель комплексных решений для брендов одежды и
            бизнеса.
          </p>
          <p>
            Мы создаём <strong>бирки</strong>, <span className="jobs-line">упаковку</span>, полиграфию,{" "}
            <strong>мерч</strong>, корпоративную продукцию и <strong className="jobs-gold">сайты</strong>.{" "}
            <em>С нуля сделаем ваш бренд.</em>
          </p>
          <p>
            Проект <strong>активно растёт</strong>. Расширяем команду и ищем{" "}
            <span className="jobs-line">близких по духу</span> людей.
          </p>
          <a className="jobs-down" href="#otklik">
            Форма отклика
            <ChevronDown size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <GoldRun items={jobLines} />

      <section className="jobs-form-block" id="otklik">
        <span className="section-number">ФОРМА ОТКЛИКА</span>
        <h2>Оставьте отклик</h2>
        <p>Имя, город, возраст и короткий рассказ. Номер можно указать любой.</p>
        <div className="gold-frame">
          <GoldRun items={jobLines} />
          <JobApplication part="form" />
          <GoldRun items={jobLines} reverse />
        </div>
      </section>

      <div className="jobs-after">
        <JobApplication part="direct" />
      </div>
    </JobsMotion>
  );
}
