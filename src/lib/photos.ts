import { photoKey } from "@/lib/photo-id";

/** Снимки вкладки «Мерч», которые не показываем: низкое разрешение, макет с надписью logo, тёмный кроп с нечитаемой биркой. */
export const rejectedPhotoSrc = new Set([
  "/images/products/merchi.jpg",
  "/images/merchi/g6.jpg",
  "/images/merchi/g7.jpg",
]);

export function usablePhoto(src?: string | null) {
  if (!src || rejectedPhotoSrc.has(src)) return null;
  return src;
}

/** Оставляет первый пригодный кадр и помечает его занятым, чтобы секция не повторяла уже показанное фото. */
export function takeUniquePhoto(src: string | undefined | null, seen: Set<string>) {
  const clean = usablePhoto(src);
  if (!clean) return null;
  const key = photoKey(clean);
  if (seen.has(key)) return null;
  seen.add(key);
  return clean;
}

export function firstUniquePhoto(
  items: { src: string; alt: string }[],
  seen: Set<string>,
) {
  for (const item of items) {
    const src = takeUniquePhoto(item.src, seen);
    if (src) return { src, alt: item.alt };
  }
  return null;
}
