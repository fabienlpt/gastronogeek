"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import TransitionOverlay from "./transitionOverlay";
import { useStore } from "@/lib/store";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { isTransitionActive, setIsTransitionActive } = useStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(overlayRef.current, { scaleY: 0 });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isTransitionActive) return;

    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.4,
        transformOrigin: "top",
        ease: "power4.inOut",
      }
    )
      .to(overlayRef.current, {
        scaleY: 0,
        duration: 0.4,
        transformOrigin: "top",
        ease: "power4.inOut",
        delay: 0.6,
      })
      .call(() => {
        setIsTransitionActive(false);
      });
  }, [isTransitionActive]);

  return (
    <>
      <div key={pathname} ref={contentRef}>
        {children}
      </div>
      <TransitionOverlay ref={overlayRef} />
    </>
  );
}
