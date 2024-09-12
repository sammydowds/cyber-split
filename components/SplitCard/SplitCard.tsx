import { PanelLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitDeep } from "@/types";
import { useState } from "react";
import { Card } from "../ui/card";
import { Home } from "./tabs/Home/Home";
import { Settings } from "./tabs/Settings/Settings";
import { Data } from "./tabs/Data/Data";
import { MobileMenu } from "./MobileMenu";
import { DesktopMenu } from "./DesktopMenu";
import { Separator } from "../ui/separator";
import { Workouts } from "./tabs/Workouts/Workouts";

interface SplitCardProps {
  split: SplitDeep;
}
export const SplitCard = ({ split }: SplitCardProps) => {
  const [tab, setTab] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Card className="flex overflow-hidden min-h-[400px] max-md:w-full">
      <DesktopMenu tab={tab} setTab={setTab} />
      <div className="flex flex-col grow h-full">
        <div className="max-md:hidden capitalize w-full">
          <div className="p-2 flex items-center font-bold">
            Active Split
            <ChevronRight className="h-4 w-4" />
            <div className="text-stone-600 capitalize">{tab}</div>
          </div>
          <Separator />
        </div>
        <header className="top-0 z-30 flex h-14 items-center gap-2 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Button
            size="icon"
            variant="outline"
            className="sm:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="p-2 flex items-center font-bold sm:hidden">
            Active Split
            <ChevronRight className="h-4 w-4" />
            <div className="text-stone-600 capitalize">{tab}</div>
          </div>
        </header>
        <main className="flex flex-col gap-4 relative h-full overflow-hidden w-screen max-h-[700px] overflow-y-scroll sm:max-w-[600px]">
          <MobileMenu
            tab={tab}
            setTab={setTab}
            open={showMenu}
            setOpen={setShowMenu}
          />
          {tab === "home" ? <Home split={split} /> : null}
          {tab === "settings" ? <Settings split={split} /> : null}
          {tab === "data" ? <Data split={split} /> : null}
          {tab === "workouts" ? <Workouts split={split} /> : null}
        </main>
      </div>
    </Card>
  );
};
