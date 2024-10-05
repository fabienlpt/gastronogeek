"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import RecipeCard from "@/components/recipeCard";
import { Recipe } from "@/types/recipe";

interface ClientSearchProps {
  initialRecipes: Recipe[];
}

interface Filters {
  categories: string[];
  licenses: string[];
  types: string[];
  difficulties: number[];
}

interface FilterItem {
  type: string;
  value: string;
  label: string;
}

export default function ClientSearch({ initialRecipes }: ClientSearchProps) {
  const [recipes] = useState<Recipe[]>(initialRecipes);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const filters: Filters = useMemo(() => {
    const tempFilters = recipes.reduce(
      (acc, recipe) => {
        acc.categories.add(recipe.category);
        acc.licenses.add(recipe.license);
        acc.types.add(recipe.type);
        acc.difficulties.add(recipe.difficulty);
        return acc;
      },
      {
        categories: new Set<string>(),
        licenses: new Set<string>(),
        types: new Set<string>(),
        difficulties: new Set<number>(),
      }
    );

    return {
      categories: Array.from(tempFilters.categories),
      licenses: Array.from(tempFilters.licenses),
      types: Array.from(tempFilters.types),
      difficulties: Array.from(tempFilters.difficulties),
    };
  }, [recipes]);

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

  const allFilters: FilterItem[] = useMemo(
    () => [
      ...filters.categories.map((filter) => ({
        type: "Catégorie",
        value: filter,
        label: filter,
      })),
      ...filters.licenses.map((filter) => ({
        type: "License",
        value: filter,
        label: filter,
      })),
      ...filters.types.map((filter) => ({
        type: "Type",
        value: filter,
        label: filter,
      })),
      ...filters.difficulties.map((filter) => ({
        type: "Difficulté",
        value: filter.toString(),
        label: getDifficultyLabel(filter),
      })),
    ],
    [filters]
  );

  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      const matchesSearch =
        searchTerm === "" ||
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.commonTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        selectedFilter === "" ||
        recipe.category === selectedFilter ||
        recipe.license === selectedFilter ||
        recipe.type === selectedFilter ||
        recipe.difficulty.toString() === selectedFilter;

      return matchesSearch && matchesFilter;
    });
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, selectedFilter]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const toggleFilter = (value: string) => {
    setSelectedFilter((prev) => (prev === value ? "" : value));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[500px] mb-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/search_banner.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold text-white mb-6">
            Découvrez nos recettes
          </h1>
          <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <SearchIcon className="text-gray-400 ml-3" size={24} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une recette..."
                className="flex-grow p-3 outline-none text-gray-700"
              />
            </div>
          </form>
          <div className="w-full max-w-4xl">
            <div className="flex flex-wrap gap-2 justify-center">
              {allFilters.map((filter) => (
                <button
                  key={`${filter.type}-${filter.value}`}
                  onClick={() => toggleFilter(filter.value)}
                  className={`px-3 py-1 rounded-full ${
                    selectedFilter === filter.value
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Résultats</h2>
        {filteredRecipes.length === 0 ? (
          <p>Aucun résultat trouvé.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <li key={recipe.slug}>
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
