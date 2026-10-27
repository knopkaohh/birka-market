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
        cardHeight={0.58}
        gap={28}
        squeeze={0.16}
        focusOnClick
        captions
        fit="natural"
        radius={0}
        lensWidth={0.86}
        lensHeight={1.04}
        tilt={48}
        roundness={1}
        bend={0.16}
        reach={0.2}
        curl="twist"
        dispersion={0.04}
        liquid={0}
        followCursor={false}
        autoplay
        interval={7}
        captureWheel
      />
    </div>
  );
}
