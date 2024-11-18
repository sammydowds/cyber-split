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
    <main className="w-full bg-stone-100">
      <div className="md:mt-[50px] h-full w-full">
        {loadingData ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <HomePage activeSplit={activeSplit} />
        )}
      </div>
    </main>
  );
}
