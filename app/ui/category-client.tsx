"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { Drawer } from "@/components/Drawer";
import { TopBar } from "@/components/TopBar";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/seed";
import { useCart } from "@/lib/cart";
import { CartView } from "@/components/CartView";
import { CheckoutForm } from "@/app/ui/checkout-form";

export function CategoryClient({
  slug,
  categoryTitle,
  products,
}: {
  slug: string;
  categoryTitle: string;
  products: Product[];
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [q, setQ] = useState("");

  const cart = useCart(PRODUCTS);

  const list = useMemo(() => {
    if (!q.trim()) return products;
    const t = q.toLowerCase();
    return products.filter(p => (p.title + " " + (p.subtitle ?? "")).toLowerCase().includes(t));
  }, [products, q]);

  return (
    <div>
      <TopBar
        title={categoryTitle}
        cartCount={cart.count}
        onMenu={() => history.back()}
        onSearch={() => {
          const val = prompt("Qidirish (mahsulot):");
          if (val !== null) setQ(val);
        }}
        onCart={() => setCartOpen(true)}
      />

      <div className="container-max">
        <div className="mb-3 flex items-center justify-between">
          <Link className="btn btn-ghost" href="/">← Orqaga</Link>
          <span className="badge">{list.length} ta</span>
        </div>

        <div className="space-y-3">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} onAdd={() => cart.add(p.id)} />
          ))}
        </div>

        <div className="h-28" />
      </div>

      {/* bottom mini cart bar */}
      {cart.count > 0 && (
        <div className="fixed bottom-3 left-0 right-0 z-40">
          <div className="container-max">
            <button
              className="btn btn-primary w-full justify-between"
              onClick={() => setCartOpen(true)}
            >
              <span>🛒 Savat ({cart.count})</span>
              <span>{new Intl.NumberFormat("ru-RU").format(cart.total).replaceAll(",", " ")} so‘m →</span>
            </button>
          </div>
        </div>
      )}

      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title="Savat">
        <CartView
          items={cart.enriched}
          total={cart.total}
          onAdd={(id) => cart.add(id)}
          onDec={(id) => cart.dec(id)}
          onRemove={(id) => cart.remove(id)}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      </Drawer>

      <Drawer open={checkoutOpen} onClose={() => setCheckoutOpen(false)} title="Buyurtma berish">
        <CheckoutForm
          cartItems={cart.enriched}
          total={cart.total}
          onDone={() => {
            cart.clear();
            setCheckoutOpen(false);
          }}
        />
      </Drawer>
    </div>
  );
}
