import SectionHeading from "@/components/common/SectionHeading";
import Container from "@/components/common/Container";
import { demoCategories, demoNotice, type DemoCategory } from "@/lib/demo-data";
import CategoryCard from "./CategoryCard";

export type CategorySectionProps = {
  categories?: DemoCategory[];
  notice?: string;
};

export default function CategorySection({
  categories = demoCategories,
  notice = demoNotice
}: CategorySectionProps) {
  return (
    <section id="categories" className="py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow="Explore"
          title="Shop by category"
          description={notice}
          badge="Demo data"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
