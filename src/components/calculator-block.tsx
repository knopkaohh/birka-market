import { LeadForm } from "@/components/lead-form";
import { CalcResponder } from "@/components/calc-responder";

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
        <CalcResponder />
      </div>
      <LeadForm key={defaultProduct ?? "unknown"} defaultProduct={defaultProduct} />
    </section>
  );
}
