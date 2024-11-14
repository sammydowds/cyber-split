import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ActiveSplitDeep } from "@repo/database";
import { MessageCircleWarning } from "lucide-react";
import Link from "next/link";

interface UserStatsProps {
  activeSplit?: ActiveSplitDeep;
}
export const UserStats = ({ activeSplit }: UserStatsProps) => {
  if (!activeSplit) {
    return null;
  }
  return (
    <div className="bg-white flex-col gap-2 px-2">
      <div className="flex gap-4">
        <div className="flex gap-[6px]">
          <Avatar>
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback className="bg-yellow-300 font-bold">
              S
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-xs tracking-tighter font-semibold">Active Split</p>
          <Link
            href={`/dashboard/details/${activeSplit.id}`}
            className="underline"
          >
            {activeSplit.split.name}
          </Link>
        </div>
      </div>
    </div>
  );
};
