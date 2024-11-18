"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as React from "react";
import { HomePage } from "@/components/HomePage";
import { Loading } from "@/components/Loading";
import Image from "next/image";

export default function Dashboard() {
  const { data: activeSplit, isPending: loadingActiveScheduledSplit } =
    useActiveSplit();
  const { data: profile, isPending: loadingProfile } = useProfile();
  const router = useRouter();

  if (!profile && !loadingProfile) {
    toast.error("You have been logged out.");
    router.push("/login");
  }

  const loadingData = loadingActiveScheduledSplit || loadingProfile;

  return (
    <main className="w-full">
      <nav className="flex items-center h-[50px] fixed bg-white w-full z-[1000] shadow">
        <div className="h-[60px] flex items-center text-lg py-4 px-2 relative">
          <div className="h-[30px] w-[150px] relative overflow-hidden rounded">
            <Image src="/logo.png" alt="logo" fill />
          </div>
        </div>
      </nav>
      <div className="mt-[50px] h-full">
        {loadingData ? <Loading /> : <HomePage activeSplit={activeSplit} />}
      </div>
    </main>
  );
}
