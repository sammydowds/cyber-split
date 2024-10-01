import { cn } from "@/lib/utils";

interface WorkoutMarkerProps {
  text: string;
  className?: string;
}
export const WorkoutMarker = ({ text, className }: WorkoutMarkerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-7 w-7 rounded-none border-black border-[1px] bg-yellow-300 text-black font-extrabold text-[14px] shadow-[2px_2px_2px_rgba(0,0,0,0.15)]",
        className,
      )}
    >
      {text}
    </div>
  );
};
