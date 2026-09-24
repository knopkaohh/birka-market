import type { Metadata } from "next";
import { ProductLanding } from "@/components/product-landing";
import { jacquardLanding } from "@/lib/landings/vshivnye";
import { landingMetadata } from "@/lib/seo";
import { getProduct } from "@/lib/site";

const jacquardProduct = getProduct("jacquard");

export const metadata: Metadata = jacquardProduct
  ? landingMetadata(jacquardLanding, jacquardProduct)
  : { title: jacquardLanding.seoTitle, description: jacquardLanding.seoDescription };

type Search = {
  variant?: string;
  qty?: string;
  size?: string;
  spec?: string;
  time?: string;
  price?: string;
};

export default async function JacquardPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { variant, qty, size, spec, time, price } = await searchParams;
  return (
    <ProductLanding
      content={jacquardLanding}
      variant={variant}
      quote={{ qty, size, spec, time, price }}
    />
  );
}
