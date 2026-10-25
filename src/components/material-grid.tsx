"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { motion } from "framer-motion";
import { importedPhotos } from "@/lib/imported-photos";
import { products } from "@/lib/site";

/** Сетка материалов одинаковой высоты: фото, название, короткое описание. */
export function MaterialGrid() {
  return (
    <section className="section materials-section" id="materials">
      <div className="section-heading">
        <div>
          <span className="section-number">МАТЕРИАЛЫ</span>
          <h2 className="type-title">
            Все позиции
            <br />в одной сетке
          </h2>
        </div>
        <p className="type-body">Выберите материал. Дальше подскажем тираж, срок и способ печати.</p>
      </div>
      <div className="material-grid">
        {products.map((product, index) => {
          const photo = importedPhotos[product.slug]?.[0];
          return (
            <motion.article
              key={product.slug}
              className="material-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/${product.slug}`}>
                <span className="material-photo">
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={product.name}
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    />
                  ) : (
                    <span className="material-placeholder">
                      <ImageOff size={22} aria-hidden="true" />
                      Фото готовится
                    </span>
                  )}
                </span>
                <span className="material-copy">
                  <strong>{product.shortName}</strong>
                  <em>{product.summary}</em>
                </span>
              </Link>
            </motion.article>
          );
        })}
      </div>
      <div className="section-ornament" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
