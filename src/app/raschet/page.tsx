import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalculatorBlock } from "@/components/calculator-block";
import { getProduct } from "@/lib/site";

export const metadata: Metadata = {
  title: "Рассчитать стоимость",
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
    <>
      <div className="inner-page">
        <div className="inner-hero">
          <Breadcrumbs items={[{ label: "Расчёт" }]} />
          <span className="section-number">ЗАЯВКА</span>
          <h1>
            Рассчитать
            <br />
            <em>стоимость заказа</em>
          </h1>
          <p>
            {selected
              ? `Вы выбрали: ${selected.name}. Укажите тираж и телефон — остальное уточним.`
              : "Выберите продукцию или оставьте заявку на подбор. Макет подготовим бесплатно."}
          </p>
        </div>
      </div>
      <CalculatorBlock defaultProduct={selected?.slug ?? "unknown"} />
    </>
  );
}
