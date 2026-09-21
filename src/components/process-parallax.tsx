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
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      setReduced(true);
      return;
    }

    let frame = 0;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const total = track.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-track.getBoundingClientRect().top, 0), Math.max(total, 1));
      setProgress(total > 0 ? passed / total : 0);
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
  }, []);

  const last = Math.max(processSteps.length - 1, 1);
  const scaled = progress * last;
  const index = Math.min(last, Math.floor(scaled + 0.001));
  const local = Math.min(1, Math.max(0, scaled - index));
  const current = processSteps[index] ?? processSteps[0];

  const goTo = (step: number) => {
    const track = trackRef.current;
    if (!track) return;
    const total = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY + (step / last) * total;
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

  return (
    <section className="process-parallax" id="process" ref={trackRef}>
      <div className="process-parallax-sticky">
        <div className="process-parallax-stage">
          <div className="process-parallax-visual">
            {scenes.map((scene, sceneIndex) => (
              <div
                key={scene.image}
                className={`process-parallax-shot ${sceneIndex === index ? "is-active" : ""}`}
                style={{
                  transform: sceneIndex === index ? `translate3d(0, ${(local * 28 - 10).toFixed(1)}px, 0) scale(1.08)` : undefined,
                }}
              >
                <Image src={scene.image} alt={scene.caption} fill sizes="(max-width: 900px) 100vw, 52vw" />
              </div>
            ))}
            <span className="process-parallax-caption">{scenes[index]?.caption}</span>
          </div>

          <div className="process-parallax-copy">
            <div className="process-parallax-top">
              <span className="section-number light">05 / КАК МЫ РАБОТАЕМ</span>
              <p className="process-hint">
                Скролльте вниз, чтобы увидеть этап
                <ArrowDown size={14} />
              </p>
            </div>
            <strong className="process-parallax-index" aria-hidden="true">
              0{index + 1}
            </strong>
            <h2>
              Понятный путь
              <br />
              <em>от идеи до тиража</em>
            </h2>
            <div className="process-parallax-step" aria-live="polite">
              <h3>{current[0]}</h3>
              <p>{current[1]}</p>
            </div>
            {index === last && (
              <Link href="/raschet" prefetch={false} className="process-parallax-cta">
                Рассчитать стоимость
                <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>

        <div className="process-track" role="tablist" aria-label="Этапы работы">
          <div className="process-track-bar">
            <i style={{ width: `${progress * 100}%` }} />
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
