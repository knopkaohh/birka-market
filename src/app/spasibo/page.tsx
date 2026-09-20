import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Заявка отправлена",
};

export default function ThanksPage() {
  return (
    <div className="thanks-page">
      <CircleCheck />
      <h1>Заявка принята</h1>
      <p>
        Менеджер свяжется в рабочее время, уточнит параметры и подготовит расчёт. Если задача срочная, позвоните:
        {" "}
        <a href={company.phoneHref}>{company.phone}</a>
      </p>
      <div className="hero-actions">
        <Link className="primary-cta" href="/katalog">
          Вернуться в каталог
        </Link>
        <Link className="text-link" href="/">
          На главную
        </Link>
      </div>
    </div>
  );
}
