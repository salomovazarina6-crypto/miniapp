import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";

export function CategoryCard({ c }: { c: Category }) {
  return (
    <Link href={`/category/${c.slug}`} className="card block overflow-hidden">
      <div className="relative h-[150px]">
        <Image
          src={c.heroImage}
          alt={c.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4">
        <div className="text-[16px] font-extrabold">{c.title}</div>
        {c.subtitle && <div className="soft text-[13px] mt-1">{c.subtitle}</div>}
      </div>
    </Link>
  );
}
