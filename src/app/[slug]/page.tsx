import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductLanding } from "@/components/product-landing";
import { getLanding } from "@/lib/landings";
import { landingMetadata } from "@/lib/seo";
import { getProduct, products } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return products
    .filter((item) => item.slug !== "jacquard" && item.slug !== "sozdanie-sajtov")
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const landing = getLanding(slug);
  const product = getProduct(slug);
  if (!landing || !product) return {};
  return landingMetadata(landing, product);
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const landing = getLanding(slug);
  if (!landing || !getProduct(slug)) notFound();
  return <ProductLanding content={landing} />;
}
