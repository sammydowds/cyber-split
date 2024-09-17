import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashCard } from "../DashCard";
import { SplitDeep } from "@/types";
import {
  CADENCE_TO_DESCRIPTION_MAP,
  SPLIT_TYPE_TO_DESCRIPTION,
} from "@/lib/programming/constants";
import { SPLIT_TYPES } from "@/lib/programming/enums";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { Check, ClipboardIcon, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEndSplit } from "@/hooks/useEndSplit";
import { useQueryClient } from "@tanstack/react-query";
import pluralize from "pluralize";
import { useState } from "react";
import { motion } from "framer-motion";

interface CurrentProgrammingCardProps {
  split: SplitDeep;
}
export const CurrentProgrammingCard = ({
  split,
}: CurrentProgrammingCardProps) => {
  const queryClient = useQueryClient();
  const [isCopied, setIsCopied] = useState(false);
  const { mutate: endSplit, isPending } = useEndSplit({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
    },
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/share/${split.id}`,
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const daysDiff = Math.abs(
    differenceInDays(
      new Date(split.created).toLocaleDateString(),
      new Date().toLocaleDateString(),
    ),
  );
  const diffText = daysDiff
    ? `${daysDiff} ${pluralize("day", daysDiff)} ago`
    : "today";

  return (
    <DashCard className="w-[500px] max-md:w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-[4px]">
            <Route className="h-5 w-5" /> Current Programming
          </CardTitle>
        </CardHeader>
        <CardContent className="text-stone-500 pb-4">
          <span className="font-semibold text-black">
            {SPLIT_TYPE_TO_DESCRIPTION[split.type as SPLIT_TYPES]}
          </span>{" "}
          with a cadence of{" "}
          <span className="font-semibold text-black">
            {CADENCE_TO_DESCRIPTION_MAP[split.type][
              split.cadence
            ].toLowerCase()}
          </span>{" "}
          started {diffText}.
        </CardContent>
        <CardFooter className="flex w-full pb-4 gap-2">
          <Button
            className="w-full font-bold flex items-center gap-[4px] overflow-hidden text-stone-600"
            variant="outline"
            onClick={() => copyToClipboard()}
          >
            {isCopied ? (
              <motion.div
                className="flex items-center gap-[4px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Copied{" "}
                <span className="p-[2px] rounded-full bg-green-600">
                  <Check size={10} color="white" />
                </span>
              </motion.div>
            ) : (
              <>
                Copy Link
                <ClipboardIcon size={14} />
              </>
            )}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => endSplit({ id: split.id })}
            className="w-full font-bold"
            variant="destructive"
          >
            End Split
          </Button>
        </CardFooter>
      </motion.div>
    </DashCard>
  );
};
