export type ProductRatingProps = {
  rating: number;
  reviewCount: number;
  productName: string;
};

export default function ProductRating({
  rating,
  reviewCount,
  productName
}: ProductRatingProps) {
  return (
    <p className="mt-3 flex items-center gap-2 text-sm text-ink-500">
      <svg
        viewBox="0 0 20 20"
        className="size-4 text-amber-500"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10 1.8l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z" />
      </svg>
      <span
        aria-label={`Rated ${rating} out of 5 from ${reviewCount} demonstration reviews for ${productName}`}
      >
        {rating.toFixed(1)} <span className="text-ink-500/70">({reviewCount})</span>
      </span>
    </p>
  );
}
