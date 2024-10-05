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
