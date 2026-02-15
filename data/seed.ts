import type { Category, Product } from "@/lib/types";

export const CATEGORIES: Category[] = [
  {
    slug: "dairy",
    title: "Sut mahsulotlari",
    subtitle: "Sut, yog', qaymoq, pishloq",
    heroImage: "/images/cat-dairy.svg",
  },
  {
    slug: "grains",
    title: "Un va don mahsulotlari",
    subtitle: "Un, guruch, yorma, makaron",
    heroImage: "/images/cat-grains.svg",
  },
  {
    slug: "drinks",
    title: "Ichimliklar",
    subtitle: "Suv, kola, sharbat",
    heroImage: "/images/cat-drinks.svg",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "cola-1",
    category: "drinks",
    title: "Cola 1L",
    subtitle: "Sovuq ichimlik",
    price: 12000,
    image: "/images/p-cola.svg",
    inStock: true,
  },
  {
    id: "milk-1",
    category: "dairy",
    title: "Sut 1L",
    subtitle: "Yangi, tabiiy",
    price: 9000,
    image: "/images/p-milk.svg",
    inStock: true,
  },
  {
    id: "bread-1",
    category: "grains",
    title: "Non",
    subtitle: "Issiq, yangi",
    price: 3000,
    image: "/images/p-bread.svg",
    inStock: true,
  },
  {
    id: "pasta-450",
    category: "grains",
    title: "Makaron 450g",
    subtitle: "Premium sifat",
    price: 17000,
    image: "/images/p-pasta.svg",
    inStock: true,
  },
  {
    id: "pasta-500",
    category: "grains",
    title: "Makaron 500g",
    subtitle: "Yumshoq ta’m",
    price: 65000,
    image: "/images/p-pasta2.svg",
    inStock: true,
  },
  {
    id: "ramen-120",
    category: "grains",
    title: "Tez tayyor lapsha 120g",
    subtitle: "3 daqiqada tayyor",
    price: 14000,
    image: "/images/p-ramen.svg",
    inStock: true,
  },
];
