import { getRecipe, getSimilarRecipes } from "@/lib/api";
import { notFound } from "next/navigation";
import ClientRecipe from "./clientRecipe";

export default async function RecipeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipe(params.slug);
  const similarRecipes = await getSimilarRecipes(recipe);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <ClientRecipe recipe={recipe} similarRecipes={similarRecipes} />
    </div>
  );
}
