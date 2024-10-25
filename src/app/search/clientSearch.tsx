"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { SearchIcon, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import FilterSidebar from "@/components/filterSidebar";
import RecipeCard from "@/components/recipeCard";
import { Recipe } from "@/types/recipe";
import { Filters } from "@/types/filters";

interface ClientSearchProps {
  recipes: Recipe[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ClientSearch({
  recipes,
  searchParams,
}: ClientSearchProps) {
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>(
    (searchParams.search as string) || ""
  );
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
      const matchesSearch =
        searchTerm === "" ||
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.commonTitle.toLowerCase().includes(searchTerm.toLowerCase());

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
  }, [recipes, searchTerm, selectedFilters]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (typeof value === "string" && value) {
        params.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [searchTerm, selectedFilters, router]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
    <div className="w-full mb-28">
      <section
        className="relative h-screen w-full flex items-center justify-center mb-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/search_banner.jpg')" }}
      >
        <div className="z-1 text-center w-full max-w-[60%] mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-8">
            Découvrez nos recettes
          </h1>
          <div className="mb-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="flex-grow flex items-center bg-white rounded-l-lg overflow-hidden shadow-lg">
                <SearchIcon className="text-gray-400 ml-6" size={30} />
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher une recette..."
                  className="flex-grow p-5 outline-none text-gray-700 text-xl"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-5 rounded-r-lg transition-colors"
              >
                <SlidersHorizontal size={30} />
              </button>
            </form>
          </div>

          {activeFilters.length > 0 && (
            <div className="mb-4 p-4 rounded-lg bg-opacity-90">
              <div className="flex flex-wrap gap-2 items-center">
                {activeFilters.map(({ type, value }) => (
                  <button
                    key={`${type}-${value}`}
                    onClick={() => removeFilter(type, value)}
                    className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-base hover:bg-blue-200 transition-colors"
                  >
                    {type === "difficulty"
                      ? getDifficultyLabel(parseInt(value))
                      : value}
                    <X size={20} className="ml-2" />
                  </button>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-base text-gray-600 hover:text-gray-800 transition-colors bg-gray-100 px-4 py-2 rounded-full"
                >
                  Effacer tous les filtres
                </button>
              </div>
            </div>
          )}
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

      <div ref={sidebarRef}>
        <FilterSidebar
          filters={filters}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          toggleDifficulty={toggleDifficulty}
          getDifficultyLabel={getDifficultyLabel}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
}
