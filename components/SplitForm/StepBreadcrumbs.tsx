import { BsCheck } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export interface StepData {
  description: string;
  meta?: string;
}
interface StepBreadcrumbsProps {
  step: number;
  stepDescriptions: StepData[];
  onClick?: (n: number) => void;
}
export const StepBreadcrumbs = ({
  step,
  stepDescriptions,
  onClick,
}: StepBreadcrumbsProps) => {
  return (
    <div className="flex flex-col items-start gap-[4px] h-fill md:p-4 max-md:p-2 bg-stone-50 border-r-[1px] max-md:hidden">
      {stepDescriptions.map((d, idx) => {
        if (!d) {
          return null;
        }
        const hasCompleted = step > idx;
        return (
          <>
            <Button
              variant="ghost"
              className="flex items-center gap-[4px] justify-evenly p-0 m-0 h-6"
              onClick={() => onClick?.(idx)}
            >
              <div className="flex items-center gap-[4px] relative">
                <div
                  className={cn(
                    "rounded-full h-[24px] w-[24px] text-xs border-[1px] flex items-center justify-center",
                    hasCompleted
                      ? "bg-green-700 text-white border-green-900"
                      : step === idx
                        ? "bg-black text-white border-black"
                        : "",
                  )}
                >
                  {hasCompleted ? <BsCheck size={20} /> : idx + 1}
                </div>
                <div
                  className={cn(
                    "font-semibold text-sm",
                    idx === step ? "text-black" : "",
                  )}
                >
                  {d.description}
                </div>
                {d.meta ? (
                  <div className="text-xs absolute -bottom-3 left-7 text-stone-400">
                    {d.meta}
                  </div>
                ) : null}
              </div>
            </Button>
            {idx < stepDescriptions.length - 1 ? (
              <Separator
                orientation="vertical"
                className={cn("h-4 w-[2px] ml-[12px]")}
              />
            ) : null}
          </>
        );
      })}
    </div>
  );
};
