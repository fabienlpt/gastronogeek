"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import RecipeCard from "@/components/recipeCard";
import { Recipe } from "@/types/recipe";

interface ClientSearchProps {
  recipes: Recipe[];
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

export default function ClientSearch({ recipes }: ClientSearchProps) {
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
    <div className="w-full mb-4">
      <section className="relative h-screen w-full flex items-center justify-center mb-12 bg-cover bg-center" style={{backgroundImage: "url('/search_banner.jpg')"}}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="z-10 text-center">
          <h1 className="text-5xl font-bold text-white mb-8">Découvrez nos recettes</h1>
          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-8">
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
          <div className="w-full max-w-4xl mx-auto">
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
      </section>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Résultats</h2>
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
