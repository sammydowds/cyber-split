import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { BsCheck } from "react-icons/bs";

interface CheckboxProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isChecked?: boolean;
}
export const Checkbox = ({ onClick, isChecked }: CheckboxProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center h-[32px] px-3 shadow-none rounded-full hover:cursor-pointer hover:bg-unset bg-stone-100 text-stone-500",
        isChecked ? "bg-green-500 text-white" : "",
      )}
    >
      <BsCheck size={30} />
    </Button>
  );
};
