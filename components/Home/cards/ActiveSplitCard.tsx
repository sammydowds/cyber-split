import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashCard } from "../../DashCard";
import { SplitDeep } from "@/types";
import {
  CADENCE_TO_DESCRIPTION_MAP,
  SPLIT_TYPE_TO_DESCRIPTION,
} from "@/lib/programming/constants";
import { SPLIT_TYPES } from "@/lib/programming/enums";
import { formatDistanceToNow } from "date-fns";
import { Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEndSplit } from "@/hooks/useEndSplit";
import { useQueryClient } from "@tanstack/react-query";

interface ActiveSplitCardProps {
  split: SplitDeep;
}
export const ActiveSplitCard = ({ split }: ActiveSplitCardProps) => {
  const queryClient = useQueryClient();
  const { mutate: endSplit, isPending } = useEndSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
    },
  });

  return (
    <DashCard className="w-[500px] max-md:w-full">
      <CardHeader className="">
        <CardTitle className="flex items-center gap-[4px]">
          <Route className="h-4 w-4" /> Current Programming
        </CardTitle>
        <CardDescription>
          Details of your current workout programming.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-stone-500">
        <span className="font-semibold text-black">
          {SPLIT_TYPE_TO_DESCRIPTION[split.type as SPLIT_TYPES]}
        </span>{" "}
        with a cadence of{" "}
        <span className="font-semibold text-black">
          {CADENCE_TO_DESCRIPTION_MAP[split.type][split.cadence].toLowerCase()}
        </span>{" "}
        started{" "}
        {formatDistanceToNow(new Date(split.created).toLocaleDateString())} days
        ago.
      </CardContent>
      <CardFooter className="flex w-full pb-4">
        <Button
          disabled={isPending}
          onClick={() => endSplit({ id: split.id })}
          className="w-full font-bold"
          variant="secondary"
        >
          End Split
        </Button>
      </CardFooter>
    </DashCard>
  );
};
