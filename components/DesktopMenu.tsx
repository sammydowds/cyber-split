import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
    <aside className="inset-y-0 left-0 z-10 hidden w-14 flex-col gap-2 py-10 px-2 border-r bg-background sm:flex">
      <Button
        variant="ghost"
        onClick={() => setTab("home")}
        className={cn(
          "flex h-9 w-9 text-black items-center justify-center rounded-full p-0",
          tab === "home"
            ? "bg-black text-white focus:bg-black focus:text-white"
            : null,
        )}
      >
        <House className="h-5 w-5" />
        <span className="sr-only">Home</span>
      </Button>
      <Button
        variant="ghost"
        onClick={() => setTab("profile")}
        className={cn(
          "flex h-9 w-9 text-black items-center justify-center rounded-full p-0",
          tab === "profile"
            ? "bg-black text-white focus:bg-black focus:text-white"
            : null,
        )}
      >
        <User className="h-5 w-5" />
        <span className="sr-only">Profile</span>
      </Button>
    </aside>
  );
};
