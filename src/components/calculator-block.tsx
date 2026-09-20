import { Clock3 } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

export function CalculatorBlock({
  defaultProduct,
  title = "Расскажите\nо вашей задаче",
}: {
  defaultProduct?: string;
  title?: string;
}) {
  return (
    <section className="calculator-section" id="calc">
      <div className="calculator-intro">
        <span className="section-number light">РАСЧЁТ ЗАКАЗА</span>
        <h2>
          {title.split("\n").map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h2>
        <p>
          Можно не знать точных параметров. Оставьте телефон — менеджер уточнит задачу,
          поможет с материалом и подготовит расчёт.
        </p>
        <div className="calc-promise">
          <Clock3 />
          <span>
            <strong>Свяжемся в рабочее время</strong>
            <br />Пн–Пт, 09:00–18:00
          </span>
        </div>
      </div>
      <LeadForm key={defaultProduct ?? "unknown"} defaultProduct={defaultProduct} />
    </section>
  );
}
