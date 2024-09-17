import { useFormContext, useWatch } from "react-hook-form";
import { LogWorkoutSchema } from "../types";
import { StrengthSet } from "./StrengthSet";
import { Button } from "../../ui/button";
import { BsCheck } from "react-icons/bs";
import { MdInfo } from "react-icons/md";
import { CirclePlus } from "lucide-react";

interface StrengthGroupProps {
  groupIdx: number;
}
export const StrengthGroup = ({ groupIdx }: StrengthGroupProps) => {
  const { control, setValue } = useFormContext<LogWorkoutSchema>();

  const { name, sets } = useWatch({
    control,
    name: `strengthGroups.${groupIdx}`,
  });

  const exerciseLink = sets.map((e) => e.exercise.exRxLink)?.[0];

  const addNewSet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const lastIdx = sets.length;
    const newSets = [
      ...sets,
      {
        ...sets[lastIdx - 1],
        id: null,
        previousWeight: undefined,
        previousReps: undefined,
      },
    ];
    setValue(`strengthGroups.${groupIdx}.sets`, newSets);
  };

  return (
    <div className="flex justify-between items-center py-3 w-max backdrop-blur-lg bg-white border-[1px] rounded-lg max-md:w-full">
      <div className="flex flex-col w-full gap-[2px] h-full">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-[4px] dark:text-white w-full">
          <div className="flex items-center justify-center gap-2 relative px-4">
            {name}
            {exerciseLink ? (
              <a href={exerciseLink} rel="noopener noreferrer" target="_blank">
                <MdInfo size={24} className="text-stone-400" />
              </a>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center justify-between h-full">
          <table className="w-full font-bold tracking-tighter text-lg text-stone-600">
            <thead className="text-sm">
              <tr>
                <th className="pl-4">Set</th>
                <th>Previous</th>
                <th>Reps</th>
                <th>lb</th>
                <th className="flex justify-center pr-4">
                  <BsCheck size={24} />
                </th>
              </tr>
            </thead>
            <tbody>
              {sets.map((s, idx) => {
                return (
                  <StrengthSet
                    groupIdx={groupIdx}
                    setIdx={idx}
                    key={`${groupIdx}-${idx}`}
                  />
                );
              })}
            </tbody>
          </table>
          <Button
            className="w-[200px] rounded-full flex items-center gap-[4px]"
            variant="outline"
            onClick={addNewSet}
          >
            <CirclePlus size={16} />
            Add Set
          </Button>
        </div>
      </div>
    </div>
  );
};
