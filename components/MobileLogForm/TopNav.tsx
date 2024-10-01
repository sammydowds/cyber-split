import { cn } from "@/lib/utils";
import { DeepTemplateWorkout } from "@/types";
import { Button } from "../ui/button";
import { WorkoutMarker } from "../WorkoutMarker";

interface GroupNavProps {
  template: DeepTemplateWorkout;
  selectedGroup: DeepTemplateWorkout["strengthGroups"][number];
  onClickGroup: (group: DeepTemplateWorkout["strengthGroups"][number]) => void;
}
export const TopNav = ({
  template,
  onClickGroup,
  selectedGroup,
}: GroupNavProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between h-[50px] border-t-[1px] border-black">
        <div className="font-bold text-xl pl-2">{template.name}</div>
      </div>
      <div className="w-full overflow-x-scroll snap-x snap-mandatory flex divide-x divide-dashed shadow z-[100]">
        <div className="flex w-max divide-x divide-solid divide-black border-y-[1px] border-black">
          {template.strengthGroups.map((g, idx) => (
            <div
              key={g.id}
              id={g.id}
              onClick={() => onClickGroup(g)}
              className={cn(
                "h-[75px] min-w-[150px] snap-start flex flex-col font-bold text-stone-400 justify-center bg-stone-200/80 cursor-pointer p-2 flex-nowrap relative",
                selectedGroup.id === g.id ? "bg-white text-black" : "",
              )}
            >
              <div className="absolute top-2 left-2 text-xs flex items-center gap-[4px]">
                <div
                  className={cn(selectedGroup.id === g.id ? "underline" : "")}
                >
                  {idx + 1}
                </div>
                <div className="capitalize text-stone-400">
                  {g.sets[0].exercise.bodyPart?.toLocaleLowerCase()}
                </div>
              </div>
              <div className="whitespace-nowrap text-[16px]">{g.name}</div>
            </div>
          ))}
          <div
            key="end"
            id="end"
            className={cn(
              "h-[75px] min-w-[150px] snap-start flex flex-col font-bold text-stone-400 items-center justify-center bg-red-200/80 cursor-pointer p-2 flex-nowrap",
            )}
          >
            <div className="whitespace-nowrap text-[16px]">End</div>
          </div>
        </div>
      </div>
    </div>
  );
};
