"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, RotateCcw } from "lucide-react";
import {
  type GuideAnswers,
  garmentOptions,
  guideComment,
  placeOptions,
  priorityOptions,
  recommendGuide,
} from "@/lib/guide";
import { getProduct } from "@/lib/site";

const steps = [
  { key: "garment", title: "Что шьёте или продаёте?", options: garmentOptions },
  { key: "priority", title: "Что важнее всего?", options: priorityOptions },
  { key: "place", title: "Куда ставите бирку?", options: placeOptions },
] as const;

export function LabelGuide() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<GuideAnswers>>({});

  const complete = Boolean(answers.garment && answers.priority && answers.place);
  const result = useMemo(
    () => (complete ? recommendGuide(answers as GuideAnswers) : null),
    [answers, complete],
  );

  const pick = (value: string) => {
    const key = steps[step].key;
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step < steps.length - 1) setStep(step + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const current = steps[step];
  const selected = answers[current.key];

  return (
    <section className="guide-wizard" aria-labelledby="guide-wizard-title">
      <div className="guide-wizard-head">
        <span className="section-number">ПОДБОР</span>
        <h2 id="guide-wizard-title">Три вопроса — и понятный комплект</h2>
        <p>Можно не знать терминов. Ответьте, что шьёте и где будет бирка. Мы назовём материал, сгиб, цвета и тираж.</p>
      </div>
      <ol className="guide-steps" aria-label="Шаги подбора">
        {steps.map((item, index) => (
          <li key={item.key}>
            <button
              type="button"
              className={index === step ? "is-current" : answers[item.key] ? "is-done" : undefined}
              onClick={() => setStep(index)}
            >
              <strong>0{index + 1}</strong>
              {item.title}
            </button>
          </li>
        ))}
      </ol>
      {!result || step < 2 || !complete ? (
        <div className="guide-options" role="list">
          {current.options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="listitem"
              className={selected === option.id ? "is-active" : undefined}
              onClick={() => pick(option.id)}
            >
              <strong>{option.label}</strong>
              <span>{option.hint}</span>
            </button>
          ))}
        </div>
      ) : null}
      {result ? (
        <GuideResultCard
          result={result}
          comment={guideComment(result, answers as GuideAnswers)}
          onReset={reset}
        />
      ) : null}
    </section>
  );
}

function GuideResultCard({
  result,
  comment,
  onReset,
}: {
  result: ReturnType<typeof recommendGuide>;
  comment: string;
  onReset: () => void;
}) {
  const material = getProduct(result.materialSlug);
  const pair = result.pairSlug ? getProduct(result.pairSlug) : undefined;
  const calcHref = `/raschet?product=${result.materialSlug}&comment=${encodeURIComponent(comment)}`;

  return (
    <div className="guide-result">
      <div className="guide-result-copy">
        <span>ВАШ КОМПЛЕКТ</span>
        <h3>{result.title}</h3>
        <p>{result.summary}</p>
        <ul>
          {result.reasons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <dl>
          <div>
            <dt>Материал</dt>
            <dd>{material?.name ?? result.materialSlug}</dd>
          </div>
          <div>
            <dt>Вид и подгибка</dt>
            <dd>
              {result.foldName}. {result.foldWhy}
            </dd>
          </div>
          <div>
            <dt>Цвета</dt>
            <dd>{result.colors}</dd>
          </div>
          <div>
            <dt>Тираж</dt>
            <dd>
              {result.qty}. {result.qtyHint}
            </dd>
          </div>
        </dl>
        <div className="guide-result-actions">
          <Link className="primary-cta" href={calcHref}>
            Рассчитать этот комплект
            <ArrowRight size={18} />
          </Link>
          {material ? (
            <Link className="text-link" href={`/${material.slug}`}>
              Страница {material.shortName}
              <ArrowDownRight size={16} />
            </Link>
          ) : null}
          {pair ? (
            <Link className="text-link" href={`/${pair.slug}`}>
              Плюс {pair.shortName}
              <ArrowDownRight size={16} />
            </Link>
          ) : null}
          <button type="button" className="guide-reset" onClick={onReset}>
            <RotateCcw size={15} />
            Ответить заново
          </button>
        </div>
      </div>
      {material ? (
        <figure className="guide-result-photo">
          <Image src={material.image} alt={material.name} fill sizes="(max-width: 900px) 100vw, 46vw" />
        </figure>
      ) : null}
    </div>
  );
}

