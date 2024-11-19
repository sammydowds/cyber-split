import { useDeactivateSplit } from "@/hooks/useDeactivateSplit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Ban, Settings } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface EndSplitDropdownProps {
  id: string;
}
export function EndSplitDropdown({ id }: EndSplitDropdownProps) {
  const queryClient = useQueryClient();
  const { mutate: deactivateSplit } = useDeactivateSplit({
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const handleEndSplit = () => {
    deactivateSplit({ id });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-stone-400">
          <Settings size={24} strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel>Split Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEndSplit}>
          <Ban size={16} color="red" />
          <span className="ml-2 text-lg font-bold">End This Split</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
