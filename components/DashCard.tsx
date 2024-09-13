import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

export const DashCard = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card
      {...props}
      className={cn(
        props.className,
        "border-[1px] border-stone-300 shadow-lg relative rounded-[8px]",
      )}
    />
  );
};
