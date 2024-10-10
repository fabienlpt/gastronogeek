"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import RecipeCard from "@/components/recipeCard";
import { Recipe } from "@/types/recipe";
import { useRouter, useSearchParams } from 'next/navigation';

interface ClientSearchProps {
  recipes: Recipe[];
}

interface Filters {
  category: string;
  license: string;
  type: string;
  difficulty: string;
}

export default function ClientSearch({ recipes }: ClientSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || "");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    category: searchParams.get('category') || "",
    license: searchParams.get('license') || "",
    type: searchParams.get('type') || "",
    difficulty: searchParams.get('difficulty') || "",
  });

  const filters = useMemo(() => {
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

  useEffect(() => {
    const filtered = recipes.filter((recipe) => {
      const matchesSearch =
        searchTerm === "" ||
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.commonTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (selectedFilters.category === "" || recipe.category === selectedFilters.category) &&
        (selectedFilters.license === "" || recipe.license === selectedFilters.license) &&
        (selectedFilters.type === "" || recipe.type === selectedFilters.type) &&
        (selectedFilters.difficulty === "" || recipe.difficulty.toString() === selectedFilters.difficulty);

      return matchesSearch && matchesFilters;
    });
    setFilteredRecipes(filtered);

    // Mise à jour de l'URL
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) params.set('search', searchTerm);
    else params.delete('search');
    
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, '', newUrl);
  }, [recipes, searchTerm, selectedFilters, searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const toggleFilter = (type: keyof Filters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? "" : value
    }));
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
            {Object.entries(filters).map(([filterType, filterValues]) => (
              <div key={filterType} className="mb-4">
                <h3 className="text-white mb-2">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {filterValues.map((value) => (
                    <button
                      key={`${filterType}-${value}`}
                      onClick={() => toggleFilter(filterType as keyof Filters, value.toString())}
                      className={`px-3 py-1 rounded-full ${
                        selectedFilters[filterType as keyof Filters] === value.toString()
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {filterType === 'difficulties' ? getDifficultyLabel(value as number) : value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
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