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
import Image from "next/image";

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
              <Image src="/logo.png" alt="logo" height={50} width={100} />
              <ChevronRight className="h-3 w-3" />
              <div className="text-stone-600 capitalize text-sm">{tab}</div>
            </div>
            <Separator />
          </div>
          <main
            className="flex flex-col gap-4 relative grow overflow-hidden overflow-y-auto bg-stone-200 shadow-inner"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='gray' fill-opacity='0.10'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          >
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
              {!loadingActiveSplit && tab === "home" ? (
                <Home split={split} />
              ) : null}
              {tab === "profile" ? <Profile /> : null}
            </div>
          </main>
        </div>
      </div>
    </main>
  );
}
