"use client";

import FlexCarousel from "@/components/fx/FlexCarousel";

export type MaterialPhoto = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
};

/** Ряд фото материала: жидкое стекло по краям, карточка открывается по клику. */
export function MaterialPhotos({ items }: { items: MaterialPhoto[] }) {
  if (!items.length) return null;
  return (
    <div className="material-photos" style={{ width: "100%", height: 560, position: "relative" }}>
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
        dispersion={0.45}
        liquid={0}
        followCursor={false}
        autoplay={false}
        interval={4}
        captureWheel
      />
    </div>
  );
}
