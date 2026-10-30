"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, ChevronDown, Gem, Play, ShieldCheck, Truck, X } from "lucide-react";

const rise = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

const points = [
  { icon: Gem, label: "Собственное производство" },
  { icon: BadgePercent, label: "Скидки от тиража" },
  { icon: ShieldCheck, label: "Контроль качества" },
  { icon: Truck, label: "Быстрый расчёт и доставка" },
];

/** Первый экран: текущее видео на всю область, текст как на макете. */
export function HomeHero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const dialogVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const video = dialogVideo.current;
    if (video) {
      video.muted = true;
      void video.play().catch(() => {});
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  const scrollNext = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("posle-hero")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

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
      <motion.div
        className="home-hero-copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={rise}
      >
        <p className="home-hero-kicker">Производство изделий с вашим дизайном</p>
        <h1>
          <span>Производство</span>
          бирок, пакетов, упаковки, мерча и полиграфии
        </h1>
        <p>Качественная продукция, современные технологии и полный цикл производства в Москве</p>
        <nav className="home-hero-actions" aria-label="Действия">
          <Link className="hero-btn" href="/raschet">
            Рассчитать заказ
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link className="hero-btn is-ghost" href="/katalog">
            Смотреть каталог
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </nav>
        <ul className="home-hero-points">
          {points.map((item) => (
            <li key={item.label}>
              <item.icon size={22} strokeWidth={1.75} aria-hidden="true" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      <button type="button" className="home-hero-watch" onClick={() => setVideoOpen(true)}>
        <span className="home-hero-play" aria-hidden="true">
          <Play size={18} fill="currentColor" />
        </span>
        Смотреть видео
      </button>
      <button type="button" className="home-hero-scroll" onClick={scrollNext}>
        Листайте вниз
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {videoOpen ? (
        <div className="hero-video-layer" role="dialog" aria-modal="true" aria-label="Видео производства">
          <button type="button" className="hero-video-backdrop" aria-label="Закрыть видео" onClick={() => setVideoOpen(false)} />
          <div className="hero-video-frame">
            <video ref={dialogVideo} src="/video/hero.mp4" controls playsInline poster="/images/hero-poster.jpg" />
            <button type="button" className="hero-video-close" onClick={() => setVideoOpen(false)} aria-label="Закрыть">
              <X size={18} />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
