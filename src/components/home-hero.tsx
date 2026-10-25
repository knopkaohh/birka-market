"use client";

import Image from "next/image";
import Link from "next/link";
import { Factory, MessageCircle, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { openQuickCalc } from "@/components/quick-calc";

const rise = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

/** Первый экран: фото склада, заголовок слева, знак чата и три кнопки по центру. */
export function HomeHero() {
  return (
    <section className="home-hero">
      <Image
        src="/images/company/cover.jpg"
        alt="Производственный склад Бирка Маркет: ленты и готовые бирки"
        fill
        priority
        sizes="100vw"
        className="home-hero-photo"
      />
      <div className="home-hero-scrim" aria-hidden="true" />
      <div className="home-hero-copy">
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={rise}>
          Производство бирок, пакетов, упаковки, мерча и полиграфии
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...rise, delay: 0.12 }}
        >
          Посчитаем тираж и подскажем материал.
        </motion.p>
      </div>
      <div className="home-hero-center">
        <MessageCircle className="home-hero-mark" size={42} strokeWidth={1.4} aria-hidden="true" />
        <div className="home-hero-actions">
          <button type="button" className="hero-btn hero-btn-fill" onClick={() => openQuickCalc()}>
            <Timer size={18} aria-hidden="true" />
            Быстрый расчёт
          </button>
          <Link className="hero-btn hero-btn-ghost" href="/raschet">
            Скидки от тиража
          </Link>
          <Link className="hero-btn hero-btn-fill" href="/o-kompanii">
            <Factory size={18} aria-hidden="true" />
            Своё производство
          </Link>
        </div>
      </div>
    </section>
  );
}
