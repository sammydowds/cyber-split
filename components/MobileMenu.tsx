import { ChevronRight, PanelLeft } from "lucide-react";
import { Button } from "./ui/button";

interface MobileMenuProps {
  setShowMenu: (show: boolean) => void;
  showMenu: boolean;
  tab: string;
}
export const MobileMenu = ({ showMenu, setShowMenu, tab }: MobileMenuProps) => {
  return (
    <div className="top-0 z-30 flex h-14 items-center gap-[4px] border-b bg-background p-4 sm:hidden">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setShowMenu(!showMenu)}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex items-center font-bold sm:hidden">
        Cyber Split (LOGO)
        <ChevronRight className="h-4 w-4" />
        <div className="text-stone-600 capitalize">{tab}</div>
      </div>
    </div>
  );
};
