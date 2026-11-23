import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { trendingProducts, type DemoProduct } from "@/lib/demo-data";
import ProductCard from "./ProductCard";

export type TrendingDealsProps = {
  products?: DemoProduct[];
};

export default function TrendingDeals({ products = trendingProducts }: TrendingDealsProps) {
  return (
    <section id="deals" className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Limited-time sample offers"
          title="Trending deals"
          description="Deal labels and original prices are demonstration values only and are not live offers."
          badge="Demo data"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
