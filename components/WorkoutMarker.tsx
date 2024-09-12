import { cn } from "@/lib/utils";

interface WorkoutMarkerProps {
  text: string;
  className?: string;
}
export const WorkoutMarker = ({ text, className }: WorkoutMarkerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-6 w-6 rounded-[2px] bg-yellow-300 text-black font-extrabold",
        className,
      )}
    >
      {text}
    </div>
  );
};
