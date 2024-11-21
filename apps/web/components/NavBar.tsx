"use client";

import * as React from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { ChartNoAxesCombined, House, Search, TrendingUp } from "lucide-react";

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
      <Link
        href="/dashboard"
        className={cn(
          "",
          path.includes("dashboard")
            ? "text-black underline decoration-2 decoration-yellow-300"
            : "",
        )}
      >
        Home
      </Link>
      <Link
        href="/discover"
        className={cn(
          "",
          path.includes("discover")
            ? "text-black underline decoration-2 decoration-yellow-300"
            : "",
        )}
      >
        Discover
      </Link>
      <Link
        href="/results"
        className={cn(
          "",
          path.includes("results")
            ? "text-black underline decoration-2 decoration-yellow-300"
            : "",
        )}
      >
        Results
      </Link>
    </nav>
  );
}

function MobileNavBar() {
  const router = useRouter();
  const path = router.pathname;
  return (
    <nav className="fixed bottom-0 left-0 w-full flex items-center justify-between p-2 z-[100] bg-white md:hidden border-t-[1px]">
      <div className="grow flex items-center justify-center">
        <Link
          href="/dashboard"
          className={cn(
            "text-stone-400 p-[8px]",
            path.includes("dashboard")
              ? "text-black underline decoration-2 decoration-yellow-300 relative bg-yellow-100 p-[8px] rounded-full"
              : "",
          )}
        >
          <House size={24} />
        </Link>
      </div>
      <div className="grow flex items-center justify-center relative">
        <Link
          href="/discover"
          className={cn(
            "text-stone-400 p-[6px]",
            path.includes("discover")
              ? "text-black underline decoration-2 decoration-yellow-300 relative bg-yellow-100 p-[8px] rounded-full"
              : "",
          )}
        >
          <Search size={24} />
        </Link>
      </div>
      <div className="grow flex items-center justify-center relative">
        <Link
          href="/results"
          className={cn(
            "text-stone-400 p-[8px]",
            path.includes("results")
              ? "text-black underline decoration-2 decoration-yellow-300 relative bg-yellow-100 p-[8px] rounded-full"
              : "",
          )}
        >
          <ChartNoAxesCombined size={24} />
        </Link>
      </div>
    </nav>
  );
}
