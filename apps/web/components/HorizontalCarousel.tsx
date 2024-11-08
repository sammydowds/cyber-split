import { ReactNode } from "react";

export const HorizontalCarousel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="snap-x snap-mandatory flex flex-nowrap w-full gap-3 overflow-x-scroll py-2 px-3">
      {children}
    </div>
  );
};
