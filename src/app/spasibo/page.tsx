import type { Metadata } from "next";
import { ThanksCard } from "@/components/thanks-card";

export const metadata: Metadata = {
  title: "Спасибо за заявку",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <div className="thanks-screen">
      <ThanksCard />
    </div>
  );
}
