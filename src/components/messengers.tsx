import { MaxGlyph, MaxIcon, TelegramIcon, VkIcon, WhatsAppIcon } from "@/components/messenger-icons";
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

const headerMessengerLinks = [
  messengerLinks[1],
  messengerLinks[2],
  {
    id: "vk",
    href: company.vk,
    label: "ВКонтакте",
    tone: "vk",
    Icon: VkIcon,
  },
] as const;

export function HeaderMessengers() {
  return (
    <div className="header-messengers">
      {headerMessengerLinks.map(({ id, href, label, tone, Icon }) => (
        <a
          key={id}
          className={`header-msg is-${tone}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={id === "max" ? `Написать в Макс: ${company.maxPhone}` : `Написать в ${label}`}
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
      {messengerLinks.map(({ id, href, label, Icon }) => {
        const Mark = id === "max" ? MaxGlyph : Icon;
        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={id === "max" ? `Написать в Макс: ${company.maxPhone}` : `Написать в ${label}`}
          >
            <Mark size={16} />
          </a>
        );
      })}
    </div>
  );
}
