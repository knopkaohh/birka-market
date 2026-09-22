"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, CircleCheck, ChevronRight, PackageCheck } from "lucide-react";
import { processSteps } from "@/lib/site";

const scenes = [
  { image: "/images/work-1.jpg", caption: "Заявки и образцы" },
  { image: "/images/product-jacquard.jpg", caption: "Подбор материала" },
  { image: "/images/work-2.jpg", caption: "Макет для печати" },
  { image: "/images/process.jpg", caption: "Контроль тиража" },
] as const;

export function ProcessParallax() {
  const trackRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const captionRef = useRef<HTMLSpanElement>(null);
  const shotsRef = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 760px)");
    const apply = () => setReduced(motion.matches || mobile.matches);
    apply();
    motion.addEventListener("change", apply);
    mobile.addEventListener("change", apply);
    return () => {
      motion.removeEventListener("change", apply);
      mobile.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    let current = 0;
    const count = processSteps.length;

    const measure = () => {
      const track = trackRef.current;
      if (!track) {
        frame = 0;
        return;
      }
      const total = Math.max(track.offsetHeight - window.innerHeight, 1);
      const passed = Math.min(Math.max(-track.getBoundingClientRect().top, 0), total);
      const progress = passed / total;
      const segment = progress * count;
      const nextIndex = Math.min(count - 1, Math.floor(segment));
      const local = Math.min(1, Math.max(0, segment - nextIndex));

      if (barRef.current) barRef.current.style.width = `${(progress * 100).toFixed(2)}%`;
      const shots = shotsRef.current?.children;
      if (shots) {
        for (let i = 0; i < shots.length; i += 1) {
          const shot = shots[i] as HTMLElement;
          const active = i === nextIndex;
          shot.classList.toggle("is-active", active);
          shot.style.transform = active
            ? `translate3d(0, ${(local * 28 - 10).toFixed(1)}px, 0) scale(1.08)`
            : "";
        }
      }
      if (nextIndex !== current) {
        current = nextIndex;
        const step = processSteps[nextIndex];
        if (numberRef.current) numberRef.current.textContent = `0${nextIndex + 1}`;
        if (titleRef.current && step) titleRef.current.textContent = step[0];
        if (textRef.current && step) textRef.current.textContent = step[1];
        if (captionRef.current) captionRef.current.textContent = scenes[nextIndex]?.caption ?? "";
        stopsRef.current?.querySelectorAll(".process-track-stop").forEach((stop, stopIndex) => {
          stop.classList.toggle("is-on", stopIndex <= nextIndex);
          stop.classList.toggle("is-current", stopIndex === nextIndex);
          stop.setAttribute("aria-selected", stopIndex === nextIndex ? "true" : "false");
        });
        setIndex(nextIndex);
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const count = processSteps.length;
  const last = count - 1;
  const goTo = (step: number) => {
    const track = trackRef.current;
    if (!track) return;
    const total = track.offsetHeight - window.innerHeight;
    const top = track.offsetTop + ((step + 0.12) / count) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (reduced) {
    return (
      <section className="process-section" id="process">
        <div className="process-photo">
          <Image src="/images/process.jpg" alt="Процесс производства и контроля продукции" fill sizes="(max-width: 900px) 100vw, 45vw" />
          <div className="process-photo-label">
            <PackageCheck />
            <span>
              Контролируем
              <br />
              каждый тираж
            </span>
          </div>
        </div>
        <div className="process-content">
          <span className="section-number">05 / КАК МЫ РАБОТАЕМ</span>
          <h2>
            Понятный путь
            <br />
            от идеи до тиража
          </h2>
          <div className="steps">
            {processSteps.map(([title, text], stepIndex) => (
              <div className="step" key={title}>
                <span>0{stepIndex + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                {stepIndex === 3 ? <CircleCheck /> : <ChevronRight />}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const current = processSteps[index] ?? processSteps[0];

  return (
    <section className="process-parallax" id="process" ref={trackRef}>
      <div className="process-parallax-sticky">
        <div className="process-parallax-stage">
          <div className="process-parallax-visual">
            <div className="process-parallax-shots" ref={shotsRef}>
              {scenes.map((scene, sceneIndex) => (
                <div
                  key={scene.image}
                  className={`process-parallax-shot ${sceneIndex === index ? "is-active" : ""}`}
                >
                  <Image src={scene.image} alt={scene.caption} fill sizes="(max-width: 900px) 100vw, 52vw" />
                </div>
              ))}
            </div>
            <span className="process-parallax-caption" ref={captionRef}>
              {scenes[index]?.caption ?? scenes[0].caption}
            </span>
          </div>

          <div className="process-parallax-copy">
            <div className="process-parallax-top">
              <span className="section-number light">05 / КАК МЫ РАБОТАЕМ</span>
              <p className="process-hint">
                Скролльте вниз, чтобы увидеть этап
                <ArrowDown size={14} />
              </p>
            </div>
            <strong className="process-parallax-index" aria-hidden="true" ref={numberRef}>
              01
            </strong>
            <h2>
              Понятный путь
              <br />
              <em>от идеи до тиража</em>
            </h2>
            <div className="process-parallax-step" aria-live="polite">
              <h3 ref={titleRef}>{current[0]}</h3>
              <p ref={textRef}>{current[1]}</p>
            </div>
            {index === last && (
              <Link href="/raschet" prefetch={false} className="process-parallax-cta">
                Рассчитать заказ
                <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>

        <div className="process-track" role="tablist" aria-label="Этапы работы" ref={stopsRef}>
          <div className="process-track-bar">
            <i ref={barRef} />
          </div>
          {processSteps.map(([title], stepIndex) => (
            <button
              type="button"
              key={title}
              role="tab"
              aria-selected={stepIndex === index}
              className={`process-track-stop ${stepIndex <= index ? "is-on" : ""} ${stepIndex === index ? "is-current" : ""}`}
              onClick={() => goTo(stepIndex)}
            >
              <b />
              <span>{title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
