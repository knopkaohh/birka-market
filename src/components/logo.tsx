import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Бирка Маркет — на главную">
      <span className="logo-mark" aria-hidden="true">БМ</span>
      <span>
        БИРКА
        <br />
        МАРКЕТ
      </span>
    </Link>
  );
}
