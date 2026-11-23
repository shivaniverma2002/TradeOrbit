import Image from "next/image";
import type { DemoProduct } from "@/lib/demo-data";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

export type ProductCardProps = {
  product: DemoProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink-950/5 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-panel motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[5/4]">
        <Image
          src={product.image}
          alt={`Demonstration image of ${product.name}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          unoptimized
        />
        {product.discountLabel ? (
          <span className="absolute left-4 top-4 rounded-full bg-ink-950/85 px-3 py-1 text-xs font-semibold text-white">
            {product.discountLabel}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          {product.category}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-6 text-ink-950">{product.name}</h3>
        <ProductRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          productName={product.name}
        />
        <ProductPrice price={product.price} originalPrice={product.originalPrice} />
        <button
          type="button"
          disabled
          title="Cart is unavailable in this demonstration"
          aria-label={`Add ${product.name} to cart, unavailable in this demonstration`}
          className="mt-5 h-11 w-full rounded-2xl border border-brand-200 bg-brand-50 text-sm font-semibold text-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
