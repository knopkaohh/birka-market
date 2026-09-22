export type LandingTone = "yellow" | "sand" | "green" | "ink";

export type LandingVariant = {
  id: string;
  name: string;
  fold: string;
  text: string;
  image: string;
  tone: LandingTone;
};

export type LandingQuote = {
  qty: string;
  size: string;
  spec: string;
  time: string;
  price: string;
};

export type LandingContent = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  titleEm: string;
  lead: string;
  proof: { value: string; label: string }[];
  hero: [string, string, string];
  heroAlts: [string, string, string];
  variantLabel: string;
  variantTitle: string;
  variantIntro: string;
  variants: LandingVariant[];
  galleryTitle: string;
  galleryIntro: string;
  gallery: { src: string; alt: string }[];
  quotesTitle: string;
  quotesIntro: string;
  quoteUnit?: string;
  quotes: LandingQuote[];
  calcTitle: string;
  calcIntro: string;
  calcBullets: string[];
  form: {
    variantLabel: string;
    sizeLabel: string;
    sizePlaceholder: string;
    extraLabel: string;
    extraPlaceholder: string;
    commentPlaceholder: string;
  };
  reasonsLabel: string;
  reasonsTitle: string;
  reasons: { title: string; text: string }[];
  specs: { title: string; text: string }[];
  fitTitle: string;
  fit: { title: string; text: string }[];
  onProductTitle: string;
  onProductIntro: string;
  onProduct: { title: string; text: string; image: string }[];
  steps: [string, string][];
  terms: { value: string; label: string }[];
  checks: { title: string; text: string }[];
  complementIntro: string;
  complement: string[];
  faq: { q: string; a: string }[];
  finalTitle: string;
  finalText: string;
};

export function g(slug: string, n: number) {
  return `/images/${slug}/g${n}.jpg`;
}

export function p(slug: string) {
  return `/images/products/${slug}.jpg`;
}

export function gallery(slug: string, alts: string[]) {
  return alts.map((alt, index) => ({
    src: index === 0 ? p(slug) : g(slug, index),
    alt,
  }));
}

export type QuotePrefill = {
  qty?: string;
  size?: string;
  spec?: string;
  time?: string;
  price?: string;
};

export function quoteQuantity(qty: string) {
  return qty.replace(/\D/g, "");
}

export function matchQuoteVariant(
  spec: string,
  variants: Pick<LandingVariant, "id" | "name" | "fold">[],
) {
  const hay = spec.toLowerCase();
  const scored = variants
    .map((item) => {
      const needles = [item.name, item.fold, item.id]
        .map((value) => value.toLowerCase())
        .filter((value) => value.length > 2);
      const hit = needles.find((needle) => hay.includes(needle));
      return { id: item.id, score: hit ? hit.length : 0 };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored[0]?.id;
}

export function quoteHref(
  slug: string,
  quote: LandingQuote,
  variants: Pick<LandingVariant, "id" | "name" | "fold">[],
) {
  const params = new URLSearchParams();
  const qty = quoteQuantity(quote.qty);
  if (qty) params.set("qty", qty);
  params.set("size", quote.size);
  params.set("spec", quote.spec);
  params.set("time", quote.time);
  params.set("price", quote.price);
  const variant = matchQuoteVariant(quote.spec, variants);
  if (variant) params.set("variant", variant);
  return `/${slug}?${params.toString()}#calc`;
}

export function quoteComment(quote: QuotePrefill) {
  const parts = [
    quote.price,
    quote.qty ? (/\d/.test(quote.qty) && !quote.qty.includes("шт") ? `${quote.qty} шт.` : quote.qty) : "",
    quote.size,
    quote.spec,
    quote.time,
  ].filter(Boolean);
  return parts.length ? `Ориентир: ${parts.join(" · ")}` : "";
}
