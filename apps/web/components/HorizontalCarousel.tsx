import { ReactNode } from "react";

export const HorizontalCarousel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="snap-x snap-mandatory flex flex-nowrap w-full gap-2 overflow-x-scroll md:overflow-x-visible p-2">
      {children}
    </div>
  );
};
