export interface Recipe {
  category: string;
  license: string;
  type: string;
  difficulty: number;
  title: string;
  commonTitle: string;
  defaultPersons: number;
  ingredients: Ingredient[];
  prepTime: string;
  cookingTime?: string;
  restTime?: string;
  desc: string;
  steps: string[];
  dressing: string;
  images: string[];
  slug: string;
}

export interface Ingredient {
  quantity: number | null;
  unit: string | null;
  name: string;
}
