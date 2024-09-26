import { SplitDeep } from "@/types";
import { SplitForm } from "./SplitForm/SplitForm";
import { ActiveSplitCard } from "./split-cards/ActiveSplitCard";
import { useState } from "react";

interface HomeProps {
  split?: SplitDeep;
}
export const Home = ({ split }: HomeProps) => {
  const [showCreateProgram, setShowCreateProgram] = useState(false)
  if (showCreateProgram) {
    return (
      <div className="flex flex-col items-center w-full h-full bg-white bg-gradient-to-b from-white from-30% via-stone-50 to-yellow-100">
        <SplitForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 mb-[120px] gap-6 max-xl:gap-4 max-md:p-0 mt-4 mb-[365px]">
      {split ? <ActiveSplitCard split={split} /> : null}
    </div>
  );
};
