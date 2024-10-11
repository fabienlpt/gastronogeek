"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useStore } from "@/lib/store";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const refTransition = useRef<HTMLDivElement>(null);
  const {
    isTransitionActive,
    setIsTransitionActive,
    isFirstLoad,
    setIsFirstLoad,
  } = useStore();

  const animateTransition = (show: boolean) => {
    if (refTransition.current) {
      gsap.to(refTransition.current, {
        opacity: show ? 1 : 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          setIsTransitionActive(false);
          if (!show) {
            setIsFirstLoad(false);
          }
        },
      });
    }
  };

  useEffect(() => {
    if (isTransitionActive) {
      animateTransition(true);
    }
  }, [isTransitionActive]);

  useEffect(() => {
    // Déclencher l'animation de sortie après le chargement de la page
    if (!isFirstLoad) {
      animateTransition(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isFirstLoad) {
      if (refTransition.current) {
        gsap.set(refTransition.current, { opacity: 1 });
      }
      animateTransition(false);
    }
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <>
      <div key={pathname}>{children}</div>
      <div ref={refTransition} className="transition"></div>
    </>
  );
}
