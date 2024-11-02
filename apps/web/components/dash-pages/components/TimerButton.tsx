import { Button } from "@/components/ui/button";
import { Play, Square, Timer } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { convertMsToText } from "./helpers";

const CustomButton = ({
  onClick,
  started,
  children,
}: {
  children: ReactNode;
  onClick: () => void;
  started: boolean;
}) => {
  return (
    <Button
      size="sm"
      className={cn(
        "rounded-full flex items-center gap-2 w-max font-bold text-xs",
        started ? "bg-red-500 animate-pulse" : null,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

interface TimerButtonProps {
  timeRemaining?: number;
  startCountdown: () => void;
  stopCountdown: () => void;
}
export const TimerButton = ({
  timeRemaining,
  startCountdown,
  stopCountdown,
}: TimerButtonProps) => {
  if (timeRemaining) {
    return (
      <CustomButton started={true} onClick={stopCountdown}>
        <Timer size={14} />
        <div>Rest</div>
        <div>{convertMsToText(timeRemaining)}</div>
      </CustomButton>
    );
  }
  return (
    <CustomButton started={false} onClick={() => startCountdown()}>
      <div>Rest</div>
      <div>
        <Play size={14} />
      </div>
    </CustomButton>
  );
};
