import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { featuredProducts, type DemoProduct } from "@/lib/demo-data";
import ProductCard from "./ProductCard";

export type FeaturedProductsProps = {
  products?: DemoProduct[];
};

export default function FeaturedProducts({ products = featuredProducts }: FeaturedProductsProps) {
  return (
    <section id="featured-products" className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Handpicked"
          title="Featured products"
          description="Sample product cards with pricing, ratings and discount labels for interface demonstration."
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
