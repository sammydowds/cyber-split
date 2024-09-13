import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ChartColumnIncreasing,
  House,
  Settings,
  Notebook,
  User,
} from "lucide-react";

interface DesktopMenuProps {
  tab: string;
  setTab: (tab: string) => void;
}
export const DesktopMenu = ({ tab, setTab }: DesktopMenuProps) => {
  return (
    <aside className="inset-y-0 top-0 bg-white left-0 z-10 hidden flex-col gap-2 border-r bg-background sm:flex">
      <div className="h-[40px] flex items-center justify-center bg-yellow-300 text-lg relative">
        <Image src="/logo.png" alt="logo" fill />
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
