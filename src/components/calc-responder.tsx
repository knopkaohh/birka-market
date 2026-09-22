import Image from "next/image";
import { company, salesContact } from "@/lib/site";

export function CalcResponder({ light = false }: { light?: boolean }) {
  const person = salesContact;
  if (!person) return null;

  return (
    <div className={`calc-responder ${light ? "is-light" : ""}`}>
      <div className="calc-responder-photo">
        <Image src={person.photo} alt={person.name} fill sizes="56px" />
      </div>
      <p>
        <strong>Вам ответит {person.name}</strong>
        <span>
          {person.role}. Обычно перезваниваем в течение 2 часов в рабочие дни, {company.hours}.
        </span>
      </p>
    </div>
  );
}
