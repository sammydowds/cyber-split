import { ChevronRight, PanelLeft } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { NavAnimatedGradientBackground } from "./NavAnimatedGradientBackground";

interface MobileMenuProps {
  setShowMenu: (show: boolean) => void;
  showMenu: boolean;
  tab: string;
}
export const MobileMenu = ({ showMenu, setShowMenu, tab }: MobileMenuProps) => {
  return (
    <div className="top-0 z-30 flex h-14 items-center gap-[4px] justify-between w-full shadow bg-background p-4 sm:hidden relative">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setShowMenu(!showMenu)}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex items-center font-bold sm:hidden px-2 relative p-2">
        <Image
          src="/logo.png"
          alt="logo"
          height={25}
          width={125}
          className="border-[1px] border-black"
        />
      </div>
    </div>
  );
};
