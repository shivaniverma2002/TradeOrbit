import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  inverse?: boolean;
};

export default function BrandMark({ compact = false, inverse = false }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label="TradeOrbit home"
      className="inline-flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
    >
      <span
        className={`relative grid shrink-0 place-items-center rounded-2xl ${
          compact ? "size-9" : "size-11"
        } ${
          inverse
            ? "bg-white/10 ring-1 ring-white/20"
            : "bg-gradient-to-br from-brand-600 to-brand-500 shadow-control"
        }`}
        aria-hidden="true"
      >
        <span className="absolute inset-2 rounded-full border border-white/35" />
        <span className="absolute inset-[9px] rounded-full border border-white/25" />
        <span className="size-2 rounded-full bg-white shadow-[0_0_16px_rgba(255,255,255,0.9)]" />
      </span>
      <span className={`font-semibold tracking-tight ${compact ? "text-lg" : "text-xl"}`}>
        Trade<span className={inverse ? "text-brand-200" : "text-brand-600"}>Orbit</span>
      </span>
    </Link>
  );
}
