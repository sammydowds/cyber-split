import { useFormContext, useWatch } from "react-hook-form";
import { LogWorkoutSchema } from "../types";
import { Checkbox } from "../Checkbox";
import { cn } from "@/lib/utils";
import { NumberInput } from "../NumberInput";
import { FaMedal } from "react-icons/fa";
import { calcOneRepMax } from "@/lib/calcOneRepMax";
import toast from "react-hot-toast";

interface StrengthSetProps {
  groupIdx: number;
  setIdx: number;
}
export const StrengthSet = ({ groupIdx, setIdx }: StrengthSetProps) => {
  const { control, setValue, getValues } = useFormContext<LogWorkoutSchema>();

  const { reps, dateLogged, weight, previousReps, previousWeight } = useWatch({
    control,
    name: `strengthGroups.${groupIdx}.sets.${setIdx}`,
  });

  const handleChangeReps = (n?: number) => {
    setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.reps`, n);
  };

  const handleChangeWeight = (n?: number) => {
    setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.weight`, n);
  };

  const handleCheckBoxClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!dateLogged) {
      setValue(
        `strengthGroups.${groupIdx}.sets.${setIdx}.dateLogged`,
        new Date(),
      );
    } else {
      setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.dateLogged`, null);
    }
  };
  const oldOneRepMax =
    previousWeight && previousReps
      ? calcOneRepMax(previousWeight, previousReps)
      : undefined;
  const currentOneRepMax =
    weight && reps ? calcOneRepMax(weight, reps) : undefined;
  const increasedFromPrevious =
    oldOneRepMax && currentOneRepMax ? currentOneRepMax > oldOneRepMax : false;

  return (
    <tr className={cn(dateLogged ? "bg-green-100" : "")}>
      <td className="min-w-[80px] relative">
        <div className="flex items-center justify-center gap-[2px]">
          {increasedFromPrevious ? (
            <FaMedal className="text-yellow-500" />
          ) : null}
          {setIdx + 1}
        </div>
      </td>
      <td className="text-center text-sm">
        {previousReps && previousWeight
          ? `${previousReps} x ${previousWeight} lb`
          : "-"}
      </td>
      <td>
        <NumberInput
          value={reps}
          onChange={handleChangeReps}
          inputClass={cn(dateLogged ? "bg-green-100" : "")}
        />
      </td>
      <td>
        <NumberInput
          value={weight}
          onChange={handleChangeWeight}
          inputClass={cn(dateLogged ? "bg-green-100" : "")}
        />
      </td>
      <td className="flex justify-center pr-4">
        <Checkbox onClick={handleCheckBoxClick} isChecked={!!dateLogged} />
      </td>
    </tr>
  );
};