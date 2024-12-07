"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Recipe } from "@/types/recipe";
import { useStore } from "@/lib/store";
import HighlightRecipe from "@/components/highlightRecipe";

export default function ClientRecipe({
  recipe,
  similarRecipes,
}: {
  recipe: Recipe;
  similarRecipes: Recipe[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nbPersons, setNbPersons] = useState(recipe.defaultPersons);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setIsTransitionActive } = useStore();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const masterTimeline = gsap.timeline({
        paused: true,
        onComplete: () => setIsTransitionActive(false),
      });

      timelineRef.current = masterTimeline;

      masterTimeline
        .from(".recipe-title", {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".recipe-subtitle",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".recipe-image",
          {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".image-thumbnails",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".recipe-info",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".ingredients-section",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".ingredient-item",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".preparation-section",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".step-item",
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );

      if (recipe.dressing || recipe.desc) {
        masterTimeline.from(
          ".additional-info",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }

      masterTimeline.play();
    },
    { scope: containerRef }
  );

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      gsap.killTweensOf(containerRef.current);
    };
  }, []);

  function getQuantity(quantity: number) {
    return (quantity / recipe.defaultPersons) * nbPersons;
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const getDifficultyLabel = (difficulty: number): string => {
    switch (difficulty) {
      case 1:
        return "Facile";
      case 2:
        return "Intermédiaire";
      case 3:
        return "Difficile";
      default:
        return "Inconnu";
    }
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 pt-20 mb-28">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="recipe-title text-4xl font-bold mb-2 text-center">
          {recipe.title}
        </h1>
        <p className="recipe-subtitle text-xl text-gray-400 text-center">
          {recipe.commonTitle}
        </p>
      </div>

      {/* Zone avec deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Colonne images */}
        <div>
          {recipe.images && recipe.images.length > 0 && (
            <>
              <div className="recipe-image relative h-96 mb-4">
                <Image
                  src={recipe.images[currentImageIndex]}
                  alt={recipe.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg recipe-img"
                />
              </div>
              <div className="image-thumbnails flex gap-4">
                {recipe.images.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-1/3 h-24 cursor-pointer overflow-hidden rounded-lg ${
                      currentImageIndex === index
                        ? "ring-2 ring-cyan-500"
                        : "hover:opacity-80"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${recipe.title} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="recipe-img"
                    />
                    {index === 2 && recipe.images.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          +{recipe.images.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Colonne informations */}
        <div className="recipe-info bg-cyan-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Informations</h2>
          <div className="grid grid-cols-2 gap-y-6">
            <p>
              <span className="font-medium">Catégorie:</span> {recipe.category}
            </p>
            <p>
              <span className="font-medium">Licence:</span> {recipe.license}
            </p>
            <p>
              <span className="font-medium">Type:</span> {recipe.type}
            </p>
            <p>
              <span className="font-medium">Difficulté:</span>{" "}
              {getDifficultyLabel(recipe.difficulty)}
            </p>
            <p>
              <span className="font-medium">Préparation:</span>{" "}
              {recipe.prepTime}
            </p>
            {recipe.cookingTime && (
              <p>
                <span className="font-medium">Cuisson:</span>{" "}
                {recipe.cookingTime}
              </p>
            )}
            {recipe.restTime && (
              <p>
                <span className="font-medium">Repos:</span> {recipe.restTime}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description si elle existe */}
      {recipe.desc && (
        <div className="mb-12 bg-cyan-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p>{recipe.desc}</p>
        </div>
      )}

      {/* Ingrédients */}
      <div className="ingredients-section mb-12 bg-cyan-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Ingrédients</h2>
          <div className="flex items-center gap-2">
            <span className="font-medium">Pour:</span>
            <input
              type="number"
              value={nbPersons}
              onChange={(e) => setNbPersons(parseInt(e.target.value))}
              className="w-16 h-8 text-center border border-gray-300 rounded-md bg-transparent"
              min="1"
            />
            <span>personne{nbPersons > 1 && "s"}</span>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="ingredient-item flex items-center">
              <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                {index + 1}
              </span>
              <span>
                {ingredient.quantity && `${getQuantity(ingredient.quantity)} `}
                {ingredient.unit && `${ingredient.unit} `}
                {ingredient.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Préparation */}
      <div className="preparation-section mb-12 bg-cyan-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Préparation</h2>
        <ol className="space-y-6">
          {recipe.steps.map((step, index) => (
            <li key={index} className="step-item flex items-start">
              <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                {index + 1}
              </span>
              <span className="flex-1">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Dressage si il existe */}
      {recipe.dressing && (
        <div className="mb-12 bg-cyan-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Dressage</h2>
          <p>{recipe.dressing}</p>
        </div>
      )}

      {similarRecipes.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Recettes similaires</h2>
          <div className="space-y-12">
            {similarRecipes.map((similarRecipe, index) => (
              <HighlightRecipe
                key={similarRecipe.slug}
                recipe={similarRecipe}
                onLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
