import Image from "next/image";
import type { DemoCategory } from "@/lib/demo-data";

type CategoryCardProps = {
  category: DemoCategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-ink-950/5 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-panel motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/3]">
        <Image
          src={category.image}
          alt={`Demonstration image for ${category.name}`}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
          unoptimized
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-ink-950">{category.name}</h3>
        <p className="mt-1 text-sm leading-6 text-ink-500">{category.description}</p>
      </div>
    </article>
  );
}
