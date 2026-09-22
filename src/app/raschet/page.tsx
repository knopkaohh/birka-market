import type { Metadata } from "next";
import { CalculatorBlock } from "@/components/calculator-block";
import { getProduct } from "@/lib/site";

export const metadata: Metadata = {
  title: "Рассчитать заказ",
  description: "Оставьте параметры заказа — менеджер и технолог подготовят расчёт и бесплатный макет.",
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
      defaultProduct={selected?.slug ?? "unknown"}
      title="Рассчитать"
      titleAccent="стоимость заказа"
      lead={
        selected
          ? `Вы выбрали: ${selected.name}. Укажите тираж и телефон — остальное уточним.`
          : "Выберите продукцию или оставьте заявку на подбор. Макет подготовим бесплатно."
      }
    />
  );
}
