import { MaxIcon, TelegramIcon, WhatsAppIcon } from "@/components/messenger-icons";
import { company } from "@/lib/site";

export const messengerLinks = [
  {
    id: "whatsapp",
    href: company.whatsapp,
    label: "WhatsApp",
    tone: "wa",
    Icon: WhatsAppIcon,
  },
  {
    id: "telegram",
    href: company.telegram,
    label: "Telegram",
    tone: "tg",
    Icon: TelegramIcon,
  },
  {
    id: "max",
    href: company.max,
    label: "Макс",
    tone: "max",
    Icon: MaxIcon,
  },
] as const;

export function HeaderMessengers() {
  return (
    <div className="header-messengers">
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
  );
}

export function MobileMessengers() {
  return (
    <div className="mobile-messengers" role="group" aria-label="Написать в мессенджер">
      {messengerLinks.map(({ id, href, label, Icon }) => (
        <a key={id} href={href} target="_blank" rel="noreferrer" aria-label={`Написать в ${label}`}>
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
