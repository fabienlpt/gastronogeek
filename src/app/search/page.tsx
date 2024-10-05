import { getRecipes } from "@/lib/api";
import ClientSearch from "./clientSearch";

export default async function SearchPage() {
  const recipes = await getRecipes();

  return <ClientSearch initialRecipes={recipes} />;
}
