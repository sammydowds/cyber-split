import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ActiveSplitDeep } from "@repo/database";
import { MessageCircleWarning } from "lucide-react";
import Link from "next/link";

interface UserStatsProps {
  activeSplit?: ActiveSplitDeep;
}
export const UserStats = ({ activeSplit }: UserStatsProps) => {
  return (
    <div className="bg-white flex-col gap-2 px-2">
      <div className="flex gap-4 items-center">
        <div className="flex gap-[6px]">
          <Avatar>
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback className="bg-yellow-400 font-bold">
              S
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          {activeSplit ? (
            <>
              <p className="text-xs tracking-tighter font-semibold">
                Active Split
              </p>
              <Link
                href={`/dashboard/details/${activeSplit.id}`}
                className="underline"
              >
                {activeSplit.split.name}
              </Link>
            </>
          ) : (
            <div className="flex items-center font-semibold text-stone-500">
              <div>No active split</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
