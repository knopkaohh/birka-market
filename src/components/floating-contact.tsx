"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Send, X } from "lucide-react";
import { openQuickCalc } from "@/components/quick-calc";
import { company } from "@/lib/site";

/** Круглая кнопка связи справа внизу и короткая панель контактов. */
export function FloatingContact() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={onHome ? "float-contact is-home" : "float-contact"}
        aria-expanded={open}
        aria-label={open ? "Закрыть связь" : "Связаться"}
        onClick={() => setOpen((value) => !value)}
      >
        <MessageCircle size={22} />
      </button>
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            className="float-contact-backdrop"
            aria-label="Закрыть панель связи"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {open ? (
          <motion.aside
            className={onHome ? "float-panel is-home" : "float-panel"}
            role="dialog"
            aria-label="Связаться с Бирка Маркет"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="float-close" aria-label="Закрыть" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
            <a href={company.phoneHref}>
              <Phone size={16} />
              {company.phone}
            </a>
            <a href={company.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a href={company.telegram} target="_blank" rel="noreferrer">
              <Send size={16} />
              Telegram
            </a>
            <a href={`mailto:${company.email}`}>
              <Mail size={16} />
              Почта
            </a>
            <button
              type="button"
              className="float-call"
              onClick={() => {
                setOpen(false);
                openQuickCalc();
              }}
            >
              Заказать звонок
            </button>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
