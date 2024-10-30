import { StrengthGroupSchemaType } from "@/lib/formSchemas/log";
import { Check, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import pluralize from "pluralize";

interface ContentProps {
  group: StrengthGroupSchemaType;
  groupIdx: number;
}
const Content = ({ group, groupIdx }: ContentProps) => {
  const form = useFormContext();

  const { setValue } = form;
  const handleCheckToggle = (
    groupIdx: number,
    setIdx: number,
    checked: boolean | string,
  ) => {
    setValue(
      `strengthGroups.${groupIdx}.sets.${setIdx}.dateLogged`,
      checked === true ? new Date() : null,
    );
  };

  return (
    <div className="w-full flex flex-col gap-2 mx-2">
      {group.sets.map((set, setIdx) => {
        const { dateLogged } = set;
        return (
          <div className="flex items-center gap-2" key={setIdx}>
            <div className="flex items-center gap-2 text-nowrap">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckToggle(groupIdx, setIdx, checked)
                }
                className="h-[30px] w-[30px]"
                checked={!!dateLogged}
              />
              <div
                className={cn(
                  "min-w-[75px]",
                  dateLogged
                    ? "line-through text-stone-400 decoration-[2px] decoration-stone-800/30"
                    : "",
                )}
              >
                Set {setIdx + 1}
              </div>
            </div>
            <div className={cn("grow", dateLogged ? "text-stone-400" : "")}>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id={`${groupIdx}-${setIdx}-reps`}
                  className="block p-2 w-full text-[16px] text-gray-900 bg-transparent rounded border-[2px] border-stone-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-stone-800 peer ring-0 outline-none"
                  {...form.register(
                    `strengthGroups.${groupIdx}.sets.${setIdx}.reps`,
                  )}
                  placeholder=" "
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
                  className="block p-2 w-full text-[16px] text-gray-900 bg-transparent rounded border-[2px] border-stone-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:border-stone-800 peer ring-0 outline-none"
                  {...form.register(
                    `strengthGroups.${groupIdx}.sets.${setIdx}.weight`,
                  )}
                  placeholder=" "
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
    </div>
  );
};

export const ExerciseFormSection = ({ group, groupIdx }: ContentProps) => {
  const form = useFormContext();

  const data = useWatch({ control: form.control, name: "strengthGroups" })[
    groupIdx
  ];

  const loggedSets = data.sets.filter((set) => set.dateLogged);
  const setsText = loggedSets?.length
    ? loggedSets.map((set) => `${set.reps}x${set.weight ?? "-"}`).join(", ")
    : undefined;
  return (
    <Dialog>
      <DialogTrigger className="w-full flex items-center text-left justify-between">
        <div className="h-[80px] w-[60px] rounded bg-stone-100 relative">
          {setsText ? (
            <div className="bg-green-600 flex items-center justify-center text-white rounded-full h-[20px] w-[20px] absolute -top-1 -right-1">
              <Check size={12} />
            </div>
          ) : null}
        </div>
        <div className="grow flex flex-col font-bold px-2">
          <div>{group.name}</div>
          <div className="text-xs font-normal text-stone-600">
            {setsText ? (
              <div className="text-green-500">{setsText}</div>
            ) : (
              <div className="text-red-500">Not logged</div>
            )}
          </div>
        </div>
        <ChevronRight className="text-stone-400" />
      </DialogTrigger>
      <DialogContent className="bg-white flex flex-col items-center max-md:h-screen max-md:min-w-screen max-md:pt-[75px]">
        <DialogHeader className="text-left w-full">
          <DialogTitle>{group.name}</DialogTitle>
          <DialogDescription>Log data below.</DialogDescription>
        </DialogHeader>
        <Content group={group} groupIdx={groupIdx} />
        <DialogFooter className="w-full">
          <DialogClose>
            <Button variant="outline" className="w-full">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
