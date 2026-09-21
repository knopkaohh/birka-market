import { Clock3 } from "lucide-react";
import { LeadForm } from "@/components/lead-form";

export function CalculatorBlock({
  defaultProduct,
  title = "Расскажите\nо вашей задаче",
  titleAccent,
  lead = "Можно не знать точных параметров. Оставьте телефон — менеджер уточнит задачу, поможет с материалом и подготовит расчёт.",
}: {
  defaultProduct?: string;
  title?: string;
  titleAccent?: string;
  lead?: string;
}) {
  const lines = title.split("\n");
  return (
    <section className="calculator-section" id="calc">
      <div className="calculator-intro">
        <span className="section-number light">РАСЧЁТ ЗАКАЗА</span>
        <h2>
          {lines.map((line, index) => (
            <span key={line}>
              {line}
              {(index < lines.length - 1 || titleAccent) && <br />}
            </span>
          ))}
          {titleAccent ? <em>{titleAccent}</em> : null}
        </h2>
        <p>{lead}</p>
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
