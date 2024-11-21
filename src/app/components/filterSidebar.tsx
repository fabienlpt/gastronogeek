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
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Filtres</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={28} />
            </button>
          </div>
          {Object.entries(filters).map(([filterType, filterValues]) => (
            <div key={filterType} className="mb-6">
              <h4 className="text-lg font-medium mb-3 capitalize">
                {filterType}
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
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-800"
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
            <div className="mb-8">
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-100 transition-colors bg-red-700 hover:bg-red-500 px-4 py-2 rounded-full m-auto block"
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
