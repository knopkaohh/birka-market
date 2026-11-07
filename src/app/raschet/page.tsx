import type { Metadata } from "next";
import { CalculatorBlock } from "@/components/calculator-block";

export const metadata: Metadata = {
  title: "Рассчитать заказ бирок и упаковки",
  description:
    "Оставьте заявку на расчёт бирок, упаковки или мерча. Производство в Москве. Менеджер свяжется в течение 10 минут.",
  alternates: { canonical: "https://birka-market.ru/raschet" },
};

export default function CalcPage() {
  return (
    <CalculatorBlock
      heading="h1"
      defaultProduct="unknown"
      title="Рассчитать"
      titleAccent="заказ"
      lead="Выберите продукцию или оставьте заявку на подбор."
    />
  );
}
