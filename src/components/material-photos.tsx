"use client";

import FlexCarousel from "@/components/fx/FlexCarousel";

export type MaterialPhoto = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
};

/** Ряд фото работ: края резкие, лента сама едет медленно. */
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
        squeeze={0}
        focusOnClick
        captions
        fit="natural"
        radius={0}
        lensWidth={1}
        lensHeight={1}
        tilt={0}
        roundness={1}
        bend={0}
        reach={0}
        curl="rise"
        dispersion={0}
        liquid={0}
        followCursor={false}
        autoplay
        interval={8}
        captureWheel={false}
      />
    </div>
  );
}
