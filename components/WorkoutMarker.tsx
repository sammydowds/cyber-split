import { cn } from "@/lib/utils";

interface WorkoutMarkerProps {
  text: string;
  className?: string;
}
export const WorkoutMarker = ({ text, className }: WorkoutMarkerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-7 w-7 rounded-sm bg-yellow-300 text-black font-extrabold text-[14px]",
        className,
      )}
    >
      {text}
    </div>
  );
};
