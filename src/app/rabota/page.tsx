import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobApplication, JobsMotion, JobsReveal } from "@/components/job-application";

export const metadata: Metadata = {
  title: "Работа у нас",
  description:
    "Команда БИРКА МАРКЕТ. Производитель комплексных решений для брендов одежды и бизнеса. Расширяем команду и ждём отклик.",
};

const expectations = [
  "Для нас энергия, горящие глаза и желание развиваться важнее, чем огромный стаж и десятки лет опыта. Если есть стремление — всему научим и поможем адаптироваться на старте!",
  "Тех, кто любит живое общение с людьми и умеет слышать клиента.",
  "Внимательных к мелочам, качеству и эстетике брендов.",
];

export default function JobsPage() {
  return (
    <JobsMotion>
      <JobsReveal className="inner-hero">
        <Breadcrumbs items={[{ label: "Работа у нас" }]} />
        <span className="section-number">КОМАНДА</span>
        <h1>
          Команда
          <br />
          <em>БИРКА МАРКЕТ</em>
        </h1>
        <p>БИРКА МАРКЕТ — производитель комплексных решений для брендов одежды и бизнеса.</p>
        <p>
          Мы создаём бирки, упаковку, полиграфию, мерч, корпоративную продукцию, фурнитуру и различные виды нанесения
          на текстиль.
        </p>
        <p>
          Наш проект активно растёт и масштабируется, поэтому мы расширяем команду и ищем близких по духу людей!
        </p>
      </JobsReveal>

      <section className="jobs-expect" aria-labelledby="jobs-expect-title">
        <JobsReveal as="h2" id="jobs-expect-title">
          Кого мы ждём
        </JobsReveal>
        <ul className="jobs-cards">
          {expectations.map((text, index) => (
            <JobsReveal as="li" className="jobs-card" delay={index} key={text}>
              {text}
            </JobsReveal>
          ))}
        </ul>
      </section>

      <JobApplication />
    </JobsMotion>
  );
}
