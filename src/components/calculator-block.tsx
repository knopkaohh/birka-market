import { Check } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { CalcResponder } from "@/components/calc-responder";

export function CalculatorBlock({
  defaultProduct,
  defaultComment,
  title = "Расскажите\nо вашей задаче",
  titleAccent,
  lead = "Можно не знать точных параметров. Оставьте телефон — менеджер свяжется в течение 10 минут, уточнит задачу и подготовит расчёт.",
  heading = "h2",
  surface = "material",
  bullets = ["Быстрый расчёт", "Своё производство", "Макет до печати"],
  defaultQuantity,
}: {
  defaultProduct?: string;
  defaultComment?: string;
  defaultQuantity?: string;
  title?: string;
  titleAccent?: string;
  lead?: string;
  heading?: "h1" | "h2";
  surface?: "dark" | "material";
  bullets?: string[];
}) {
  const lines = title.split("\n");
  const Heading = heading;
  const likeMaterial = surface === "material";
  return (
    <section className={likeMaterial ? "jq-calc" : "calculator-section"} id="calc">
      <div className={likeMaterial ? "jq-calc-intro" : "calculator-intro"}>
        <span className={likeMaterial ? "section-number" : "section-number light"}>РАСЧЁТ ЗАКАЗА</span>
        <Heading>
          {lines.map((line, index) => (
            <span key={line}>
              {line}
              {(index < lines.length - 1 || titleAccent) && <br />}
            </span>
          ))}
          {titleAccent ? <em>{titleAccent}</em> : null}
        </Heading>
        <p>{lead}</p>
        <CalcResponder light={likeMaterial} />
        {likeMaterial && bullets?.length ? (
          <ul>
            {bullets.map((item) => (
              <li key={item}>
                <Check size={16} /> {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <LeadForm
        key={`${defaultProduct ?? "unknown"}-${defaultComment ?? ""}`}
        defaultProduct={defaultProduct}
        defaultComment={defaultComment}
        defaultQuantity={defaultQuantity}
      />
    </section>
  );
}
