import React from "react";
import { getRecipes } from "@/lib/api";
import HighlightRecipe from "@/components/highlightRecipe";

async function RecipesPage() {
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">À propos</h2>
      <h2 className="text-2xl font-bold mb-4">Notre sélection du mois</h2>
      <div className="flex flex-col">
        {recipes.slice(0, 3).map((recipe, index) => (
          <HighlightRecipe key={recipe.slug} recipe={recipe} onLeft={index % 2 === 0} />
        ))}
      </div>
    </div>
  );
}

export default RecipesPage;
