"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as React from "react";
import { Loading } from "@/components/Loading";
import { ActivatedSplitCard } from "@/components/ActivatedSplitCard";
import { NavBar } from "@/components/NavBar";
import { WelcomeText } from "@/components/WelcomeText";

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
    <main className="w-full min-h-screen bg-stone-100 relative">
      <NavBar />
      <div className="md:pt-[50px] h-full w-full flex flex-col items-center gap-6 mb-12">
        {loadingData ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : null}
        {!loadingData ? <WelcomeText activeSplit={activeSplit} /> : null}
        {/* active split sections */}
        {activeSplit ? (
          <div className="w-full flex flex-col gap-4 items-center md:py-4">
            <ActivatedSplitCard activeSplit={activeSplit} />
          </div>
        ) : null}
      </div>
    </main>
  );
}
