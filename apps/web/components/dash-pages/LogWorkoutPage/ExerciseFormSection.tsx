import { StrengthGroupSchemaType } from "@/lib/formSchemas/log";
import { Check, ChevronRight, Dumbbell, HexagonIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { VolumeProgressBar } from "./VolumeProgressBar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentProps {
  group: StrengthGroupSchemaType;
  groupIdx: number;
}
const Content = ({ group, groupIdx }: ContentProps) => {
  const form = useFormContext();
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState<number>(
    group.sets.findIndex((set) => !set.dateLogged),
  );
  const { setValue, getValues } = form;

  const logCurrentIndex = (e: React.MouseEvent) => {
    e?.preventDefault();
    setValue(
      `strengthGroups.${groupIdx}.sets.${currentIdx}.dateLogged`,
      new Date(),
    );
    const groupVals = getValues("strengthGroups")[groupIdx];

    // calc next index
    const nextIdx = groupVals.sets.findIndex((set) => !set.dateLogged);
    if (nextIdx > -1 && nextIdx < group.sets.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(-1);
    }
  };

  const onChangeField = (setIdx: number) => {
    setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.dateLogged`, null);
    setCurrentIdx(setIdx);
  };

  return (
    <div className="w-full flex flex-col gap-4 mx-2">
      {group.sets.map((set, setIdx) => {
        const { dateLogged } = set;
        return (
          <div className="flex items-center gap-2" key={setIdx}>
            <div className="flex items-center justify-center h-[40px] w-[40px]">
              <HexagonIcon
                strokeWidth={0}
                className={cn(
                  "fill-stone-300 relative",
                  set.dateLogged ? "fill-green-600" : null,
                  currentIdx === setIdx ? "fill-black" : null,
                )}
                size={42}
              />
              {set.dateLogged ? (
                <div className="absolute text-sm font-bold text-white">
                  <Check size={18} />
                </div>
              ) : (
                <div className="absolute text-sm font-bold text-white">
                  {setIdx + 1}
                </div>
              )}
            </div>
            <div className={cn("grow", dateLogged ? "text-stone-400" : "")}>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id={`${groupIdx}-${setIdx}-reps`}
                  className={cn(
                    "block p-2 w-full text-[20px] text-gray-900 bg-transparent rounded border-[2px] border-stone-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-stone-800 peer ring-0 outline-none",
                    setIdx === currentIdx ? "border-stone-400" : null,
                    set?.dateLogged ? "text-green-700" : null,
                  )}
                  {...form.register(
                    `strengthGroups.${groupIdx}.sets.${setIdx}.reps`,
                  )}
                  placeholder=" "
                  onChange={() => onChangeField(setIdx)}
                />
                <label
                  htmlFor={`${groupIdx}-${setIdx}-reps`}
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Reps
                </label>
              </div>
            </div>
            <div className={cn("grow", dateLogged ? "text-stone-400" : "")}>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id={`${groupIdx}-${setIdx}-weight`}
                  className={cn(
                    "block p-2 w-full text-[20px] text-gray-900 bg-transparent rounded border-[2px] border-stone-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-stone-800 peer ring-0 outline-none",
                    setIdx === currentIdx ? "border-stone-400" : null,
                    set?.dateLogged ? "text-green-700" : null,
                  )}
                  {...form.register(
                    `strengthGroups.${groupIdx}.sets.${setIdx}.weight`,
                  )}
                  placeholder=" "
                  onChange={() => onChangeField(setIdx)}
                />
                <label
                  htmlFor={`${groupIdx}-${setIdx}-weight`}
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Weight
                </label>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col grow">
          <VolumeProgressBar group={group} />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="grow font-bold h-[50px] text-lg"
            variant="outline"
            onClick={() => router.push(window.location.pathname)}
          >
            Done
          </Button>
          {currentIdx > -1 ? (
            <Button
              className="grow font-bold h-[50px] text-lg"
              onClick={(e) => logCurrentIndex(e)}
            >
              Log Set
            </Button>
          ) : (
            <Button
              className="grow font-bold h-[50px] text-lg"
              onClick={() => router.push(window.location.pathname)}
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const ExerciseFormSection = ({
  group,
  groupIdx,
}: Pick<ContentProps, "group" | "groupIdx">) => {
  const form = useFormContext();
  const params = useSearchParams();
  const name = params.get("name");
  const router = useRouter();
  const param_unique_name = name?.replace(/ /g, "");
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

  const handleDialogOpenAutoFocus = (
    event: React.FocusEvent<HTMLDivElement>,
  ) => {
    event?.preventDefault();
    const firstUnloggedSetIndex = group.sets.findIndex(
      (set) => !set.dateLogged,
    );
    const inputElement = document.getElementById(
      `${groupIdx}-${firstUnloggedSetIndex}-weight`,
    );

    if (inputElement) {
      // delay for opening
      setTimeout(() => {
        (inputElement as HTMLInputElement).focus();
      }, 100);
    }
  };
  return (
    <>
      <div
        className="flex items-center justify-between w-full"
        onClick={() =>
          router.push(`${window.location.pathname}?name=${group_unique_name}`)
        }
      >
        <div className="h-[90px] w-[70px] rounded bg-stone-100 relative border-[1px] flex flex-col items-center justify-center">
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
          <div>
            <Dumbbell className="text-stone-200" />
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

      <Dialog open={group_unique_name === param_unique_name}>
        <DialogContent
          className="bg-white flex flex-col items-center max-md:h-screen max-md:min-w-screen max-md:pt-[50px]"
          hideCloseIcon
          onOpenAutoFocus={(e) => handleDialogOpenAutoFocus(e)}
        >
          <DialogHeader className="text-left w-full flex-col">
            <DialogTitle>{group.name}</DialogTitle>
            <DialogDescription>Log data below.</DialogDescription>
          </DialogHeader>
          <Content group={group} groupIdx={groupIdx} />
        </DialogContent>
      </Dialog>
    </>
  );
};
