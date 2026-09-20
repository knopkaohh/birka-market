"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDownRight, ArrowRight, Check, ChevronRight, CircleCheck, Clock3,
  FileUp, Menu, MessageCircle, PackageCheck, Phone, Sparkles, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const materials = [
  { key: "jacquard", name: "Жаккард", type: "Премиальный брендинг", copy: "Тканый логотип с выразительной фактурой. Для горловины, одежды и аксессуаров.", image: "/images/product-jacquard.jpg", sample: false },
  { key: "satin", name: "Сатин", type: "Мягкость и комфорт", copy: "Гладкая лента для составников, размерников, ухода и деликатной одежды.", image: "/images/product-satin.jpg", sample: true },
  { key: "silicone", name: "Силикон", type: "Стойкий акцент", copy: "Гибкие влагостойкие бирки для спорта, обуви, сумок и верхней одежды.", image: "/images/product-silicone.jpg", sample: true },
  { key: "cotton", name: "Хлопок", type: "Натуральная фактура", copy: "Тактильное решение для локальных, экологичных и ремесленных брендов.", image: "/images/product-cotton.jpg", sample: false },
  { key: "nylon", name: "Нейлон", type: "Практичная маркировка", copy: "Тонкий и прочный материал для составников и технической информации.", image: "/images/product-nylon.jpg", sample: true },
  { key: "reflective", name: "Светоотражающие", type: "Видимость и безопасность", copy: "Для спортивной, рабочей и детской одежды, где важно отражение света.", image: "/images/product-reflective.jpg", sample: false },
];

const portfolio = [
  { image: "/images/work-1.jpg", label: "Сатин • 5 000 шт." },
  { image: "/images/work-2.jpg", label: "Жаккард • 1 000 шт." },
  { image: "/images/work-4.jpg", label: "Хлопок • 500 шт." },
  { image: "/images/work-5.jpg", label: "Упаковка • 2 000 шт." },
];

