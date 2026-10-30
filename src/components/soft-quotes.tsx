import type { CSSProperties } from "react";

export function SoftQuotes({
  items,
}: {
  items: readonly { text: string; sign: string }[];
}) {
  return (
    <ul className="soft-quotes">
      {items.map((item, index) => (
        <li key={item.sign} className="soft-quote" style={{ "--i": index } as CSSProperties}>
          <p>{item.text}</p>
          <span>{item.sign}</span>
        </li>
      ))}
    </ul>
  );
}
