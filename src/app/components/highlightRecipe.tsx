"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { Recipe } from "@/types/recipe";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TransitionLink from "./transitionLink";

interface HighlightRecipeProps {
  recipe: Recipe;
  onLeft: boolean;
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

const HighlightRecipe: React.FC<HighlightRecipeProps> = ({
  recipe,
  onLeft,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(containerRef.current.querySelector(".recipe-content"), {
        opacity: 0,
        x: onLeft ? 50 : -50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { dependencies: [onLeft], scope: containerRef }
  );

  return (
    <TransitionLink url={`/recipes/${recipe.slug}`} className="block">
      <div
        ref={containerRef}
        className={`relative flex w-full h-96 group ${
          onLeft ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div
          className={`w-1/2 h-full relative overflow-hidden ${
            onLeft ? "rounded-l-lg" : "rounded-r-lg"
          }`}
        >
          {recipe.images && recipe.images.length > 0 ? (
            <Image
              src={recipe.images[0]}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              className="recipe-img"
              quality={75}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Pas d&apos;image</span>
            </div>
          )}
        </div>
        <div
          className={`recipe-content w-1/2 h-full p-4 flex flex-col justify-between overflow-hidden ${
            onLeft
              ? "rounded-r-lg bg-[linear-gradient(225deg,_rgba(8,145,178,0.8)_0%,_rgba(8,145,178,0.6)_20%,_#1E293B_100%)]"
              : "rounded-l-lg bg-[linear-gradient(135deg,_rgba(168,85,247,0.8)_0%,_rgba(168,85,247,0.6)_20%,_#1e293b_100%)]"
          }`}
        >
          <div>
            <h3 className="text-white font-bold text-lg truncate">
              {recipe.title}
            </h3>
            <p className="text-gray-200 text-sm truncate">
              {recipe.commonTitle}
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white truncate max-w-[50%]">
                {recipe.category}
              </span>
              <span className="text-sm text-gray-300 truncate max-w-[45%]">
                {recipe.license}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-white truncate max-w-[50%]">
                {recipe.type}
              </span>
              <span
                className={`text-sm font-semibold px-4 py-2 rounded-full ${
                  recipe.difficulty === 1
                    ? "bg-green-500 text-white"
                    : recipe.difficulty === 2
                    ? "bg-yellow-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {getDifficultyLabel(recipe.difficulty)}
              </span>
            </div>
            <p className="text-sm text-gray-300">
              Préparation: {recipe.prepTime}
            </p>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
};

export default HighlightRecipe;
