"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useArchivedSplit } from "@/hooks/useArchivedSplits";
import { Separator } from "@/components/ui/separator";
import { DesktopMenu } from "@/components/DesktopMenu";
import { ChevronRight, PanelLeft } from "lucide-react";
import { Home } from "@/components/Home/Home";
import { useState } from "react";
import { Profile } from "@/components/Profile";
import { MobileMenuSheet } from "@/components/MobileMenuSheet";
import { MobileMenu } from "@/components/MobileMenu";

export default function Dashboard() {
  const { data: split, isPending: loadingActiveSplit } = useActiveSplit();
  const { data: archivedSplits } = useArchivedSplit();
  const [tab, setTab] = useState("home");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <main>
      <div className="flex overflow-hidden h-screen w-screen max-md:flex-col md:flex-row">
        <DesktopMenu tab={tab} setTab={setTab} />
        <MobileMenu tab={tab} setShowMenu={setShowMenu} showMenu={showMenu} />
        <div className="flex flex-col w-full h-full">
          <div className="max-md:hidden capitalize w-full">
            <div className="p-2 flex items-center font-bold">
              Cyber Split (LOGO)
              <ChevronRight className="h-4 w-4" />
              <div className="text-stone-600 capitalize">{tab}</div>
            </div>
            <Separator />
          </div>
          <main className="flex flex-col gap-4 relative grow overflow-hidden overflow-y-scroll bg-stone-50">
            <MobileMenuSheet
              tab={tab}
              setTab={setTab}
              open={showMenu}
              setOpen={setShowMenu}
            />
            <div className="h-max">
              {loadingActiveSplit ? (
                <div className="h-[300px] w-full flex items-center justify-center">
                  Loading data...
                </div>
              ) : null}
              {split && tab === "home" ? <Home split={split} /> : null}
              {tab === "profile" ? <Profile /> : null}
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
