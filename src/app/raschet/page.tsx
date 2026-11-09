import type { Metadata } from "next";
import { CalculatorBlock } from "@/components/calculator-block";

export const metadata: Metadata = {
  title: "Расчёт бирок и упаковки на заказ в Москве",
  description:
    "Расчёт бирок, упаковки, ПВХ-патчей и мерча на заказ от производителя Бирка Маркет в Москве. Печать оптом, менеджер ответит за 10 минут.",
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
