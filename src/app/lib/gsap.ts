"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Flip from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAP({ children }: any) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, Flip);

  useGSAP(() => {
    CustomEase.create("bezier", "0.33, 1, 0.68, 1");
    CustomEase.create("transition", "0.76, 0, 0.24, 1");
    CustomEase.create("textReveal", "0.65, 0, 0.35, 1");

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.to(document.querySelector("#scroll-progress"), {
          width: `${self.progress * 100}%`,
          duration: 0.1,
          ease: "none",
        });
      },
    });
  });

  return children;
}
