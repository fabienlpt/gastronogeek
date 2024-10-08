import { getRecipes } from "@/lib/api";
import ClientHome from "./home";

async function HomePage() {
  const recipes = await getRecipes();
  return (
    <ClientHome recipes={recipes} />
  );
}

export default HomePage;