"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/components/TopBar";
import { Drawer } from "@/components/Drawer";
import { SideMenu } from "@/components/SideMenu";
import { getTg, inTelegram } from "@/lib/telegram";

export function ProfileClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; phone?: string }>(() => ({ name: "", phone: "" }));

  useEffect(() => {
    const tg = getTg();
    tg?.ready?.();
    tg?.expand?.();
    const u = tg?.initDataUnsafe?.user;
    if (u) setUser(prev => ({ ...prev, name: [u.first_name, u.last_name].filter(Boolean).join(" ") }));
  }, []);

  return (
    <div>
      <TopBar title="Profil" cartCount={0} onMenu={() => setMenuOpen(true)} onCart={() => {}} onSearch={() => {}} />
      <div className="container-max">
        <div className="card p-4">
          <div className="font-extrabold text-[18px]">{user.name || "Foydalanuvchi"}</div>
          <div className="soft text-[13px] mt-1">{inTelegram() ? "Telegram MiniApp ichida" : "Brauzer (demo)"}</div>
        </div>

        <div className="h-4" />
        <div className="card p-4 space-y-3">
          <div className="font-extrabold">Sozlamalar</div>
          <div className="soft text-[13px]">Til, manzil va boshqa funksiyalarni keyin qo‘shamiz.</div>
          <button className="btn btn-ghost" onClick={() => getTg()?.close?.()}>Telegramga qaytish</button>
        </div>
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} title="Menyu">
        <SideMenu />
      </Drawer>
    </div>
  );
}
