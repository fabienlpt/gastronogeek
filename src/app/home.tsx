"use client";

import HighlightRecipe from "@/components/highlightRecipe";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import SplitType from "split-type";
import { Recipe } from "./types/recipe";

interface ClientHomeProps {
  recipes: Recipe[];
}

function ClientHome({ recipes }: ClientHomeProps) {
  const highlightedRecipes = recipes.slice(0, 3);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  useGSAP(
    () => {
      const heroText = new SplitType("#hero-title", { types: "words" });
      gsap.from(heroText.words, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: heroRef }
  );

  useGSAP(
    () => {
      gsap.from(aboutRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: aboutRef }
  );

  return (
    <div className="w-full">
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center mb-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-800 opacity-40"></div>
        <h1
          id="hero-title"
          className="text-5xl font-bold text-white text-center z-10 px-4"
        >
          Bienvenue sur Gastronogeek
        </h1>
      </section>

      <div className="container mx-auto px-4">
        <section ref={aboutRef} className="mb-12">
          <h2 className="text-3xl font-bold mb-6">À propos de Gastronogeek</h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
              <p className="text-lg mb-4">
                Gastronogeek est votre destination culinaire pour explorer des
                recettes inspirées de la culture geek. Notre passion est de vous
                faire découvrir des plats uniques qui allient gastronomie et
                univers fantastiques.
              </p>
              <p className="text-lg mb-4">
                Que vous soyez fan de Star Wars, de Harry Potter ou de Game of
                Thrones, vous trouverez ici des recettes qui vous transporteront
                dans vos mondes imaginaires préférés.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/gastronogeek-collage.jpg"
                alt="Collage de plats Gastronogeek"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Recettes mises en avant</h2>
          <div className="flex flex-col space-y-12">
            {highlightedRecipes.map((recipe, index) => (
              <HighlightRecipe
                key={recipe.slug}
                recipe={recipe}
                onLeft={index % 2 === 0}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClientHome;
