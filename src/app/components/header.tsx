"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { SearchIcon, X, Loader2 } from "lucide-react";
import TransitionLink from "./transitionLink";
import SearchResults from "./searchResults";
import { searchRecipes } from "@/lib/api";
import { Recipe } from "@/types/recipe";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    async function performSearch() {
      if (debouncedSearchTerm) {
        setIsLoading(true);
        try {
          const results = await searchRecipes(debouncedSearchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error("Search failed:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }

    performSearch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/recipes?q=${encodeURIComponent(searchTerm)}`);
      setIsSearching(false);
    }
  };

  return (
    <header className="w-full px-8 py-4 flex items-center justify-between bg-slate-800 fixed z-10 top-0 left-0">
      <TransitionLink url="/" className="flex items-center w-1/5">
        <Image
          src="/logo.png"
          alt="Logo"
          loading="lazy"
          width={146}
          height={48}
        />
      </TransitionLink>

      <div className="flex-grow flex justify-center" ref={searchRef}>
        <div className="w-4/5 relative">
          <form onSubmit={handleSubmit}>
            <div className="relative flex items-center">
              {isLoading ? (
                <Loader2
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin"
                  size={20}
                />
              ) : (
                <SearchIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              )}
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearching(true);
                }}
                onFocus={() => setIsSearching(true)}
                placeholder="Rechercher..."
                className="w-full p-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setIsSearching(false);
                    setSearchResults([]);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </form>

          {isSearching && searchTerm && (
            <SearchResults
              results={searchResults}
              searchTerm={searchTerm}
              onClose={() => setIsSearching(false)}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>

      <nav className="flex space-x-4 w-1/5 justify-end">
        <TransitionLink
          url="/recipes"
          className="text-white hover:text-gray-200"
        >
          Recettes
        </TransitionLink>
        <TransitionLink
          url="/contact"
          className="text-white hover:text-gray-200"
        >
          Contact
        </TransitionLink>
      </nav>
    </header>
  );
}
