import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { CalculatorBlock } from "@/components/calculator-block";
import { ProductCard } from "@/components/product-card";
import { YandexMap } from "@/components/yandex-map";
import { importedPhotos } from "@/lib/imported-photos";
import { formatNewsDate, newsPosts } from "@/lib/news";
import { company, products } from "@/lib/site";

export default function Home() {
  const latestNews = newsPosts.slice(0, 3);

  return (
    <>
      <section className="hero hero-atmosphere">
        <Image
          src="/images/company/cover.jpg"
          alt="Производственный склад Бирка Маркет: ленты и готовые бирки"
          width={1280}
          height={960}
          priority
          sizes="100vw"
          className="hero-bg"
        />
        <div className="hero-scrim" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span />
            Производим в Москве • Доставляем по России
          </div>
          <h1 className="type-display">
            Производство бирок,
            <br />
            пакетов, упаковки,
            <br />
            мерча и <em>полиграфии</em>
          </h1>
          <p className="hero-lead type-body">
            Быстрый расчёт и консультация по материалам. Оставьте заявку или позвоните — поможем выбрать и посчитаем тираж.
          </p>
          <div className="hero-actions">
            <Link className="primary-cta" href="/raschet">
              Рассчитать заказ
              <ArrowRight size={19} />
            </Link>
            <a className="text-link" href={company.phoneHref}>
              {company.phone}
              <ArrowDownRight size={18} />
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <strong>с {company.since}</strong>
              <span>на рынке</span>
            </div>
            <div>
              <strong>{company.brands}</strong>
              <span>брендов</span>
            </div>
            <div>
              <strong>0 ₽</strong>
              <span>макет для печати</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-welcome">
        <div>
          <span className="section-number">КОМАНДА</span>
          <h2 className="type-title">
            Вас приветствует
            <br />
            команда <em>Бирка Маркет</em>
          </h2>
        </div>
        <div className="home-welcome-copy">
          <p>
            К нам обращаются те, кому важны ответственность и скорость решений. Больше восьми лет партнёры приходят, чтобы бренд выглядел собранно с каждой стороны: от размера и состава до вкладыша и упаковки.
          </p>
          <p className="home-goal">Ваш бренд — наша забота. Наша цель — быть партнёром, с которым бренд становится заметнее.</p>
        </div>
      </section>

      <section className="section" id="products">
        <div className="section-heading">
          <div>
            <span className="section-number">ПРОДУКЦИЯ</span>
            <h2 className="type-title">
              Разные формы, материалы
              <br />и способы печати
            </h2>
          </div>
          <p className="type-body">Выберите изделие и откройте фото работ. Остальное уточним вместе.</p>
        </div>
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard
              key={item.slug}
              product={item}
              image={importedPhotos[item.slug]?.[0]?.src ?? item.image}
            />
          ))}
        </div>
      </section>

      <section className="section home-news">
        <div className="section-heading">
          <div>
            <span className="section-number">НОВОСТИ</span>
            <h2 className="type-title">Что происходит сейчас</h2>
          </div>
          <Link className="text-link" href="/novosti">
            Все новости
            <ArrowDownRight size={18} />
          </Link>
        </div>
        <div className="news-grid">
          {latestNews.map((post) => (
            <Link key={post.slug} href={`/novosti/${post.slug}`} className="news-card">
              <span className="news-card-photo">
                <Image src={post.cover} alt={post.title} fill sizes="(max-width: 760px) 100vw, 33vw" />
              </span>
              <span className="news-card-copy">
                <time dateTime={post.date}>{formatNewsDate(post.date)}</time>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <em>
                  Читать
                  <ArrowDownRight size={16} />
                </em>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CalculatorBlock />
      <YandexMap />
    </>
  );
}
