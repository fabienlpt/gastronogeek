import { getRecipes } from "@/lib/api";
import ClientRecipes from "./clientRecipes";

interface RecipesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const recipes = await getRecipes();

  return <ClientRecipes recipes={recipes} searchParams={searchParams} />;
}
