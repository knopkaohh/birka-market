import Image from "next/image";
import { usablePhoto } from "@/lib/photos";

type PhotoFrameProps = {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  cover?: boolean;
  className?: string;
};

export function PhotoFrame({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  cover = false,
  className = "",
}: PhotoFrameProps) {
  const clean = usablePhoto(src);
  if (!clean) {
    return (
      <div className={`photo-pending ${cover ? "is-cover" : ""} ${className}`} role="img" aria-label="Фото готовится">
        <span>Фото готовится</span>
      </div>
    );
  }

  return (
    <Image
      src={clean}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={`${cover ? "photo-cover" : "photo-intrinsic"} ${className}`}
    />
  );
}
