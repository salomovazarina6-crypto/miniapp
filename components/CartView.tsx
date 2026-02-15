"use client";

import { moneyUZS } from "@/lib/money";
import { IconMinus, IconPlus } from "@/components/Icon";

export function CartView({
  items,
  total,
  onAdd,
  onDec,
  onRemove,
  onCheckout,
}: {
  items: Array<{ productId: string; qty: number; product: { title: string; price: number } ; line: number }>;
  total: number;
  onAdd: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="card p-4">
          <div className="font-extrabold">Savat bo‘sh</div>
          <div className="soft text-[13px] mt-1">Mahsulot qo‘shing, keyin buyurtma berasiz.</div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.productId} className="card p-3 flex items-center gap-3">
                <div className="flex-1">
                  <div className="font-extrabold">{it.product.title}</div>
                  <div className="soft text-[12px] mt-1">
                    {moneyUZS(it.product.price)} so‘m × {it.qty} = <span className="font-bold">{moneyUZS(it.line)} so‘m</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost" onClick={() => onDec(it.productId)}><IconMinus /></button>
                  <div className="badge">{it.qty}</div>
                  <button className="btn btn-primary" onClick={() => onAdd(it.productId)}><IconPlus /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-4 flex items-center justify-between">
            <div>
              <div className="soft text-[12px]">Jami</div>
              <div className="text-[22px] font-extrabold">{moneyUZS(total)} so‘m</div>
            </div>
            <button className="btn btn-primary" onClick={onCheckout}>Buyurtma berish</button>
          </div>
        </>
      )}
    </div>
  );
}
