# Mega Market MiniApp PRO (Blue)

Bu — **professional ko‘k dizayn** bilan Telegram Mini App demo:
- Kategoriyalar (rasmli)
- Mahsulotlar ro‘yxati
- Savat (qty +/-)
- Buyurtma formasi
- Payme / Click tugmalari (demo link)
- Buyurtmalar tarixi (demo)
- Admin panel: buyurtmalar (CSV export), mahsulotlar (CSV import/export)

> ⚠️ Demo versiya: ma’lumotlar `localStorage` da saqlanadi. Real ishlab ketishi uchun **backend + DB** kerak bo‘ladi.

---

## 1) Ishga tushirish (kompyuterda)

```bash
npm install
npm run dev
```

Brauzerda: http://localhost:3000

Agar `localhost` ochilmasa:
- Windows Firewall ruxsat berish
- `npm run dev` terminali yopilmagan bo‘lsin

---

## 2) Vercelga chiqarish (deploy)

### Variant A (eng oson): GitHub Desktop bilan
1) GitHub Desktop -> **Add an Existing Repository**
2) `C:\Users\...\mega-miniapp-pro-blue` papkani tanlang
3) **Publish repository** (public yoki private)
4) Vercel -> New Project -> GitHub repo -> Deploy

### Variant B: Git install qilib terminaldan
- Git o‘rnating (Windows): https://git-scm.com/download/win
Keyin:
```bash
git init
git add .
git commit -m "init"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

---

## 3) Telegramga ulash (Mini App)
BotFather:
- /newbot -> token oling
- /setdomain -> `https://SIZNING-VERCEL-DOMAIN.vercel.app`
- /setmenubutton -> Web App -> URL = shu domain

Mini App ichida buyurtma yuborish:
- frontend `tg.sendData(JSON)` ishlatadi
- bot tomonda `web_app_data` eventni ushlaysiz

---

## 4) Payme / Click
Hozircha `CheckoutForm` ichida demo URL:
- Payme: https://payme.uz/
- Click: https://click.uz/

Real integratsiya uchun:
- backendda order yaratish
- payment link generatsiya qilish
- tg.openLink() ga real link berish

---

## CSV / Excel
Admin panel:
- Orders -> CSV export
- Products -> CSV import/export (Excel -> Save As -> CSV)

---

Agar xohlasangiz keyingi bosqichda:
✅ backend (Node/Python), DB (PostgreSQL)
✅ admin login
✅ Payme/Click real integratsiya
✅ Excel/XLSX import (SheetJS)
✅ to‘liq dizayn (Figma-style) qilib beraman.
