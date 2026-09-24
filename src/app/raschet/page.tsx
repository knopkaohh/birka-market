import type { Metadata } from "next";
import { CalculatorBlock } from "@/components/calculator-block";
import { getProduct } from "@/lib/site";

export const metadata: Metadata = {
  title: "Рассчитать заказ бирок и упаковки",
  description:
    "Оставьте заявку на расчёт бирок, упаковки или мерча. Макет бесплатно, производство в Москве. Менеджер свяжется в течение 10 минут.",
};

export default async function CalcPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  const selected = product ? getProduct(product) : undefined;

  return (
    <CalculatorBlock
      heading="h1"
      defaultProduct={selected?.slug ?? "unknown"}
      title="Рассчитать"
      titleAccent="заказ"
      lead={
        selected
          ? `Вы выбрали: ${selected.name}. Укажите тираж и телефон — остальное уточним.`
          : "Выберите продукцию или оставьте заявку на подбор. Макет подготовим бесплатно."
      }
    />
  );
}
