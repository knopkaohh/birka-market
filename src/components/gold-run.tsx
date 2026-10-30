function GoldRunGroup({ line, hidden }: { line: string; hidden?: boolean }) {
  return (
    <span aria-hidden={hidden || undefined}>
      {line}
      <i> ✦ </i>
    </span>
  );
}

/** Бегущая строка в том же приёме, что меню, только золотая. */
export function GoldRun({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const line = items.join("   ✦   ");
  return (
    <div className={`gold-run${reverse ? " is-reverse" : ""}`} aria-hidden="true">
      <div className="gold-run-track">
        <GoldRunGroup line={line} />
        <GoldRunGroup line={line} hidden />
      </div>
    </div>
  );
}
