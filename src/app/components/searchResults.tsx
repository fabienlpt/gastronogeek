import React from "react";
import Image from "next/image";
import { Clock, ChefHat, Loader2 } from "lucide-react";
import type { Recipe } from "@/types/recipe";
import TransitionLink from "./transitionLink";

interface SearchResultsProps {
  results: Recipe[];
  searchTerm: string;
  onClose: () => void;
  isLoading: boolean;
}

export default function SearchResults({
  results,
  searchTerm,
  onClose,
  isLoading,
}: SearchResultsProps) {
  const displayedResults = results.slice(0, 3);
  const hasMoreResults = results.length > 3;

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Loader2 className="animate-spin" size={20} />
          <span>Recherche en cours...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <p className="text-sm text-gray-600">
          {results.length === 0
            ? "Aucun résultat"
            : `${results.length} résultat${results.length > 1 ? "s" : ""}`}
          {results.length > 0 && ` pour "${searchTerm}"`}
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {displayedResults.map((recipe) => (
          <TransitionLink
            key={recipe.slug}
            url={`/recipes/${recipe.slug}`}
            className="block hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            <div className="p-4 flex items-start gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={recipe.images[0]}
                  alt={recipe.title}
                  fill
                  className="object-cover rounded-lg recipe-img"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {recipe.commonTitle}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-1" />
                    {recipe.prepTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ChefHat size={16} className="mr-1" />
                    {recipe.difficulty}/3
                  </div>
                </div>
              </div>
            </div>
          </TransitionLink>
        ))}
      </div>

      {hasMoreResults && (
        <TransitionLink
          url={`/recipes?q=${encodeURIComponent(searchTerm)}`}
          className="block p-4 text-center text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-200"
          onClick={onClose}
        >
          Voir les {results.length - 3} autres résultats
        </TransitionLink>
      )}
    </div>
  );
}
