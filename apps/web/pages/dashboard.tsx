"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as React from "react";
import { Loading } from "@/components/Loading";
import { useDiscoverSplits } from "@/hooks/useDiscoverSplits";
import { SplitCarousel } from "@/components/SplitCarousel";
import { ActivatedSplitCard } from "@/components/ActivatedSplitCard";

export default function Dashboard() {
  const {
    data: activeSplit,
    isPending: loadingActiveScheduledSplit,
    isRefetching: refetchingActiveSplit,
  } = useActiveSplit();
  const { data: profile, isPending: loadingProfile } = useProfile();
  const router = useRouter();
  const {
    data: discoverSplits,
    isPending: loadingDiscoverSplits,
    isRefetching: refetchingDiscoverSplits,
    refetch,
  } = useDiscoverSplits({
    enabled:
      !activeSplit && !loadingActiveScheduledSplit && !refetchingActiveSplit,
  });
  if (!profile && !loadingProfile) {
    toast.error("You have been logged out.");
    router.push("/login");
  }

  const loadingData = loadingActiveScheduledSplit || loadingProfile;

  return (
    <main className="w-full min-h-screen bg-stone-100">
      <div className="md:pt-[50px] h-full w-full">
        {loadingData ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : null}

        {/* discover section */}
        {!activeSplit ? (
          <>
            <div className="flex justify-center">
              <div className="flex flex-col items-center w-full gap-6 text-black">
                <div className="w-full bg-yellow-300 py-4 flex items-center">
                  {loadingDiscoverSplits || refetchingDiscoverSplits ? (
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
        ) : null}

        {/* active split sections */}
        {activeSplit ? (
          <div className="w-full flex flex-col gap-4 items-center h-full md:py-4">
            <ActivatedSplitCard activeSplit={activeSplit} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
