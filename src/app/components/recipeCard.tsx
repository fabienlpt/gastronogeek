"use client";

import React from "react";
import Image from "next/image";
import { Recipe } from "@/types/recipe";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TransitionLink from "./transitionLink";

interface RecipeCardProps {
  recipe: Recipe;
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

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const content = container.querySelector(".recipe-content");

      if (!content) return;

      gsap.set(content, { yPercent: 50 });

      const tl = gsap
        .timeline({ paused: true })
        .to(content, { yPercent: 0, duration: 0.3, ease: "power2.out" });

      const handleEnter = () => tl.play();
      const handleLeave = () => tl.reverse();

      container.addEventListener("mouseenter", handleEnter);
      container.addEventListener("mouseleave", handleLeave);

      return () => {
        container.removeEventListener("mouseenter", handleEnter);
        container.removeEventListener("mouseleave", handleLeave);
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <TransitionLink url={`/recipes/${recipe.slug}`} className="block">
      <div
        ref={containerRef}
        className="relative w-full h-64 rounded-lg overflow-hidden group"
      >
        {recipe.images && recipe.images.length > 0 ? (
          <Image
            src={recipe.images[0]}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
            loading="lazy"
            className="recipe-img"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Pas d&apos;image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/30 to-transparent" />
        <div className="recipe-content absolute bottom-[-10px] left-0 right-0 bg-gradient-to-t from-slate-800/90 to-slate-800/60">
          <div className="p-4">
            <h3 className="text-white font-bold text-lg truncate">
              {recipe.title}
            </h3>
            <p className="text-gray-200 text-sm truncate">
              {recipe.commonTitle}
            </p>
          </div>
          <div className="p-4 pt-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-white truncate max-w-[50%]">
                {recipe.category}
              </span>
              <span className="text-sm text-gray-300 truncate max-w-[45%]">
                {recipe.license}
              </span>
            </div>
            <div className="flex justify-between items-center">
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
            <p className="text-sm text-gray-300 mt-2 truncate">
              Préparation: {recipe.prepTime}
            </p>
          </div>
        </div>
      </div>
    </TransitionLink>
  );
};

export default RecipeCard;
