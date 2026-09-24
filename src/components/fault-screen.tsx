import Link from "next/link";

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
      <p className="fault-brand">Бирка Маркет</p>
      <p className="fault-code">{code}</p>
      <h1>
        {title} <em>{titleEm}</em>
      </h1>
      <p className="fault-text">{text}</p>
      <div className="fault-actions">
        <Link href="/">На главную</Link>
        <Link href="/katalog">В каталог</Link>
        {onRetry && (
          <button type="button" onClick={onRetry}>
            Попробовать снова
          </button>
        )}
      </div>
    </section>
  );
}
