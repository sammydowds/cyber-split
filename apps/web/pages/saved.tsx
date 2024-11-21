"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as React from "react";
import { useDiscoverSplits } from "@/hooks/useDiscoverSplits";
import { NavBar } from "@/components/NavBar";

export default function Dashboard() {
  const { data: activeSplit, isPending: loadingActiveScheduledSplit } =
    useActiveSplit();
  const { data: profile, isPending: loadingProfile } = useProfile();
  const router = useRouter();
  const {
    data: discoverSplits,
    isPending: loadingDiscoverSplits,
    isRefetching: refetchingDiscoverSplits,
    refetch,
  } = useDiscoverSplits();
  if (!profile && !loadingProfile) {
    toast.error("You have been logged out.");
    router.push("/login");
  }

  const loadingData = loadingActiveScheduledSplit || loadingProfile;

  return (
    <main className="w-full min-h-screen bg-stone-100">
      <NavBar />
      <div className="md:pt-[50px] h-full w-full flex flex-col gap-12">
        Coming soon
      </div>
    </main>
  );
}
