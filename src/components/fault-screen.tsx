import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "@/components/logo";

export function FaultScreen({
  code,
  title,
  titleEm,
  text,
  onRetry,
}: {
  code: string;
  title: string;
  titleEm: string;
  text: string;
  onRetry?: () => void;
}) {
  return (
    <section className="fault-stage">
      <span className="fault-scrap scrap-a">БИРКА</span>
      <span className="fault-scrap scrap-b">МАРКЕТ</span>
      <span className="fault-scrap scrap-c">с 2017</span>
      <article className="fault-tag">
        <LogoMark className="fault-logo" />
        <p className="fault-brand">Бирка Маркет</p>
        <p className="fault-code" aria-hidden="true">
          {code}
        </p>
        <h1>
          {title} <em>{titleEm}</em>
        </h1>
        <p>{text}</p>
        <div className="fault-actions">
          <Link className="primary-cta" href="/">
            На главную
            <ArrowRight size={18} />
          </Link>
          <Link className="ghost-cta" href="/katalog">
            В каталог
          </Link>
          {onRetry && (
            <button className="fault-retry" type="button" onClick={onRetry}>
              Попробовать снова
            </button>
          )}
        </div>
      </article>
    </section>
  );
}
