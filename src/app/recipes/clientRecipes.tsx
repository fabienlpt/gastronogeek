"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import FilterSidebar from "@/components/filterSidebar";
import RecipeCard from "@/components/recipeCard";
import { Recipe } from "@/types/recipe";
import { Filters } from "@/types/filters";

interface ClientRecipesProps {
  recipes: Recipe[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ClientRecipes({
  recipes,
  searchParams,
}: ClientRecipesProps) {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Initialiser le terme de recherche depuis l'URL si présent
  const [selectedFilters, setSelectedFilters] = useState<Filters>(() => ({
    categories: ((searchParams.categories as string) || "")
      .split(",")
      .filter(Boolean),
    licenses: ((searchParams.licenses as string) || "")
      .split(",")
      .filter(Boolean),
    types: ((searchParams.types as string) || "").split(",").filter(Boolean),
    difficulty: (searchParams.difficulty as string) || "",
  }));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Vérifier le terme de recherche dans l'URL
      const searchTerm = ((searchParams.q as string) || "").toLowerCase();
      const matchesSearch =
        !searchTerm ||
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.commonTitle.toLowerCase().includes(searchTerm);

      const matchesFilters =
        (selectedFilters.categories.length === 0 ||
          selectedFilters.categories.includes(recipe.category)) &&
        (selectedFilters.licenses.length === 0 ||
          selectedFilters.licenses.includes(recipe.license)) &&
        (selectedFilters.types.length === 0 ||
          selectedFilters.types.includes(recipe.type)) &&
        (selectedFilters.difficulty === "" ||
          recipe.difficulty.toString() === selectedFilters.difficulty);

      return matchesSearch && matchesFilters;
    });
  }, [recipes, searchParams.q, selectedFilters]);

  useEffect(() => {
    setSelectedFilters({
      categories: ((searchParams.categories as string) || "")
        .split(",")
        .filter(Boolean),
      licenses: ((searchParams.licenses as string) || "")
        .split(",")
        .filter(Boolean),
      types: ((searchParams.types as string) || "").split(",").filter(Boolean),
      difficulty: (searchParams.difficulty as string) || "",
    });
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchParams.q) params.set("q", searchParams.q as string);

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (typeof value === "string" && value) {
        params.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [selectedFilters, router, searchParams.q]);

  const toggleFilter = (
    type: keyof Omit<Filters, "difficulty">,
    value: string
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const toggleDifficulty = (value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      difficulty: prev.difficulty === value ? "" : value,
    }));
  };

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

  const activeFilters = useMemo(() => {
    return Object.entries(selectedFilters).flatMap(([type, values]) => {
      if (type === "difficulty") {
        return values ? [{ type, value: values }] : [];
      }
      return values.map((value: string) => ({ type, value }));
    });
  }, [selectedFilters]);

  const removeFilter = (type: string, value: string) => {
    if (type === "difficulty") {
      setSelectedFilters((prev) => ({ ...prev, difficulty: "" }));
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [type]: prev[type as keyof Omit<Filters, "difficulty">].filter(
          (v) => v !== value
        ),
      }));
    }
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      categories: [],
      licenses: [],
      types: [],
      difficulty: "",
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full container mx-auto px-4 pt-28 mb-28">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {searchParams.q
              ? `Résultats pour "${searchParams.q}"`
              : "Toutes nos recettes"}
          </h1>
          <p className="text-gray-400 mt-2">
            {filteredRecipes.length} recette
            {filteredRecipes.length > 1 ? "s" : ""} trouvée
            {filteredRecipes.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <SlidersHorizontal size={20} />
          <span>Filtrer</span>
        </button>
      </div>

      {activeFilters.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 items-center">
            {activeFilters.map(({ type, value }) => (
              <button
                key={`${type}-${value}`}
                onClick={() => removeFilter(type, value)}
                className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {type === "difficulty"
                  ? getDifficultyLabel(parseInt(value))
                  : value}
                <X size={16} className="ml-2" />
              </button>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 px-4 py-2 rounded-full"
            >
              Effacer tous les filtres
            </button>
          </div>
        </div>
      )}

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-600 mt-12">
          Aucun résultat trouvé.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <li key={recipe.slug}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}

      <div ref={sidebarRef}>
        <FilterSidebar
          filters={filters}
          selectedFilters={selectedFilters}
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
          toggleDifficulty={toggleDifficulty}
          getDifficultyLabel={getDifficultyLabel}
          clearAllFilters={clearAllFilters}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
}
