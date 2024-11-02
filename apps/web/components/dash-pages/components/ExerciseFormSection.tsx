import { StrengthGroupSchemaType } from "@/lib/formSchemas/log";
import { Check, ChevronRight, HexagonIcon } from "lucide-react";
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
import { useTimer } from "./useTimer";
import { TimerButton } from "./TimerButton";
import { convertMsToText } from "./helpers";

interface ContentProps {
  group: StrengthGroupSchemaType;
  groupIdx: number;
  restTimeRemaining?: number;
  startTimer: (secs: number) => void;
  resetTime: () => void;
}
const Content = ({
  group,
  groupIdx,
  restTimeRemaining,
  resetTime,
  startTimer,
}: ContentProps) => {
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

    // calc next index
    const groupVals = getValues("strengthGroups")[groupIdx];
    const nextIdx = groupVals.sets.findIndex((set) => !set.dateLogged);
    if (nextIdx > -1 && nextIdx < group.sets.length) {
      setCurrentIdx(currentIdx + 1);
      resetTime();
      startTimer(60);
    } else {
      resetTime();
      setCurrentIdx(-1);
    }
  };

  const onChangeField = (setIdx: number) => {
    setValue(`strengthGroups.${groupIdx}.sets.${setIdx}.dateLogged`, null);
    setCurrentIdx(setIdx);
  };

  return (
    <div className="w-full flex flex-col gap-2 mx-2">
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
      <div className="flex flex-col mt-2">
        <div className="self-end">
          <TimerButton
            timeRemaining={restTimeRemaining}
            startCountdown={() => startTimer(60)}
            stopCountdown={resetTime}
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button
            className="grow font-bold h-[50px] text-lg"
            variant="outline"
            onClick={() => router.push(window.location.pathname)}
          >
            Done
          </Button>
          {currentIdx > -1 ? (
            <Button
              disabled={restTimeRemaining ? true : false}
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

export const ExerciseFormSection = ({ group, groupIdx }: ContentProps) => {
  const form = useFormContext();
  const params = useSearchParams();
  const name = params.get("name");
  const router = useRouter();
  const param_unique_name = name?.replace(/ /g, "");
  const group_unique_name = group.name?.replace(/ /g, "");
  const { timeRemaining, startCountDown, resetCountdown } = useTimer();

  const data = useWatch({ control: form.control, name: "strengthGroups" })[
    groupIdx
  ];

  const loggedSets = data.sets.filter((set) => set.dateLogged);
  const setsText = loggedSets?.length
    ? loggedSets.map((set) => `${set.reps}x${set.weight ?? "-"}`).join(", ")
    : undefined;

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
        <div className="h-[80px] w-[60px] rounded bg-stone-100 relative">
          {setsText ? (
            <div className="bg-green-600 flex items-center justify-center text-white rounded-full h-[20px] w-[20px] absolute -top-1 -right-1">
              <Check size={12} />
            </div>
          ) : null}
        </div>
        <div className="grow flex flex-col font-bold px-2">
          <div>{group.name}</div>
          <div className="text-xs font-normal text-stone-600 flex items-center gap-2">
            {setsText ? (
              <div className="text-green-500">{setsText}</div>
            ) : (
              <div className="text-red-500">Not logged</div>
            )}
            {timeRemaining ? (
              <div className="flex items-center text-red-500">
                Rest: {convertMsToText(timeRemaining)}
              </div>
            ) : null}
          </div>
        </div>

        <ChevronRight className="text-stone-400" />
      </div>

      <Dialog open={group_unique_name === param_unique_name}>
        <DialogContent
          className="bg-white flex flex-col items-center max-md:h-screen max-md:min-w-screen max-md:pt-[75px]"
          hideCloseIcon
          onOpenAutoFocus={(e) => handleDialogOpenAutoFocus(e)}
        >
          <DialogHeader className="text-left w-full">
            <DialogTitle>{group.name}</DialogTitle>
            <DialogDescription>Log data below.</DialogDescription>
          </DialogHeader>
          <Content
            group={group}
            groupIdx={groupIdx}
            resetTime={resetCountdown}
            startTimer={startCountDown}
            restTimeRemaining={timeRemaining}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
