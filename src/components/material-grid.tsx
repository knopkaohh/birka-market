"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CircularCarousel from "@/components/fx/CircularCarousel";
import { importedPhotos } from "@/lib/imported-photos";
import { products } from "@/lib/site";

/** Материалы кольцом: листаются, перетаскиваются и открываются по клику. */
export function MaterialGrid() {
  const router = useRouter();
  const [front, setFront] = useState(0);
  const materials = products.filter((product) => product.category !== "sajty");
  const items = materials.map((product) => {
    const photo = importedPhotos[product.slug]?.[0];
    return {
      src: photo?.src ?? product.image,
      alt: product.name,
      title: product.shortName,
      subtitle: product.summary,
    };
  });
  const current = materials[front] ?? materials[0];

  return (
    <section className="section materials-section" id="materials">
      <div className="materials-heading">
        <h2>
          Наши <em>материалы</em>
        </h2>
        <p>Проведите по кольцу и откройте материал.</p>
      </div>
      <div className="materials-carousel" style={{ width: "100%", position: "relative" }}>
        <CircularCarousel
          items={items}
          preset="cylinder"
          intro="rise"
          cardWidth={320}
          aspectRatio={1}
          speed={7}
          captions={false}
          gap={68}
          pin="top"
          tilt={-5}
          curve={0.53}
          perspective={3020}
          autoplay="drift"
          interval={3}
          direction="left"
          momentum={0.51}
          snap
          pauseOnHover
          focusOnClick
          draggable
          parallax={0.3}
          stretch={0.5}
          fadeColor="#000000"
          depthFade={0.55}
          innerShade={0.6}
          cornerRadius={12}
          onChange={setFront}
          onItemClick={(_item, index) => {
            const product = materials[index];
            if (product) router.push(`/${product.slug}`);
          }}
        />
      </div>
      {current ? (
        <Link className="materials-current" href={`/${current.slug}`}>
          <strong>{current.shortName}</strong>
          <em>{current.summary}</em>
        </Link>
      ) : null}
      <div className="section-ornament" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
