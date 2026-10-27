"use client";

import FlexCarousel from "@/components/fx/FlexCarousel";

export type MaterialPhoto = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
};

/** Ряд фото работ: жидкое стекло, чуть спокойнее по краям, лента едет сама. */
export function MaterialPhotos({ items }: { items: MaterialPhoto[] }) {
  if (!items.length) return null;
  return (
    <div className="material-photos">
      <FlexCarousel
        items={items}
        preset="liquid"
        intro="rise"
        cardHeight={0.53}
        gap={40}
        squeeze={0.2}
        focusOnClick
        captions
        fit="natural"
        radius={0}
        lensWidth={0.74}
        lensHeight={1.01}
        tilt={62}
        roundness={1}
        bend={0.34}
        reach={0.38}
        curl="twist"
        dispersion={0.3}
        liquid={0}
        followCursor={false}
        autoplay
        interval={5}
        captureWheel
      />
    </div>
  );
}
