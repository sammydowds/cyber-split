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
        "flex items-center justify-center p-0 w-[40px] h-[40px] shadow-none rounded-full border-[1px] hover:cursor-pointer hover:bg-unset bg-stone-50/80 text-stone-500",
        isChecked ? "bg-green-500 text-white border-green-600" : "",
      )}
    >
      <BsCheck size={24} />
    </Button>
  );
};
