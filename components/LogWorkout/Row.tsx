import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { NumberInput } from "./NumberInput";
import { LogWorkoutSchema } from "./types";

interface RowProps {
  groupIdx: number;
  setIdx: number;
}
export const Row = ({ groupIdx, setIdx }: RowProps) => {
  const { control, setValue } = useFormContext<LogWorkoutSchema>();

  const { reps, dateLogged, weight } = useWatch({
    control,
    name: `strengthGroups.${groupIdx}.sets.${setIdx}`,
  });

  const handleChangeReps = (n?: number) => {
    setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.reps`, n);
  };

  const handleChangeWeight = (n?: number) => {
    setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.weight`, n);
  };

  return (
    <tr className={cn(dateLogged ? "bg-green-100" : "")}>
      <td className="border border-gray-300 w-[50px]">{setIdx + 1}</td>
      <td className="border border-gray-300 h-[50px]">
        <NumberInput
          value={reps}
          onChange={handleChangeReps}
          inputClass={cn(dateLogged ? "bg-green-100" : "")}
        />
      </td>
      <td className="border border-gray-300 h-[50px]">
        <NumberInput
          value={weight}
          onChange={handleChangeWeight}
          inputClass={cn(dateLogged ? "bg-green-100" : "")}
        />
      </td>
    </tr>
  );
};
