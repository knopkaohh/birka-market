"use client";

import Link from "next/link";
import { CircleCheck, Phone } from "lucide-react";
import { CalcResponder } from "@/components/calc-responder";
import { messengerLinks } from "@/components/messengers";
import { company } from "@/lib/site";

export function ThanksCard({
  onClose,
}: {
  onClose?: () => void;
}) {
  return (
    <div
      className="thanks-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="thanks-title"
      onClick={(event) => event.stopPropagation()}
    >
      {onClose ? (
        <button type="button" className="thanks-close" onClick={onClose} aria-label="Закрыть" autoFocus>
          ×
        </button>
      ) : null}
      <CircleCheck />
      <h1 id="thanks-title">
        Спасибо
        <br />
        <em>за заявку</em>
      </h1>
      <p>
        Мы получили обращение и уже передали его менеджеру. Ответим в течение 2 рабочих часов
        в {company.hours}. Если задача срочная — позвоните или напишите в мессенджер.
      </p>
      <CalcResponder light />
      <div className="thanks-messengers">
        {messengerLinks.map(({ id, href, label, tone, Icon }) => (
          <a
            key={id}
            className={`header-msg is-${tone}`}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Написать в ${label}`}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
      <div className="thanks-actions">
        <a className="primary-cta" href={company.phoneHref}>
          <Phone size={18} />
          Позвонить
        </a>
        {onClose ? (
          <button type="button" className="text-link" onClick={onClose}>
            Вернуться на сайт
          </button>
        ) : (
          <Link className="text-link" href="/katalog">
            Смотреть каталог
          </Link>
        )}
      </div>
    </div>
  );
}
