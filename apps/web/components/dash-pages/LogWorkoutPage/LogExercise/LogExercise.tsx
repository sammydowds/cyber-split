import { StrengthGroupSchemaType } from "@/lib/formSchemas/log";
import { Check, HexagonIcon, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { VolumeProgressBar } from "./VolumeProgressBar";
interface LogExerciseProps {
  groupIdx: number;
}
export const LogExercise = ({ groupIdx }: LogExerciseProps) => {
  const { control, setValue, getValues, register } = useFormContext();
  const group = useWatch({
    control,
    name: `strengthGroups.${groupIdx}`,
  }) as StrengthGroupSchemaType;
  const router = useRouter();

  const [currentIdx, setCurrentIdx] = useState<number>(
    group.sets.findIndex((set) => !set.dateLogged),
  );
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
    <div className="w-full flex flex-col gap-4">
      <div className="w-full h-[175px] rounded-lg bg-stone-200 shadow-inner flex flex-col items-center justify-center text-stone-300">
        <VideoOff size={30} />
      </div>
      <div className="flex flex-col">
        <div className="text-xl font-bold">{group.name}</div>
        <div className="text-stone-500">Log data below.</div>
      </div>
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
                  {...register(
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
                  {...register(
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
            onClick={(e) => {
              e.preventDefault();
              router.push(window.location.pathname);
            }}
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
              onClick={(e) => {
                e.preventDefault();
                router.push(window.location.pathname);
              }}
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
