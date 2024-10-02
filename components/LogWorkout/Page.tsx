import { DeepTemplateWorkout } from "@/types";
import { Plus } from "lucide-react";
import { Row } from "./Row";
import { useFormContext, useWatch } from "react-hook-form";
import { LogWorkoutSchema } from "./types";
export const Page = ({
  group,
  groupIdx,
}: {
  group: DeepTemplateWorkout["strengthGroups"][number];
  groupIdx: number;
}) => {
  const { control, setValue } = useFormContext<LogWorkoutSchema>();

  const { sets } = useWatch({
    control,
    name: `strengthGroups.${groupIdx}`,
  });

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
    <div className="w-full flex flex-col relative">
      <div className="flex items-center px-6 py-2 font-bold text-xl tracking-tighter relative border-b-[1px] border-black bg-yellow-300 bg-opacity-80">
        <span className="z-50">{group.name}</span>
      </div>
      <div className="flex flex-col text-center">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-x border-gray-300 w-[50px]"></th>
              <th className="border-b border-x border-gray-300 p-2">Reps</th>
              <th className="border-b border-x border-gray-300 p-2">Weight</th>
            </tr>
          </thead>
          <tbody>
            {sets.map((s, setIdx) => {
              return (
                <Row
                  key={s.exercise.name}
                  groupIdx={groupIdx}
                  setIdx={setIdx}
                />
              );
            })}
            <tr>
              <td className="border border-gray-300 text-stone-400 w-[50px] m-auto"></td>
              <td colSpan={2} className="border border-gray-300 h-[40px]">
                <button
                  className="w-full h-full bg-stone-100 flex items-center justify-center gap-[4px] text-stone-500 text-sm"
                  onClick={addNewSet}
                >
                  <Plus size={16} />
                  Add Set
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
