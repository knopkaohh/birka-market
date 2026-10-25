import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoFrame } from "@/components/photo-frame";
import type { Product } from "@/lib/site";

export function ProductCard({
  product,
  index,
  image,
}: {
  product: Product;
  index?: number;
  image?: string;
}) {
  return (
    <article className="product-card">
      <Link href={`/${product.slug}`} className="product-image">
        <PhotoFrame
          src={image ?? product.image}
          alt={product.name}
          width={900}
          height={900}
          sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"
          cover
        />
        {typeof index === "number" && <span className="card-index">{String(index + 1).padStart(2, "0")}</span>}
        {product.sample && <span className="sample-badge">Можно сделать образец</span>}
      </Link>
      <div className="product-info">
        <span>{product.type}</span>
        <h3>
          <Link href={`/${product.slug}`}>{product.shortName}</Link>
        </h3>
        <p>{product.summary}</p>
        <div className="card-actions">
          <Link href={`/${product.slug}`}>
            Подробнее
            <ArrowRight />
          </Link>
          <Link href={`/raschet?product=${product.slug}`}>Рассчитать заказ</Link>
        </div>
      </div>
    </article>
  );
}
