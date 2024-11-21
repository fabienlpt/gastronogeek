"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Recipe } from "@/types/recipe";
import { useStore } from "@/lib/store";

export default function ClientRecipe({ recipe }: { recipe: Recipe }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div ref={containerRef} className="container mx-auto pt-20 mb-28">
      <h1 className="recipe-title text-4xl font-bold mb-2 text-center">
        {recipe.title}
      </h1>
      <p className="recipe-subtitle text-xl text-gray-600 mb-8 text-center">
        {recipe.commonTitle}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
              <div className="image-thumbnails flex space-x-2 mb-4">
                {recipe.images.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className="relative w-1/3 h-24 cursor-pointer"
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${recipe.title} - Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md recipe-img"
                    />
                    {index === 2 && recipe.images.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
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

          <div className="recipe-info bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Informations</h2>
            <div className="grid grid-cols-2 gap-4">
              <p>
                <span className="font-medium">Catégorie:</span>{" "}
                {recipe.category}
              </p>
              <p>
                <span className="font-medium">Licence:</span> {recipe.license}
              </p>
              <p>
                <span className="font-medium">Type:</span> {recipe.type}
              </p>
              <p>
                <span className="font-medium">Difficulté:</span>{" "}
                {recipe.difficulty}
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
              <p>
                <span className="font-medium">Pour:</span>{" "}
                {recipe.defaultPersons} personnes
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="ingredients-section bg-gray-100 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4">Ingrédients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  {ingredient.quantity && `${ingredient.quantity} `}
                  {ingredient.unit && `${ingredient.unit} `}
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="preparation-section bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Préparation</h2>
            <ol className="space-y-4">
              {recipe.steps.map((step, index) => (
                <li key={index} className="step-item flex">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {(recipe.dressing || recipe.desc) && (
        <div className="additional-info mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
          {recipe.dressing && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Dressage</h2>
              <p className="mb-6">{recipe.dressing}</p>
            </>
          )}
          {recipe.desc && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p>{recipe.desc}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
