"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/** Первый экран: три элемента по центру и спокойный выезд заголовка. */
export function HomeHero() {
  return (
    <section className="home-hero">
      <Image
        src="/images/company/cover.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="home-hero-bg"
      />
      <div className="home-hero-scrim" />
      <motion.div
        className="home-hero-copy"
        initial={{ opacity: 0, x: -40, y: 22 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1>Производство бирок, пакетов, упаковки, мерча и полиграфии</h1>
        <p>Макет бесплатно — посчитаем тираж и подскажем материал.</p>
        <Link className="hero-cta" href="/raschet">
          Рассчитать заказ
        </Link>
      </motion.div>
    </section>
  );
}
