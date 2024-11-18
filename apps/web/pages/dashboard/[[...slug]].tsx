"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashContentRouter } from "@/components/dash-pages/DashContentRouter";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Loader } from "lucide-react";

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
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
            overflow: "hidden",
          } as React.CSSProperties
        }
      >
        <DashboardSidebar>
          <div className="py-8 w-screen h-full">
            {loadingData ? (
              <div className="w-full flex items-center justify-center mt-8">
                <Loader className="animate-spin" />
              </div>
            ) : (
              <DashContentRouter activeSplit={activeSplit} profile={profile} />
            )}
          </div>
        </DashboardSidebar>
      </SidebarProvider>
    </main>
  );
}
