import { cn } from "@/lib/utils";
import { DeepTemplateWorkout } from "@/types";

interface GroupNavProps {
  groups: DeepTemplateWorkout["strengthGroups"];
  selectedGroup: DeepTemplateWorkout["strengthGroups"][number];
  onClickGroup: (group: DeepTemplateWorkout["strengthGroups"][number]) => void;
}
export const GroupNav = ({
  groups,
  onClickGroup,
  selectedGroup,
}: GroupNavProps) => {
  return (
    <div className="w-full overflow-x-scroll snap-x snap-mandatory flex divide-x divide-dashed shadow z-[100]">
      <div className="flex w-max divide-x divide-solid divide-black border-y-[1px] border-black">
        {groups.map((g) => (
          <div
            key={g.id}
            id={g.id}
            onClick={() => onClickGroup(g)}
            className={cn(
              "h-[75px] min-w-[150px] snap-start flex flex-col font-bold text-stone-400 items-center justify-center bg-stone-200/80 cursor-pointer p-2 flex-nowrap",
              selectedGroup.id === g.id ? "bg-white text-black" : "",
            )}
          >
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
  );
};
