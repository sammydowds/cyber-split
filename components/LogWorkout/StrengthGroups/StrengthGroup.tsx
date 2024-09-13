import { useFormContext, useWatch } from "react-hook-form";
import { LogWorkoutSchema } from "../types";
import { StrengthSet } from "./StrengthSet";
import { Button } from "../../../components/ui/button";
import { BsCheck } from "react-icons/bs";
import { MdInfo } from "react-icons/md";

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
    <div className="flex justify-between items-center w-full py-3">
      <div className="flex flex-col w-full gap-[2px]">
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
        <div className="flex flex-col gap-2">
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
            className="w-full bg-stone-50 text-stone-500"
            variant="ghost"
            onClick={addNewSet}
          >
            Add Set
          </Button>
        </div>
      </div>
    </div>
  );
};
