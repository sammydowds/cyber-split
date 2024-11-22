"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { House, Search } from "lucide-react";

export function NavBar() {
  return (
    <>
      <DesktopNavBar />
      <MobileNavBar />
    </>
  );
}

function DesktopNavBar() {
  const router = useRouter();
  const path = router.pathname;
  return (
    <nav className="w-full flex items-center justify-center gap-8 p-2 max-md:hidden">
      <div className="h-[30px] w-[165px] relative overflow-hidden rounded">
        <Image src="/logo.png" alt="logo" fill />
      </div>
      <Link
        href="/"
        className={cn(
          "text-stone-400 font-semibold",
          !path || path === "/"
            ? "text-black underline decoration-4 decoration-yellow-300"
            : "",
        )}
      >
        Home
      </Link>
      <Link
        href="/discover"
        className={cn(
          "text-stone-400 font-semibold",
          path.includes("discover")
            ? "text-black underline decoration-4 decoration-yellow-300"
            : "",
        )}
      >
        Discover
      </Link>
    </nav>
  );
}

function MobileNavBar() {
  const router = useRouter();
  const path = router.pathname;
  return (
    <nav className="fixed bottom-0 left-0 w-full flex items-center justify-between p-2 z-[100] bg-white md:hidden border-t-[1px]">
      <div className="relative grow flex items-center justify-center">
        {!path ||
          (path === "/" && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-8 h-4 bg-yellow-300 rounded-full z-0"></div>
            </div>
          ))}
        <Link
          href="/"
          className={cn(
            "text-stone-400 p-[8px] z-10",
            !path || path === "/" ? "text-black" : "",
          )}
        >
          <House size={24} />
        </Link>
      </div>
      <div className="grow flex items-center justify-center relative">
        {path.includes("discover") && (
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-8 h-4 bg-yellow-300 rounded-full z-0"></div>
          </div>
        )}
        <Link
          href="/discover"
          className={cn(
            "text-stone-400 p-[6px] z-10",
            path.includes("discover") ? "text-black" : "",
          )}
        >
          <Search size={24} />
        </Link>
      </div>
    </nav>
  );
}
