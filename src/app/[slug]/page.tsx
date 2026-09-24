import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/product-landing";
import { getLanding } from "@/lib/landings";
import { landingMetadata } from "@/lib/seo";
import { getProduct, products } from "@/lib/site";

type Params = { slug: string };
type Search = {
  variant?: string;
  qty?: string;
  size?: string;
  spec?: string;
  time?: string;
  price?: string;
};

export function generateStaticParams() {
  return products.filter((item) => item.slug !== "jacquard").map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const landing = getLanding(slug);
  const product = getProduct(slug);
  if (!landing || !product) return {};
  return landingMetadata(landing, product);
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;
  const { variant, qty, size, spec, time, price } = await searchParams;
  const landing = getLanding(slug);
  if (!landing) notFound();
  return (
    <ProductLanding
      content={landing}
      variant={variant}
      quote={{ qty, size, spec, time, price }}
    />
  );
}
