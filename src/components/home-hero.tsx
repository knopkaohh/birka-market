"use client";

import Link from "next/link";
import { Factory, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { openQuickCalc } from "@/components/quick-calc";

const rise = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

/** Первый экран: заголовок по центру видео, в том же крупном наборе, что был у слогана. */
export function HomeHero() {
  return (
    <section className="home-hero">
      <video
        className="home-hero-media"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
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
          Макет бесплатно. Посчитаем тираж и подскажем материал.
        </motion.p>
      </div>
      <motion.div
        className="home-hero-actions"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...rise, delay: 0.2 }}
      >
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
      </motion.div>
    </section>
  );
}