const faq = [
  ["Какой минимальный тираж?", "Минимальный тираж вшивных бирок — 100 штук. Для других видов продукции тираж зависит от материала и технологии."],
  ["Что делать, если у меня нет готового макета?", "Пришлите логотип, текст, референс или просто опишите задачу. Дизайнер бесплатно подготовит технический макет перед запуском."],
  ["Для каких бирок можно изготовить образец?", "Образцы доступны для сатиновых, силиконовых и нейлоновых бирок. Жаккард, хлопок и светоотражающие материалы согласуем по макету и примерам работ."],
  ["От чего зависит стоимость?", "От материала, размера, тиража, количества цветов, способа нанесения и обработки краёв. Поэтому мы рассчитываем каждый заказ по параметрам."],
  ["Сколько занимает производство?", "Ориентир — 4–6 рабочих дней после согласования параметров и макета. Сложные и крупные заказы рассчитываются отдельно."],
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Бирка Маркет — на главную">
      <span className="logo-mark" aria-hidden="true">БМ</span>
      <span>БИРКА<br />МАРКЕТ</span>
    </a>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [material, setMaterial] = useState("unknown");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  const goToForm = (selected?: string) => {
    if (selected) setMaterial(selected);
    document.querySelector("#calc")?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/lead", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setMaterial("unknown");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className={`loader ${loading ? "" : "loader-hidden"}`} aria-hidden={!loading}>
        <div className="loader-tag"><span>БИРКА</span><span>МАРКЕТ</span></div>
        <div className="loader-line"><i /></div>
        <p>Детали, которые создают бренд</p>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Основная навигация">
            <a href="#products">Продукция</a><a href="#works">Наши работы</a>
            <a href="#process">Как работаем</a><a href="#about">О компании</a>
          </nav>
          <div className="header-actions">
            <a className="phone-link" href="tel:+74950038881"><Phone size={15} />+7 495 003-88-81</a>
            <button className="header-cta" onClick={() => goToForm()}>Рассчитать стоимость<ArrowDownRight size={17} /></button>
            <button className="menu-toggle" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
          {["Продукция", "Наши работы", "Как работаем", "О компании"].map((item, index) => (
            <a key={item} href={["#products", "#works", "#process", "#about"][index]} onClick={() => setMenuOpen(false)}>
              {item}<ChevronRight />
            </a>
          ))}
          <a href="tel:+74950038881">+7 495 003-88-81</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span />Производим в Москве • Доставляем по России</div>
            <h1>Ваш бренд<br />начинается <em>с деталей</em></h1>
            <p className="hero-lead">Бирки, упаковка и фурнитура для одежды — от бесплатного макета до готового тиража. Поможем выбрать материал и рассчитаем заказ за 15 минут.</p>
            <div className="hero-actions">
              <button className="primary-cta" onClick={() => goToForm()}>Рассчитать стоимость<ArrowRight size={19} /></button>
              <a className="text-link" href="#products">Смотреть продукцию<ArrowDownRight size={18} /></a>
            </div>
            <div className="hero-proof">
              <div><strong>от 100</strong><span>минимальный тираж</span></div>
              <div><strong>0 ₽</strong><span>технический макет</span></div>
              <div><strong>4–6 дней</strong><span>производство</span></div>
            </div>
          </div>
          <div className="hero-visual" aria-label="Примеры изготовленных бирок">
            <div className="hero-yellow-shape" />
            <div className="floating-note note-one"><Sparkles size={16} />Реальные работы</div>
            <div className="photo-card photo-main">
              <Image src="/images/product-jacquard.jpg" alt="Жаккардовые бирки, изготовленные Бирка Маркет" fill sizes="(max-width: 900px) 80vw, 35vw" priority />
            </div>
            <div className="photo-card photo-small">
              <Image src="/images/product-cotton.jpg" alt="Хлопковые бирки с логотипом" fill sizes="220px" />
            </div>
            <div className="quality-stamp"><span>8 лет</span><small>заботимся<br />о брендах</small></div>
            <div className="scroll-cue"><span>Листайте</span><ArrowDownRight /></div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div>
          <span>БИРКИ</span><i>✦</i><span>УПАКОВКА</span><i>✦</i><span>ФУРНИТУРА</span><i>✦</i>
          <span>МЕРЧ</span><i>✦</i><span>ПОЛИГРАФИЯ</span><i>✦</i><span>БИРКИ</span><i>✦</i><span>УПАКОВКА</span>
        </div></div>

        <section className="section products-section" id="products">
          <div className="section-heading">
            <div><span className="section-number">01 / ПРОДУКЦИЯ</span><h2>Вшивные бирки<br />для вашего бренда</h2></div>
            <p>Шесть материалов — для разных задач, ощущений и изделий. Если сомневаетесь, менеджер и технолог помогут выбрать.</p>
          </div>
          <div className="product-grid">
            {materials.map((item, index) => (
              <article className="product-card" key={item.key}>
                <div className="product-image">
                  <Image src={item.image} alt={`${item.name} — ${item.type.toLowerCase()}`} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw" />
                  <span className="card-index">0{index + 1}</span>
                  {item.sample && <span className="sample-badge">Можно сделать образец</span>}
                </div>
                <div className="product-info">
                  <span>{item.type}</span><h3>{item.name}</h3><p>{item.copy}</p>
                  <button onClick={() => goToForm(item.key)}>Рассчитать<ArrowRight /></button>
                </div>
              </article>
            ))}
          </div>
          <div className="choice-banner">
            <div className="choice-icon"><MessageCircle /></div>
            <div><span>НЕ ЗНАЕТЕ, ЧТО ПОДОЙДЁТ?</span><h3>Опишите изделие — подберём материал за вас</h3></div>
            <button onClick={() => goToForm("unknown")}>Нужна помощь<ArrowRight /></button>
          </div>
        </section>

        <section className="dark-section" id="about">
          <div className="dark-intro">
            <span className="section-number light">02 / ПОЧЕМУ МЫ</span>
            <p className="display-quote">Не просто печатаем бирки. <em>Вникаем в задачу</em> и отвечаем за результат — от первого файла до последней детали тиража.</p>
          </div>
          <div className="advantages">
            {[
              ["01", "Свой дизайнер", "Бесплатно адаптирует логотип и подготовит технический макет."],
              ["02", "Менеджер + технолог", "Проверят параметры, материал и способ обработки до запуска."],
              ["03", "Контроль качества", "Сверяем размер, цвет, читаемость и края с согласованным макетом."],
              ["04", "Всё в одном месте", "Бирки, упаковка, биркодержатели и полиграфия у одного партнёра."],
            ].map(([num, title, text]) => <div className="advantage" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </section>

        <section className="section works-section" id="works">
          <div className="section-heading compact">
            <div><span className="section-number">03 / НАШИ РАБОТЫ</span><h2>Сделано для брендов,<br />которые ценят детали</h2></div>
            <p>Показываем продукт крупно — без мокапов и декоративных обещаний.</p>
          </div>
          <div className="works-grid">
            {portfolio.map((item, index) => (
              <figure className={`work-card work-${index + 1}`} key={item.image}>
                <Image src={item.image} alt={`Пример работы Бирка Маркет: ${item.label}`} fill sizes="(max-width: 700px) 90vw, 45vw" />
                <figcaption><span>{item.label}</span><ArrowDownRight /></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="process-photo">
            <Image src="/images/process.jpg" alt="Процесс производства и контроля продукции" fill sizes="(max-width: 900px) 100vw, 45vw" />
            <div className="process-photo-label"><PackageCheck /><span>Контролируем<br />каждый тираж</span></div>
          </div>
          <div className="process-content">
            <span className="section-number">04 / КАК МЫ РАБОТАЕМ</span><h2>Понятный путь<br />от идеи до тиража</h2>
            <div className="steps">
              {[
                ["Заявка", "Вы присылаете логотип, параметры или просто описываете задачу."],
                ["Подбор и расчёт", "Уточняем материал, размер, тираж и рассчитываем стоимость."],
                ["Макет бесплатно", "Дизайнер готовит технический макет и согласует его с вами."],
                ["Производство", "Запускаем тираж, проверяем качество и передаём в доставку."],
              ].map(([title, text], index) => (
                <div className="step" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div>{index === 3 ? <CircleCheck /> : <ChevronRight />}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="calculator-section" id="calc">
          <div className="calculator-intro">
            <span className="section-number light">05 / БЫСТРЫЙ РАСЧЁТ</span><h2>Расскажите<br />о вашей задаче</h2>
            <p>Можно не знать точных параметров. Оставьте телефон — менеджер свяжется, поможет с выбором и подготовит расчёт.</p>
            <div className="calc-promise"><Clock3 /><span><strong>Ответим в течение 15 минут</strong><br />в рабочее время</span></div>
          </div>
          <form className="calc-form" onSubmit={submit}>
            <div className="field full">
              <label htmlFor="material">Что нужно изготовить?</label>
              <select id="material" name="material" value={material} onChange={(event) => setMaterial(event.target.value)}>
                <option value="unknown">Нужна помощь с выбором</option>
                {materials.map((item) => <option key={item.key} value={item.key}>{item.name}</option>)}
                <option value="other">Другая продукция</option>
              </select>
            </div>
            <div className="field"><label htmlFor="quantity">Тираж, шт.</label><Input id="quantity" name="quantity" type="number" min="100" placeholder="Например, 1000" required /></div>
            <div className="field"><label htmlFor="name">Ваше имя</label><Input id="name" name="name" placeholder="Как к вам обращаться?" /></div>
            <div className="field full"><label htmlFor="phone">Телефон или Telegram</label><Input id="phone" name="phone" type="tel" placeholder="+7 999 000-00-00" required /></div>
            <div className="field full"><label htmlFor="comment">Комментарий</label><Textarea id="comment" name="comment" placeholder="Размер, материал, сроки — всё, что уже известно" /></div>
            {materials.find((item) => item.key === material)?.sample && (
              <label className="sample-toggle"><input type="checkbox" name="sample" /><span><Check /></span>Нужен образец перед тиражом</label>
            )}
            <label className="file-field">
              <FileUp /><span><strong>Прикрепить логотип или макет</strong><small>PDF, AI, SVG, PNG или JPG до 15 МБ</small></span>
              <input type="file" name="file" accept=".pdf,.ai,.svg,.png,.jpg,.jpeg" />
            </label>
            <Button type="submit" disabled={status === "sending"} className="submit-button">
              {status === "sending" ? "Отправляем…" : "Получить расчёт"}<ArrowRight />
            </Button>
            <p className="privacy">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
            {status === "success" && <div className="form-message success-message"><CircleCheck />Спасибо! Заявка принята. Менеджер скоро свяжется с вами.</div>}
            {status === "error" && <div className="form-message error-message">Не удалось отправить заявку. Позвоните нам: +7 495 003-88-81.</div>}
          </form>
        </section>

        <section className="section faq-section">
          <div className="faq-title"><span className="section-number">06 / ВОПРОСЫ</span><h2>Коротко<br />о главном</h2><p>Не нашли ответ? Напишите — разберём вашу задачу лично.</p></div>
          <Accordion className="faq-list">
            {faq.map(([question, answer], index) => (
              <AccordionItem value={`item-${index}`} key={question} className="faq-item">
                <AccordionTrigger className="faq-trigger"><span>0{index + 1}</span>{question}</AccordionTrigger>
                <AccordionContent className="faq-content">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <Logo /><h2>Пусть ваш бренд<br /><em>запомнят</em></h2>
          <button className="footer-circle" onClick={() => goToForm()}>Обсудить<br />задачу<ArrowDownRight /></button>
        </div>
        <div className="footer-grid">
          <div><span>СВЯЗАТЬСЯ</span><a href="tel:+74950038881">+7 495 003-88-81</a><a href="mailto:info@birka-market.ru">info@birka-market.ru</a></div>
          <div><span>АДРЕС</span><p>Москва, Строительный проезд,<br />дом 2, стр. 1, офис № 1</p></div>
          <div><span>МЕССЕНДЖЕРЫ</span><a href="#calc">Telegram</a><a href="#calc">WhatsApp</a></div>
          <div><span>РЕЖИМ РАБОТЫ</span><p>Пн–Пт, 09:00–18:00</p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 БИРКА МАРКЕТ</span><span>Бирки • упаковка • фурнитура</span><a href="#top">Наверх ↑</a></div>
      </footer>

      <div className="mobile-bottom"><a href="tel:+74950038881"><Phone /> Позвонить</a><button onClick={() => goToForm()}>Рассчитать</button></div>
    </>
  );
}
