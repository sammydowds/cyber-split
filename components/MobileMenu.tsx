import { PanelLeft } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { MobileNavBackground } from "./MobileNavBackground";

interface MobileMenuProps {
  setShowMenu: (show: boolean) => void;
  showMenu: boolean;
}
export const MobileMenu = ({ showMenu, setShowMenu }: MobileMenuProps) => {
  return (
    <div className="top-0 z-30 flex h-14 items-center gap-[4px] justify-between w-full shadow relative py-2 px-4 md:hidden ">
      <MobileNavBackground />
      <Button
        size="icon"
        variant="outline"
        className="z-50"
        onClick={() => setShowMenu(!showMenu)}
      >
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex items-center font-bold md:hidden px-2 relative p-2">
        <Image
          src="/mini-logo.png"
          alt="logo"
          height={14}
          width={34}
          className="rounded overflow-hidden"
        />
      </div>
    </div>
  );
};
