import { X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  tab: string;
  setTab: (tab: string) => void;
}
export const MobileMenu = ({ open, setOpen, tab, setTab }: MobileMenuProps) => {
  return (
    <div
      className={`absolute sm:hidden inset-0 h-full backdrop-blur-lg p-6 z-50 transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm">Menu</h3>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col items-start gap-[4px]">
        <Button
          variant="link"
          className={cn(
            "text-lg p-0 font-bold",
            tab === "home" ? "text-black" : "text-stone-500",
          )}
          onClick={() => {
            setTab("home");
            setOpen(false);
          }}
        >
          Home
        </Button>
        <Button
          variant="link"
          className={cn(
            "text-lg p-0 font-bold",
            tab === "workouts" ? "text-black" : "text-stone-500",
          )}
          onClick={() => {
            setTab("workouts");
            setOpen(false);
          }}
        >
          Workouts
        </Button>
        <Button
          variant="link"
          className={cn(
            "text-lg p-0 font-bold",
            tab === "data" ? "text-black" : "text-stone-500",
          )}
          onClick={() => {
            setTab("data");
            setOpen(false);
          }}
        >
          Data
        </Button>
        <Button
          variant="link"
          className={cn(
            "text-lg p-0 font-bold",
            tab === "settings" ? "text-black" : "text-stone-500",
          )}
          onClick={() => {
            setTab("settings");
            setOpen(false);
          }}
        >
          Settings
        </Button>
      </div>
    </div>
  );
};
