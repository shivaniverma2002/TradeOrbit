export type ProductPriceProps = {
  price: number;
  originalPrice?: number;
  currency?: string;
  locale?: string;
};

export default function ProductPrice({
  price,
  originalPrice,
  currency = "USD",
  locale = "en-US"
}: ProductPriceProps) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  });

  return (
    <div className="mt-4 flex items-baseline gap-2">
      <span className="text-lg font-semibold text-ink-950">{formatter.format(price)}</span>
      {originalPrice ? (
        <span className="text-sm text-ink-500 line-through">
          {formatter.format(originalPrice)}
        </span>
      ) : null}
    </div>
  );
}
