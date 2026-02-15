"use client";

import { useMemo, useState } from "react";
import type { Category } from "@/lib/types";
import { Drawer } from "@/components/Drawer";
import { SideMenu } from "@/components/SideMenu";
import { TopBar } from "@/components/TopBar";
import { CategoryCard } from "@/components/CategoryCard";
import { PRODUCTS } from "@/data/seed";
import { useCart } from "@/lib/cart";
import { CartView } from "@/components/CartView";
import { CheckoutForm } from "@/app/ui/checkout-form";

export function HomeClient({ categories }: { categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [q, setQ] = useState("");

  const products = PRODUCTS; // demo; admin panel can override via localStorage later
  const cart = useCart(products);

  const filteredCats = useMemo(() => {
    if (!q.trim()) return categories;
    const t = q.toLowerCase();
    return categories.filter(c => (c.title + " " + (c.subtitle ?? "")).toLowerCase().includes(t));
  }, [categories, q]);

  return (
    <div>
      <TopBar
        title="Kategoriyalar"
        cartCount={cart.count}
        onMenu={() => setMenuOpen(true)}
        onSearch={() => {
          const val = prompt("Qidirish (kategoriya):");
          if (val !== null) setQ(val);
        }}
        onCart={() => setCartOpen(true)}
      />

      <div className="container-max">
        <div className="card p-4 mb-4">
          <div className="text-[14px] font-extrabold">Mega Market PRO katalog</div>
          <div className="soft text-[13px] mt-1">
            Telegram ichida professional ko‘k dizayn. Savat, buyurtma, admin panel (demo).
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredCats.map((c) => (
            <CategoryCard key={c.slug} c={c} />
          ))}
        </div>

        <div className="h-6" />
        <div className="card p-4">
          <div className="font-extrabold">Tezkor</div>
          <div className="soft text-[13px] mt-1">
            Savatga mahsulot qo‘shib ko‘ring → “Buyurtma berish”.
          </div>
        </div>
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} title="Menyu">
        <SideMenu />
      </Drawer>

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
