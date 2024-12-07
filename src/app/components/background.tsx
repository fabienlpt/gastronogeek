"use client";

import Image from "next/image";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base background */}
      <div className="absolute inset-0 bg-[#0F172A]" />

      {/* Matrix background */}
      <div className="absolute inset-0">
        <Image
          src="/matrix.png"
          alt=""
          fill
          className="object-cover opacity-[0.15] mix-blend-screen blur-sm"
          priority
        />
      </div>

      {/* Gradient blobs */}
      <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-[50px] animate-blob" />
      <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-[50px] animate-blob animation-delay-2000" />
    </div>
  );
}
