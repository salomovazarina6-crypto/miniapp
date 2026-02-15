"use client";

import Link from "next/link";

export function SideMenu() {
  return (
    <div className="space-y-3">
      <div className="card p-4">
        <div className="font-extrabold text-[16px]">Profil</div>
        <div className="soft text-[13px] mt-1">Til, buyurtmalar, admin</div>
      </div>

      <div className="card p-3 space-y-2">
        <MenuLink href="/">🏠 Kategoriyalar</MenuLink>
        <MenuLink href="/orders">📦 Buyurtmalarim</MenuLink>
        <MenuLink href="/profile">👤 Profil</MenuLink>
        <div className="hr my-2" />
        <MenuLink href="/admin">🛠️ Admin Panel</MenuLink>
      </div>

      <div className="card p-4">
        <div className="soft text-[13px]">
          Bu demo. To‘lov tugmalari uchun Payme/Click havolalarini “.env” ga qo‘yib, backend bilan ulasiz.
        </div>
      </div>
    </div>
  );
}

function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-[14px] px-3 py-2 font-bold"
      style={{ background: "rgba(37,99,235,.08)", border: "1px solid rgba(37,99,235,.14)", color: "#1143c7" }}
    >
      {children}
    </Link>
  );
}
