export type Category = {
  slug: string;
  title: string;
  subtitle?: string;
  heroImage: string;
};

export type Product = {
  id: string;
  category: string; // slug
  title: string;
  subtitle?: string;
  price: number; // UZS
  image: string;
  inStock?: boolean;
};

export type CartItem = { productId: string; qty: number; };

export type Order = {
  id: string;
  createdAt: string; // ISO
  name: string;
  phone: string;
  address: string;
  note?: string;
  items: Array<{ id: string; title: string; price: number; qty: number }>;
  total: number;
  status: "new" | "paid" | "done" | "cancelled";
};
