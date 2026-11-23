import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

type HeroTile = {
  src: string;
  alt: string;
};

const heroTiles: HeroTile[] = [
  { src: "/images/product-headphones.svg", alt: "Demonstration image of wireless headphones" },
  { src: "/images/product-sneakers.svg", alt: "Demonstration image of sneakers" },
  { src: "/images/product-lamp.svg", alt: "Demonstration image of a desk lamp" }
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 -top-40 size-[32rem] rounded-full bg-brand-600/30 blur-3xl" />
        <div className="absolute -bottom-52 right-0 size-[36rem] rounded-full bg-indigo-500/20 blur-3xl" />
      </div>
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
            Demo marketplace
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Discover everyday finds in one considered marketplace.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
            Explore sample categories, featured products and vendor profiles in a polished customer
            experience. All catalog content is for demonstration only.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#featured-products"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-ink-950 outline-none transition hover:bg-brand-50 focus-visible:ring-4 focus-visible:ring-brand-300"
            >
              Shop featured finds
            </Link>
            <Link
              href="#categories"
              className="rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white outline-none transition hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-brand-300"
            >
              Browse categories
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block" aria-hidden="true">
          <div className="grid grid-cols-2 gap-4">
            {heroTiles.map((tile, index) => (
              <div
                key={tile.src}
                className={`overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur ${
                  index === 0 ? "col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
