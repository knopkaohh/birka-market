"use client";

import Link from "next/link";
import { CircleCheck, Phone } from "lucide-react";
import { messengerLinks } from "@/components/messengers";
import { LEAD_GOAL } from "@/lib/lead";
import { company } from "@/lib/site";

export function ThanksCard({
  onClose,
}: {
  onClose?: () => void;
}) {
  return (
    <div
      id="lead-thanks"
      className="thanks-card metrika-goal-lead"
      role="dialog"
      aria-modal="true"
      aria-labelledby="thanks-title"
      data-goal={LEAD_GOAL}
      data-metrika-goal={LEAD_GOAL}
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
        Мы получили обращение. Менеджер свяжется в течение {company.replyIn} в рабочее время {company.hours}.
        Если задача срочная — позвоните или напишите в мессенджер.
      </p>
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
