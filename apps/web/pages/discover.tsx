"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as React from "react";
import { Loading } from "@/components/Loading";
import { useDiscoverSplits } from "@/hooks/useDiscoverSplits";
import { SplitCarousel } from "@/components/SplitCarousel";
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

  const loadingData =
    loadingActiveScheduledSplit ||
    loadingProfile ||
    loadingDiscoverSplits ||
    refetchingDiscoverSplits;

  return (
    <main className="w-full min-h-screen bg-stone-100">
      <NavBar />
      <div className="md:pt-[50px] h-full w-full flex flex-col gap-12">
        {/* discover section */}
        <>
          <div className="flex justify-center">
            <div className="flex flex-col items-center w-full gap-6 text-black">
              <div className="w-full bg-yellow-300 py-4 flex items-center">
                {loadingData ? (
                  <div className="min-h-[505px] flex items-center justify-center w-full">
                    <Loading />
                  </div>
                ) : (
                  <SplitCarousel
                    refetch={refetch}
                    splits={discoverSplits ?? []}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </main>
  );
}
