"use client";

import React, { forwardRef } from "react";
import Image from "next/image";

const TransitionOverlay = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black transform-gpu" ref={ref}>
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
          <Image
            src="/logo.png"
            alt="Logo"
            loading="lazy"
            width={292}
            height={96}
          />
        </div>
      </div>
    </div>
  );
});

TransitionOverlay.displayName = "TransitionOverlay";

export default TransitionOverlay;
