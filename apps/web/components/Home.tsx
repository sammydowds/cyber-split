import { SplitDeep } from "@/types";
import { SplitForm } from "./SplitForm/SplitForm";
import { ActiveSplitCard } from "./split-cards/ActiveSplitCard";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { MessageCircleWarningIcon, MessageSquarePlus } from "lucide-react";
import { Button } from "./ui/button";

interface HomeProps {
  split?: SplitDeep;
  onClickCreateProgram?: (show: boolean) => void;
}
export const Home = ({ split }: HomeProps) => {
  return (
    <div className="flex items-start p-4 mb-[120px] gap-6 max-xl:gap-4 max-md:px-0 mb-[365px] md:flex-wrap max-md:flex-col">
      {split ? <ActiveSplitCard split={split} /> : null}
      {!split ? (
        <Card className="overflow-hidden rounded-lg md:max-w-[345px] max-md:w-full">
          <CardHeader className="bg-stone-100/80 py-[6px] px-[8px]">
            <CardTitle className="text-xs text-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-[4px]">
                <MessageCircleWarningIcon size={16} />
                No Active Program
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 text-sm">
            Create an active program or activate a program from you library.
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};
