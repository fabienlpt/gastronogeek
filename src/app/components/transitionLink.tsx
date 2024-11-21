"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import Link from "next/link";

interface TransitionLinkProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function TransitionLink({
  url,
  children,
  className,
  onClick,
}: TransitionLinkProps) {
  const router = useRouter();
  const currentPathname = usePathname();
  const setIsTransitionActive = useStore(
    (state) => state.setIsTransitionActive
  );

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick(e);

    const destinationUrl = new URL(url, window.location.origin);
    const destinationPathname = destinationUrl.pathname;

    if (destinationPathname === currentPathname) {
      router.push(url);
      return;
    }

    setIsTransitionActive(true);
    setTimeout(() => {
      router.push(url);
    }, 400);
  };

  return (
    <Link href={url} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
