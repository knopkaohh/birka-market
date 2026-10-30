import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GoldRun } from "@/components/gold-run";
import { JobApplication, JobsMotion, JobsReveal } from "@/components/job-application";

export const metadata: Metadata = {
  title: "Работа у нас",
  description:
    "Команда БИРКА МАРКЕТ. Полный цикл для бренда: бирки, упаковка, полиграфия, мерч и сайты. Расширяем команду и ждём отклик.",
};

const expectations = [
  "Для нас энергия, горящие глаза и желание развиваться важнее, чем огромный стаж и десятки лет опыта. Если есть стремление — всему научим и поможем адаптироваться на старте!",
  "Тех, кто любит живое общение с людьми и умеет слышать клиента.",
  "Внимательных к мелочам, качеству и эстетике брендов.",
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
        <div className="jobs-hero-copy">
          <Breadcrumbs items={[{ label: "Работа у нас" }]} />
          <span className="section-number">КОМАНДА</span>
          <h1>
            Команда
            <br />
            <em>БИРКА МАРКЕТ</em>
          </h1>
          <p>БИРКА МАРКЕТ — производитель комплексных решений для брендов одежды и бизнеса.</p>
          <p>Мы создаём бирки, упаковку, полиграфию, мерч, корпоративную продукцию и сайты. С нуля сделаем ваш бренд.</p>
          <p>Наш проект активно растёт и масштабируется, поэтому мы расширяем команду и ищем близких по духу людей!</p>
          <a className="jobs-down" href="#otklik">
            Оформить отклик
            <ChevronDown size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="jobs-hero-panel" id="otklik">
          <div className="gold-frame">
            <GoldRun items={jobLines} />
            <JobApplication part="form" />
            <GoldRun items={jobLines} reverse />
          </div>
        </div>
      </section>

      <GoldRun items={jobLines} />

      <section className="jobs-expect" aria-labelledby="jobs-expect-title">
        <JobsReveal as="h2" id="jobs-expect-title">
          Кого мы ждём
        </JobsReveal>
        <ul className="jobs-cards">
          {expectations.map((text, index) => (
            <JobsReveal as="li" className="jobs-card" delay={index} key={text}>
              <span>0{index + 1}</span>
              {text}
            </JobsReveal>
          ))}
        </ul>
      </section>

      <JobApplication part="direct" />
    </JobsMotion>
  );
}
