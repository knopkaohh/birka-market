import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cases, company } from "@/lib/site";

export function CasesSection({
  eyebrow = "05 / КЕЙСЫ",
  compact = false,
}: {
  eyebrow?: string;
  compact?: boolean;
}) {
  return (
    <section className={`cases-section ${compact ? "is-compact" : "section"}`}>
      <div className="section-heading compact">
        <div>
          <span className="section-number">{eyebrow}</span>
          <h2>
            Типовые задачи,
            <br />
            которые закрываем тиражом
          </h2>
        </div>
        <p>
          Не выдуманные отзывы, а реальные типы заказов с производства. Адрес и рейтинг — в{" "}
          <a href={company.map.route} target="_blank" rel="noreferrer">
            Яндекс Картах
          </a>
          .
        </p>
      </div>
      <div className="cases-grid">
        {cases.map((item) => (
          <article key={item.slug} className="case-card">
            <Link href={`/${item.slug}`} className="case-photo">
              <Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 90vw, 33vw" />
            </Link>
            <div className="case-copy">
              <span>{item.tag}</span>
              <h3>
                <Link href={`/${item.slug}`}>{item.title}</Link>
              </h3>
              <p>{item.text}</p>
              <Link href={`/${item.slug}#calc`} className="case-cta">
                Рассчитать заказ
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
