import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  House,
  User,
} from "lucide-react";
import { DesktopNavBackground } from "./DesktopNavBackground";

interface DesktopMenuProps {
  tab: string;
  setTab: (tab: string) => void;
}
export const DesktopMenu = ({ tab, setTab }: DesktopMenuProps) => {
  return (
    <aside className="inset-y-0 top-0 bg-white left-0 z-10 flex-col max-md:hidden gap-2 border-r bg-background">
      <div className="h-[60px] flex items-center justify-center text-lg bg-black py-4 px-2 relative">
        <DesktopNavBackground />
        <div className="h-[30px] w-[165px] relative overflow-hidden">
          <Image src="/logo.png" alt="logo" fill />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <Button
          variant="ghost"
          onClick={() => setTab("home")}
          className={cn(
            "hover:bg-stone-100/40 flex justify-start items-center w-[200px] gap-[8px] font-bold",
            tab === "home" ? "bg-stone-200/70 hover:bg-stone-200/70" : "",
          )}
        >
          <House className="h-5 w-5" />
          Home
        </Button>
        <Button
          variant="ghost"
          onClick={() => setTab("profile")}
          className={cn(
            "hover:bg-stone-100/40 flex justify-start items-center w-[200px] gap-[8px] font-bold",
            tab === "profile" ? "bg-stone-200/70 hover:bg-stone-200/70" : "",
          )}
        >
          <User className="h-5 w-5" />
          Profile
        </Button>
      </div>
    </aside>
  );
};
