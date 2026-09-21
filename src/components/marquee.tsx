import Link from "next/link";
import { tickerItems } from "@/lib/site";

function MarqueeGroup({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={ariaHidden || undefined}>
      {tickerItems.map((item, index) => (
        <Link key={`${item.label}-${index}`} href={item.href} prefetch={false} tabIndex={-1}>
          {item.label}
          <span>✦</span>
        </Link>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup ariaHidden />
      </div>
    </div>
  );
}
