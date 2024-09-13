import { Skeleton } from "../ui/skeleton";
import { LoadingGroup } from "./LoadingGroup";

export const LoadingLogWorkoutForm = () => {
  return (
    <div className="md:max-w-[500px] mx-auto mb-[90px] mt-8 w-full bg-white shadow-[3px_3px_3px_0px_rgba(0,0,0,0.3)] overflow-hidden">
      <div className="h-[34px] w-full">
        <Skeleton />
      </div>
      <div className="flex gap-2 items-center p-2">
        <Skeleton className="h-[90px] w-[90px]" />
        <Skeleton className="h-[90px] w-[90px]" />
        <Skeleton className="h-[90px] w-[90px]" />
        <Skeleton className="h-[90px] w-[90px]" />
        <Skeleton className="h-[90px] w-[90px]" />
      </div>
      <LoadingGroup />
      <LoadingGroup />
      <LoadingGroup />
      <LoadingGroup />
      <LoadingGroup />
    </div>
  );
};
