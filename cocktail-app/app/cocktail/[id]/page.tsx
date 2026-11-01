import CocktailDetail from "@/components/CocktailDetail";
import { cocktails } from "@/lib/cocktails";

export const dynamicParams = false;

export function generateStaticParams() {
  return cocktails.map((c) => ({ id: c.id }));
}

export default function CocktailDetailPage() {
  return <CocktailDetail />;
}
