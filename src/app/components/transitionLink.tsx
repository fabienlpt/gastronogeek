"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

interface TransitionLinkProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export default function TransitionLink({
  url,
  children,
  className,
}: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isTransitionActive, setIsTransitionActive } = useStore();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (url === pathname) {
      return;
    }

    if (isTransitionActive) return;

    setIsTransitionActive(true);

    setTimeout(() => {
      router.push(url);
    }, 600);
  };

  return (
    <Link href={url} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
