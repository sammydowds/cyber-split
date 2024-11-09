import { StrengthGroupSchemaType } from "@/lib/formSchemas/log";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Dumbbell, VideoOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFormContext, useWatch } from "react-hook-form";

interface GroupSummaryProps {
  group: StrengthGroupSchemaType;
  groupIdx: number;
}
export const GroupSummary = ({ group, groupIdx }: GroupSummaryProps) => {
  const form = useFormContext();
  const router = useRouter();
  const group_unique_name = group.name?.replace(/ /g, "");

  const data = useWatch({ control: form.control, name: "strengthGroups" })[
    groupIdx
  ];

  const loggedSets = data.sets.filter((set) => set.dateLogged);
  const allCompleted = loggedSets.length === data.sets.length;
  const setsText = loggedSets?.length
    ? loggedSets.map((set) => `${set.reps}x${set.weight ?? "-"}`).join(", ")
    : undefined;
  const completionText = allCompleted ? (
    <Check size={14} />
  ) : (
    `${loggedSets.length}/${data.sets.length} sets`
  );

  const exerciseYoutubeId = group.sets[0]?.exercise?.youtubeId;

  return (
    <div
      className="flex items-center justify-between w-full"
      onClick={() =>
        router.push(`${window.location.pathname}?name=${group_unique_name}`)
      }
    >
      <div className="h-[70px] w-[100px] rounded bg-stone-100 relative flex flex-col items-center justify-center">
        {loggedSets.length && completionText ? (
          <div
            className={cn(
              "bg-yellow-300 flex items-center justify-center rounded-md h-[20px] w-[50px] text-[10px] absolute top-1 -right-3 shadow text-black z-50 font-bold",
              allCompleted
                ? "h-6 w-6 -right-2 bg-green-600 border-none text-white rounded-full"
                : "",
            )}
          >
            {completionText}
          </div>
        ) : null}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded">
          <img
            src={`https://img.youtube.com/vi/${exerciseYoutubeId}/hqdefault.jpg`}
            alt="YouTube Thumbnail"
            style={{ cursor: "pointer" }}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grow flex flex-col font-bold px-2 text-lg">
        <div className="text-wrap max-md:max-w-[200px]">{group.name}</div>
        <div className="text-sm font-normal text-stone-600 flex items-center gap-2">
          {setsText ? (
            <div className="text-green-500">{setsText}</div>
          ) : (
            <div className="text-stone-400">Not logged</div>
          )}
        </div>
      </div>

      <ChevronRight className="text-stone-400" />
    </div>
  );
};
