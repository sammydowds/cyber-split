import { cn } from "@/lib/utils";
import { Card } from "./ui/card";

export const DashCard = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card
      style={{
        clipPath: "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
      }}
      {...props}
      className={cn(
        props.className,
        "border-none rounded-none shadow-lg relative",
      )}
    />
  );
};
