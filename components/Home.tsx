import { SplitDeep } from "@/types";
import { SplitForm } from "./SplitForm/SplitForm";
import { ActiveSplitCard } from "./split-cards/ActiveSplitCard";
import { useState } from "react";
import { DashCard } from "./DashCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  BookOpenText,
  MessageCircleIcon,
  MessageCircleWarningIcon,
  MessageSquarePlus,
} from "lucide-react";
import { Button } from "./ui/button";

interface HomeProps {
  split?: SplitDeep;
}
export const Home = ({ split }: HomeProps) => {
  const [showCreateProgram, setShowCreateProgram] = useState(false);
  if (showCreateProgram) {
    return (
      <div className="flex flex-col items-center w-full h-full bg-white bg-gradient-to-b from-white from-30% via-stone-50 to-yellow-100">
        <SplitForm
          onSuccess={() => setShowCreateProgram(false)}
          onClickExit={() => setShowCreateProgram(false)}
        />
      </div>
    );
  }

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
      <Card className="overflow-hidden rounded-lg md:max-w-[700px] max-md:w-full">
        <CardHeader className="bg-stone-100/80 py-[6px] px-[8px]">
          <CardTitle className="text-xs text-stone-700 flex items-center justify-between">
            <div className="flex items-center gap-[4px]">
              <MessageSquarePlus size={16} />
              Create a Program
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-sm">
          As you create programs, they will show up in your library.
        </CardContent>
        <CardFooter className="px-2 pb-2">
          <Button
            className="w-full"
            size="sm"
            onClick={() => {
              setShowCreateProgram(true);
            }}
          >
            Create Program
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
