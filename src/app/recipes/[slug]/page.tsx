import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/api";

export default async function RecipeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const recipe = await getRecipe(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-xl text-gray-600 mb-4">{recipe.commonTitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {recipe.images && recipe.images.length > 0 && (
            <Image
              src={recipe.images[0]}
              alt={recipe.title}
              width={500}
              height={300}
              className="rounded-lg object-cover w-full h-64"
            />
          )}

          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Informations</h2>
            <p>Catégorie: {recipe.category}</p>
            <p>Licence: {recipe.license}</p>
            <p>Type: {recipe.type}</p>
            <p>Difficulté: {recipe.difficulty}</p>
            <p>Temps de préparation: {recipe.prepTime}</p>
            {recipe.cookingTime && (
              <p>Temps de cuisson: {recipe.cookingTime}</p>
            )}
            {recipe.restTime && <p>Temps de repos: {recipe.restTime}</p>}
            <p>Pour {recipe.defaultPersons} personnes</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Ingrédients</h2>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity && `${ingredient.quantity} `}
                {ingredient.unit && `${ingredient.unit} `}
                {ingredient.name}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Préparation</h2>
          <ol className="list-decimal pl-5">
            {recipe.steps.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ol>

          {recipe.dressing && (
            <>
              <h2 className="text-2xl font-semibold mt-6 mb-2">Dressage</h2>
              <p>{recipe.dressing}</p>
            </>
          )}
        </div>
      </div>

      {recipe.desc && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p>{recipe.desc}</p>
        </div>
      )}
    </div>
  );
}
