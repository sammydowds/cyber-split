"use client";
import { useActiveScheduledSplit } from "@/hooks/useActiveScheduledSplit";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSplits } from "@/hooks/useSplits";
import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashContentRouter } from "@/components/dash-pages/DashContentRouter";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useLoggedWorkouts } from "@/hooks/useLoggedWorkouts";
import { Loader } from "lucide-react";

export default function Dashboard() {
  const { data: activeSplit, isPending: loadingActiveScheduledSplit } =
    useActiveScheduledSplit();
  const { data: profile, isPending: loadingProfile } = useProfile();
  const { data: allSplits, isPending: loadingAllSplits } = useSplits();
  const { data: loggedWorkouts, isPending: loadingLoggedWorkouts } =
    useLoggedWorkouts();
  const router = useRouter();

  if (!profile && !loadingProfile) {
    toast.error("You have been logged out.");
    router.push("/login");
  }

  const loadingData =
    loadingActiveScheduledSplit ||
    loadingAllSplits ||
    loadingLoggedWorkouts ||
    loadingProfile;

  return (
    <main className="w-full">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
            overflow: "hidden",
          } as React.CSSProperties
        }
      >
        <DashboardSidebar allSplits={allSplits} activeSplit={activeSplit}>
          <div className="py-8 max-md:w-screen">
            {loadingData ? (
              <div className="w-full flex items-center justify-center mt-8">
                <Loader className="animate-spin" />
              </div>
            ) : (
              <DashContentRouter
                activeSplit={activeSplit}
                allSplits={allSplits ?? []}
                profile={profile}
                loggedWorkouts={loggedWorkouts}
              />
            )}
          </div>
        </DashboardSidebar>
      </SidebarProvider>
    </main>
  );
}
