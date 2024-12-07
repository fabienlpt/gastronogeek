import { Recipe } from "@/types/recipe";

export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch("https://api-gastronogeek.vercel.app/api/recipes/");

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}

export async function getRecipe(slug: string): Promise<Recipe> {
  const res = await fetch(
    `https://api-gastronogeek.vercel.app/api/recipes/${slug}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }

  return res.json();
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const recipes = await getRecipes();
  const searchTerm = query.toLowerCase();

  return recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.commonTitle.toLowerCase().includes(searchTerm)
  );
}

export async function getSimilarRecipes(recipe: Recipe): Promise<Recipe[]> {
  const recipes = await getRecipes();

  return recipes
    .filter(
      (r) =>
        r.slug !== recipe.slug &&
        (r.license === recipe.license || r.type === recipe.type)
    )
    .slice(0, 3);
}
