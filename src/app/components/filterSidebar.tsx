import React from "react";
import { X } from "lucide-react";
import { Filters } from "@/types/filters";

interface FilterSidebarProps {
  filters: {
    categories: string[];
    licenses: string[];
    types: string[];
    difficulties: number[];
  };
  selectedFilters: Filters;
  activeFilters: string[];
  toggleFilter: (
    type: keyof Omit<Filters, "difficulty">,
    value: string
  ) => void;
  toggleDifficulty: (value: string) => void;
  getDifficultyLabel: (difficulty: number) => string;
  clearAllFilters: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  filters,
  selectedFilters,
  activeFilters,
  toggleFilter,
  toggleDifficulty,
  getDifficultyLabel,
  clearAllFilters,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-slate-800 shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-white">Filtres</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>
          </div>
          {Object.entries(filters).map(([filterType, filterValues]) => (
            <div key={filterType} className="mb-6">
              <h4 className="text-lg font-medium mb-3 capitalize text-gray-200">
                {filterType === "difficulties" ? "Difficulté" : filterType}
              </h4>
              <div className="space-y-2">
                {filterValues.map((value) => (
                  <button
                    key={`${filterType}-${value}`}
                    onClick={() =>
                      filterType === "difficulties"
                        ? toggleDifficulty(value.toString())
                        : toggleFilter(
                            filterType as keyof Omit<Filters, "difficulty">,
                            value.toString()
                          )
                    }
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      (
                        filterType === "difficulties"
                          ? selectedFilters.difficulty === value.toString()
                          : selectedFilters[
                              filterType as keyof Omit<Filters, "difficulty">
                            ].includes(value.toString())
                      )
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-gray-200"
                    }`}
                  >
                    {filterType === "difficulties"
                      ? getDifficultyLabel(value as number)
                      : value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {activeFilters.length > 0 && (
            <div className="mt-8">
              <button
                onClick={clearAllFilters}
                className="w-full text-gray-200 font-medium transition-colors bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
              >
                Effacer tous les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
