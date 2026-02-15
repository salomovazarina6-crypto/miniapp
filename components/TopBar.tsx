"use client";

import Link from "next/link";
import { IconCart, IconMenu, IconSearch } from "@/components/Icon";

export function TopBar({
  title,
  cartCount,
  onMenu,
  onSearch,
  onCart,
}: {
  title: string;
  cartCount: number;
  onMenu?: () => void;
  onSearch?: () => void;
  onCart?: () => void;
}) {
  return (
    <div className="sticky top-0 z-40">
      <div className="backdrop-blur-md" style={{ background: "rgba(246,249,255,.75)", borderBottom: "1px solid rgba(15,23,42,.06)" }}>
        <div className="container-max flex items-center gap-3">
          <button className="btn btn-ghost" onClick={onMenu} aria-label="menu">
            <IconMenu />
          </button>
          <div className="flex-1">
            <div className="text-[12px] soft">Mega Market</div>
            <div className="text-[16px] font-extrabold">{title}</div>
          </div>
          <button className="btn btn-ghost" onClick={onSearch} aria-label="search">
            <IconSearch />
          </button>
          <button className="btn btn-primary relative" onClick={onCart} aria-label="cart">
            <IconCart />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 grid place-items-center text-[12px] font-extrabold"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: "white",
                  color: "#1143c7",
                  border: "2px solid rgba(17,67,199,.25)",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
