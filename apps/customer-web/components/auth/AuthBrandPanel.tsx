import Image from "next/image";
import BrandMark from "./BrandMark";

type AuthBrandPanelProps = {
  title?: string;
  description?: string;
};

export default function AuthBrandPanel({
  title = "A smarter way to shop across trusted marketplaces.",
  description = "TradeOrbit brings discovery, seller signals and secure account access into one calm, considered experience."
}: AuthBrandPanelProps) {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-ink-950 lg:block">
      <Image
        src="/images/login-lifestyle.svg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="(min-width: 1024px) 52vw, 100vw"
        unoptimized
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink-950/90 via-ink-950/65 to-ink-950/25"
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-dvh flex-col justify-between px-10 py-10 text-white xl:px-16 xl:py-12">
        <div className="flex items-center justify-between gap-6">
          <BrandMark inverse />
          <span className="rounded-full border border-white/20 bg-ink-950/30 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 backdrop-blur">
            Customer marketplace
          </span>
        </div>

        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-200">
            Discover with confidence
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight drop-shadow-lg xl:text-[3.35rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 drop-shadow xl:text-lg">
            {description}
          </p>
        </div>

        <p className="text-xs text-white/60">
          Built on centralized TradeOrbit account security.
        </p>
      </div>
    </aside>
  );
}
