import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Документы",
  description: "Реквизиты ИП Федотов Антон Вадимович: ИНН, ОГРНИП и контакты Бирка Маркет.",
};

export default function DocumentsPage() {
  return (
    <div className="inner-page prose-page tone-page">
      <div className="tone-glow" aria-hidden="true" />
      <Breadcrumbs items={[{ label: "Документы" }]} />
      <h1 className="type-title">Документы</h1>
      <p className="type-body">Реквизиты, по которым можно сверить счёт и договор.</p>
      <p>
        {company.legal}
        <br />
        ИНН {company.inn}
        <br />
        ОГРНИП {company.ogrnip}
      </p>
      <p>
        {company.address}
        <br />
        <a href={company.phoneHref}>{company.phone}</a>
        <br />
        <a href={`mailto:${company.email}`}>{company.email}</a>
      </p>
      <p className="type-body">
        Как обрабатываем заявки — в <Link href="/privacy">политике конфиденциальности</Link>.
      </p>
    </div>
  );
}
