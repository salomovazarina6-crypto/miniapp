import { CATEGORIES } from "@/data/seed";
import { HomeClient } from "@/app/ui/home-client";

export default function Page() {
  return <HomeClient categories={CATEGORIES} />;
}
