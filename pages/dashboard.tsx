"use client";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import { DesktopMenu } from "@/components/DesktopMenu";
import { Home } from "@/components/Home";
import { useState } from "react";
import { Profile } from "@/components/Profile";
import { MobileMenuSheet } from "@/components/MobileMenuSheet";
import { MobileMenu } from "@/components/MobileMenu";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useSplits } from "@/hooks/useSplits";
import { SplitTable } from "@/components/SplitTable";
import { SplitForm } from "@/components/SplitForm/SplitForm";

export default function Dashboard() {
  const { data: split, isPending: loadingActiveSplit } = useActiveSplit();
  const { data: profile, isPending: loadingProfile } = useProfile();
  const { data: allSplits, isPending: loadingAllSplits } = useSplits();
  const [tab, setTab] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const [showCreateProgram, setShowCreateProgram] = useState(false);

  if (!profile && !loadingProfile) {
    toast.error("You have been logged out.");
    router.push("/login");
  }

  return (
    <main>
      <div className="flex overflow-hidden h-screen w-screen max-md:flex-col md:flex-row fixed">
        <DesktopMenu tab={tab} setTab={setTab} />
        <MobileMenu setShowMenu={setShowMenu} showMenu={showMenu} />
        <div className="flex flex-col w-full h-full">
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
            {showCreateProgram ? (
              <div className="flex flex-col items-center w-full h-full bg-white bg-gradient-to-b from-white from-30% via-stone-50 to-yellow-100">
                <SplitForm
                  onSuccess={() => setShowCreateProgram(false)}
                  onClickExit={() => setShowCreateProgram(false)}
                />
              </div>
            ) : (
              <>
                {loadingActiveSplit && tab === "home" ? (
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                  </div>
                ) : null}
                {!loadingActiveSplit && tab === "home" ? (
                  <Home
                    split={split}
                    onClickCreateProgram={setShowCreateProgram}
                  />
                ) : null}
                {loadingAllSplits && tab === "library" ? (
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <LoaderCircle className="animate-spin" />
                  </div>
                ) : null}
                {!loadingAllSplits && tab === "library" ? (
                  <SplitTable
                    splits={allSplits}
                    oneSplitIsActive={!!split}
                    onClickCreateProgram={setShowCreateProgram}
                  />
                ) : null}
                {tab === "profile" ? <Profile profile={profile} /> : null}
              </>
            )}
          </main>
        </div>
      </div>
    </main>
  );
}
