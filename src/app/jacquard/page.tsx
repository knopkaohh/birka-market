import type { Metadata } from "next";
import { ProductLanding } from "@/components/product-landing";
import { jacquardLanding } from "@/lib/landings/vshivnye";
import { landingMetadata } from "@/lib/seo";
import { getProduct } from "@/lib/site";

const jacquardProduct = getProduct("jacquard");

export const metadata: Metadata = jacquardProduct
  ? landingMetadata(jacquardLanding, jacquardProduct)
  : { title: jacquardLanding.seoTitle, description: jacquardLanding.seoDescription };

export default function JacquardPage() {
  return <ProductLanding content={jacquardLanding} />;
}
