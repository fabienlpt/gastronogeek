"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  return (
    <header className="px-8 py-4 flex items-center justify-between bg-transparent relative">
      <Link href="/" className="flex items-center w-1/5">
        <Image src="/logo.svg" alt="Logo" loading="lazy" width={146} height={48} />
      </Link>

      {!isSearchPage && (
        <div className="flex-grow flex justify-center">
          <div className="w-3/5">
            <Link href="/search" className="block relative">
              <div className="relative flex items-center">
                <SearchIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full p-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                  readOnly
                />
              </div>
            </Link>
          </div>
        </div>
      )}

      <nav
        className={`flex space-x-4 ${
          isSearchPage ? "w-4/5 justify-end" : "w-1/5 justify-end"
        }`}
      >
        <Link href="/contact" className="text-black hover:text-gray-700">
          Contact
        </Link>
      </nav>
    </header>
  );
}
