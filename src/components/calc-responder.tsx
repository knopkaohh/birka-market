import { company } from "@/lib/site";

export function CalcResponder({ light = false }: { light?: boolean }) {
  return (
    <p className={`calc-promise ${light ? "is-light" : ""}`}>
      <strong>Менеджер свяжется в течение {company.replyIn}</strong>
      <span>
        В рабочее время {company.hours}. Если задача срочная — позвоните или напишите в мессенджер.
      </span>
    </p>
  );
}
