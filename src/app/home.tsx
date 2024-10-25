"use client";

import HighlightRecipe from "@/components/highlightRecipe";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useEffect } from "react";
import SplitType from "split-type";
import { Recipe } from "./types/recipe";
import { useStore } from "@/lib/store";

interface ClientHomeProps {
  recipes: Recipe[];
}

function ClientHome({ recipes }: ClientHomeProps) {
  const highlightedRecipes = recipes.slice(0, 3);
  const containerRef = useRef(null);
  const { setIsTransitionActive } = useStore();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const masterTimeline = gsap.timeline({
        paused: true,
        onComplete: () => setIsTransitionActive(false),
      });

      timelineRef.current = masterTimeline;

      // Hero section animations
      const heroText = new SplitType("#hero-title", { types: "words" });
      masterTimeline.from(heroText.words, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // About section animations
      masterTimeline.from(
        ".about-title",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      masterTimeline.from(
        ".about-content",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      masterTimeline.from(
        ".about-image",
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // Highlighted recipes section
      masterTimeline.from(
        ".highlight-title",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      masterTimeline.from(
        ".highlight-recipe",
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.4"
      );

      masterTimeline.play();

      // Setup scroll triggers for revealing content
      gsap.from(".scroll-reveal", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".scroll-reveal",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      gsap.killTweensOf(containerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-x-hidden mb-28">
      <section
        className="relative h-screen w-full flex items-center justify-center mb-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-800 opacity-40"></div>
        <h1
          id="hero-title"
          className="text-5xl font-bold text-white text-center z-1 px-4"
        >
          Bienvenue sur Gastronogeek
        </h1>
      </section>

      <div className="container mx-auto px-4">
        <section className="mb-12">
          <h2 className="about-title text-3xl font-bold mb-6">
            À propos de Gastronogeek
          </h2>
          <div className="flex flex-col md:flex-row items-center">
            <div className="about-content md:w-1/2 mb-6 md:mb-0 md:pr-6">
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
            <div className="about-image md:w-1/2">
              <Image
                src="/a-propos.jpg"
                alt="Collage de plats Gastronogeek"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="highlight-title text-3xl font-bold mb-12">
            Recettes mises en avant
          </h2>
          <div className="flex flex-col gap-14">
            {highlightedRecipes.map((recipe, index) => (
              <div key={recipe.slug} className="highlight-recipe">
                <HighlightRecipe recipe={recipe} onLeft={index % 2 === 0} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClientHome;
