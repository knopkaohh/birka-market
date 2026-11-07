import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoFrame } from "@/components/photo-frame";
import { categories } from "@/lib/site";

type Category = (typeof categories)[number];

export function CategoryTile({ category, index }: { category: Category; index: number }) {
  return (
    <Link className="category-tile" href={`/katalog/${category.slug}`}>
      <div className="category-photo">
        <PhotoFrame
          src={category.image}
          alt={category.name}
          width={960}
          height={720}
          sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 32vw"
          cover
        />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="category-copy">
        <h3>{category.name}</h3>
        <p>{category.intro}</p>
        <em>
          Смотреть
          <ArrowRight />
        </em>
      </div>
    </Link>
  );
}
