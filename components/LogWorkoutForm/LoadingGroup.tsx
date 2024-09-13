import { Skeleton } from "../ui/skeleton";

export const LoadingSet = () => {
  return (
    <div className="flex gap-2 items-center justify-between w-full pl-12 pr-8">
      <Skeleton className="h-[30px] w-[100%] rounded-none" />
      <Skeleton className="h-[30px] w-[100%] rounded-none" />
      <Skeleton className="h-[30px] w-[100%] rounded-none" />
      <Skeleton className="h-[30px] w-[100%] rounded-none" />
      <Skeleton className="h-[30px] w-[100%] rounded-none" />
    </div>
  );
};

export const LoadingGroup = () => {
  return (
    <div className="flex flex-col gap-[10px] w-full py-4">
      <Skeleton className="h-[24px] w-[70%] ml-4 rounded-none" />
      <div className="flex gap-2 items-center justify-between pl-12 pr-8">
        <Skeleton className="h-[14px] w-[100%] rounded-none" />
        <Skeleton className="h-[14px] w-[100%] rounded-none" />
        <Skeleton className="h-[14px] w-[100%] rounded-none" />
        <Skeleton className="h-[14px] w-[100%] rounded-none" />
        <Skeleton className="h-[14px] w-[100%] rounded-none" />
      </div>
      <LoadingSet />
      <LoadingSet />
      <LoadingSet />
      <Skeleton className="h-[30px] rounded-none" />
    </div>
  );
};
