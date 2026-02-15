"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import { moneyUZS } from "@/lib/money";
import { IconPlus } from "@/components/Icon";

export function ProductCard({
  p,
  onAdd,
}: {
  p: Product;
  onAdd: () => void;
}) {
  return (
    <div className="card p-3 flex gap-3 items-center">
      <div className="relative h-[72px] w-[88px] overflow-hidden rounded-[14px]" style={{ border: "1px solid rgba(15,23,42,.08)" }}>
        <Image src={p.image} alt={p.title} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="font-extrabold leading-tight">{p.title}</div>
        {p.subtitle && <div className="soft text-[12px] mt-1 line-clamp-1">{p.subtitle}</div>}
        <div className="mt-2 font-extrabold text-[18px]" style={{ color: "#1143c7" }}>
          {moneyUZS(p.price)} so‘m
        </div>
      </div>
      <button className="btn btn-primary" onClick={onAdd} disabled={p.inStock === false} title="Qo‘shish">
        <IconPlus />
      </button>
    </div>
  );
}
