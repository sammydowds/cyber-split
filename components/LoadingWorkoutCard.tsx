import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingWorkoutCardProps {
  hideCta?: boolean;
}
export const LoadingWorkoutCard = ({ hideCta }: LoadingWorkoutCardProps) => {
  return (
    <Card className="w-[290px] overflow-hidden shadow-sm rounded-[2px]">
      <CardHeader className="p-0">
        <CardTitle>
          <Skeleton className="w-[45%] h-[34px] rounded-sm m-2" />
        </CardTitle>
      </CardHeader>

      <Separator />
      <CardContent className="p-0 overflow-hidden">
        <div className="flex flex-col gap-2 p-2">
          <Skeleton className="w-full h-[24px] rounded-sm" />
          <Skeleton className="w-[100px] h-[12px] rounded-sm" />
          <Skeleton className="w-full h-[24px] rounded-sm" />
          <Skeleton className="w-[100px] h-[12px] rounded-sm" />
          <Skeleton className="w-full h-[24px] rounded-sm" />
          <Skeleton className="w-[100px] h-[12px] rounded-sm" />
          <Skeleton className="w-full h-[24px] rounded-sm" />
          <Skeleton className="w-[100px] h-[12px] rounded-sm" />
        </div>
      </CardContent>
      {hideCta ? null : (
        <>
          <Separator />
          <CardFooter className={cn("p-2 flex items-center justify-center")}>
            <Button className="w-full" disabled>
              Log Workout
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
