import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoFrame } from "@/components/photo-frame";
import { catalogByMaterial, catalogHref, catalogOrderHref, lowestQuote, type CatalogItem } from "@/lib/catalog";
import { getLanding } from "@/lib/landings";
import { getProduct } from "@/lib/site";

export function catalogBlurb(item: CatalogItem) {
  if (item.description && item.description !== item.title) return item.description;
  const facts = item.characteristics.map((fact) => `${fact.title}: ${fact.value}`).join(". ");
  return facts || item.text || item.title;
}

export function MaterialCatalog({
  slug,
  except,
  title = "Каталог примеров",
  intro = "Готовые комплекты с производства. Карточка открывает страницу примера, кнопка «Заказать» под ценой сразу ведёт к расчёту такого комплекта.",
}: {
  slug: string;
  except?: string;
  title?: string;
  intro?: string;
}) {
  const items = catalogByMaterial(slug).filter((item) => item.path !== except);
  if (!items.length) return null;
  const landing = getLanding(slug);
  const product = getProduct(slug);
  const quote = lowestQuote(landing?.quotes ?? []);
  if (!quote || !product) return null;

  return (
    <section className="jq-section" id="katalog-primerov">
      <div className="jq-heading">
        <span className="section-number">КАТАЛОГ</span>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="catalog-grid">
        {items.map((item) => (
          <article className="catalog-card" key={item.uid}>
            <Link href={catalogHref(item)} className="catalog-photo">
              <PhotoFrame
                src={item.image}
                alt={item.title}
                width={900}
                height={900}
                sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"
                cover
              />
            </Link>
            <div className="catalog-body">
              <h3>
                <Link href={catalogHref(item)}>{item.title}</Link>
              </h3>
              <p>{catalogBlurb(item)}</p>
              <strong>{quote.price.trim().toLowerCase().startsWith("от") ? quote.price : `от ${quote.price}`}</strong>
              <span className="catalog-price-note">
                {quote.qty} · {quote.size}
              </span>
              <Link className="catalog-order" href={catalogOrderHref(item, quote)}>
                Заказать
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
