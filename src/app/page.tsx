import React from "react";
import { getRecipes } from "@/lib/api";
import RecipeCard from "@/components/recipeCard";

async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nos Recettes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;
