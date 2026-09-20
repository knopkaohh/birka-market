import Link from "next/link";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <Link href="/">Главная</Link>
      {items.map((item) => (
        <span key={item.label}>
          <i>/</i>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
        </span>
      ))}
    </nav>
  );
}
