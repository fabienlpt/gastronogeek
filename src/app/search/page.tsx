import { getRecipes } from "@/lib/api";
import ClientSearch from "./clientSearch";

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const recipes = await getRecipes();

  return <ClientSearch recipes={recipes} searchParams={searchParams} />;
}
