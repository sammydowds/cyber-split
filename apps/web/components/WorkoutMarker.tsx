import { cn } from "@/lib/utils";

const getBgColor = (text: string) => {
  switch (text) {
    case "A":
      return "bg-green-200";
    case "B":
      return "bg-fuchsia-200";
    case "C":
      return "bg-red-200";
    case "D":
      return "bg-blue-200";
    default:
      return "bg-yellow-200";
  }
};

interface WorkoutMarkerProps {
  text: string;
  className?: string;
}
export const WorkoutMarker = ({ text, className }: WorkoutMarkerProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-7 w-7 rounded text-black border-[1px] border-stone-500 font-extrabold text-[14px] shadow-[2px_2px_2px_rgba(0,0,0,0.15)]",
        className,
        getBgColor(text),
      )}
    >
      {text}
    </div>
  );
};
