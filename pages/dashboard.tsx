"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { useArchivedSplit } from "@/hooks/useArchivedSplits";
import { Separator } from "@/components/ui/separator";
import { DesktopMenu } from "@/components/DesktopMenu";
import { ChevronRight, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Home } from "@/components/Home/Home";
import { useState } from "react";
import { Profile } from "@/components/Profile";
import { MobileMenuSheet } from "@/components/MobileMenuSheet";
import { MobileMenu } from "@/components/MobileMenu";

export default function Dashboard() {
  const { data: split } = useActiveSplit();
  const { data: archivedSplits } = useArchivedSplit();
  const [tab, setTab] = useState("home");
  const [showMenu, setShowMenu] = useState(false);

  if (!split) {
    return "Loading split...";
  }
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
          <main className="flex flex-col gap-4 relative grow overflow-hidden overflow-y-scroll">
            <MobileMenuSheet
              tab={tab}
              setTab={setTab}
              open={showMenu}
              setOpen={setShowMenu}
            />
            <div className="h-max">
              {tab === "home" ? <Home split={split} /> : null}
              {tab === "profile" ? <Profile /> : null}
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
