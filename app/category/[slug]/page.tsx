import { PRODUCTS, CATEGORIES } from "@/data/seed";
import { CategoryClient } from "@/app/ui/category-client";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find(c => c.slug === slug);
  const products = PRODUCTS.filter(p => p.category === slug);
  return <CategoryClient slug={slug} categoryTitle={category?.title ?? "Kategoriya"} products={products} />;
}
