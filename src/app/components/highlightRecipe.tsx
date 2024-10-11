"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types/recipe";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !contentRef.current) return;

      gsap.fromTo(
        contentRef.current,
        {
          x: onLeft ? "100%" : "-100%",
          opacity: 0,
        },
        {
          x: "0%",
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play",
          },
        }
      );
    },
    { dependencies: [onLeft], scope: containerRef }
  );

  return (
    <Link href={`/recipes/${recipe.slug}`} className="block">
      <div
        ref={containerRef}
        className={`relative flex w-full h-96 py-4 group ${
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
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Pas d&apos;image</span>
            </div>
          )}
        </div>
        <div
          ref={contentRef}
          className={`recipe-content w-1/2 h-full from-gray-800/90 to-gray-800/60 p-4 flex flex-col justify-between overflow-hidden ${
            onLeft
              ? "rounded-r-lg bg-gradient-to-l"
              : "rounded-l-lg bg-gradient-to-r"
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
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
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
    </Link>
  );
};

export default HighlightRecipe;
