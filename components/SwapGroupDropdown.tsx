import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowLeftRight, LoaderCircle } from "lucide-react";
import { StrengthGroup } from "@prisma/client";
import { useGetSimilarGroups } from "@/hooks/useGetSImilarGroups";
import { useState } from "react";

interface SwapGroupDropdownProps {
  oldGroup: StrengthGroup;
  ignoreExercises: string[];
  onClickGroup: (oldGroup: StrengthGroup, newGroup: StrengthGroup) => void;
}
export const SwapGroupDropdown = ({
  oldGroup,
  onClickGroup,
  ignoreExercises,
}: SwapGroupDropdownProps) => {
  const {
    data: groups,
    refetch,
    isPending,
  } = useGetSimilarGroups(
    { group: oldGroup, ignoreExercises },
    { enabled: false, retry: false },
  );
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    if (!open) {
      refetch();
    }
    setOpen(!open);
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger>
        <ArrowLeftRight className="text-stone-400" strokeWidth={1.5} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left" className="min-w-[240px]">
        <DropdownMenuLabel>Swap {oldGroup.name}?</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isPending ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : null}
        {groups?.map((g) => {
          return (
            <DropdownMenuItem
              key={g.name}
              className="text-sm flex items-center gap-[4px]"
              onClick={() => onClickGroup(oldGroup, g)}
            >
              <span className="text-stone-400">to</span>
              {g.name}
            </DropdownMenuItem>
          );
        })}
        {!isPending && !groups?.length ? (
          <div className="flex items-center justify-center p-4 text-xs text-stone-400">
            Sorry, no options found.
          </div>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
