import type { Metadata } from "next";
import { ProductLanding } from "@/components/product-landing";
import { jacquardLanding } from "@/lib/landings/vshivnye";

export const metadata: Metadata = {
  title: jacquardLanding.seoTitle,
  description: jacquardLanding.seoDescription,
};

type Search = { variant?: string };

export default async function JacquardPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { variant } = await searchParams;
  return <ProductLanding content={jacquardLanding} variant={variant} />;
}
