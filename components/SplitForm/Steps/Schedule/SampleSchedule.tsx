import { createWorkoutSchedule } from "@/../../lib/programming/createWorkoutSchedule";
import { useFormContext, useWatch } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { MonthTable } from "@/components/MonthTable";
import { motion } from "framer-motion";

export const SampleSchedule = () => {
  const form = useFormContext();
  const { cadence, skipDays } = useWatch({ control: form.control });
  if (!cadence) {
    return;
  }
  const handleCheckboxChange = (day: number) => {
    let newSkipDays = skipDays;
    if (skipDays?.includes(day)) {
      newSkipDays = newSkipDays.filter((d: number) => d !== day);
    } else {
      newSkipDays = [...(skipDays ?? []), day];
    }
    form.setValue("skipDays", newSkipDays);
  };
  const { schedule } = createWorkoutSchedule({
    cadence,
    skipDays,
  });
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center gap-[8px]">
        <div className="flex flex-col w-full max-w-[325px] font-semibold gap-[4px]">
          <div className="flex items-center gap-2">
            <div className="text-xs">Skip:</div>
            <div className="flex items-center gap-[4px] tracking-tighter text-xs font-bold">
              <Checkbox
                checked={skipDays?.includes(1)}
                onClick={() => handleCheckboxChange(1)}
              />
              M
            </div>
            <div className="flex items-center gap-[4px] tracking-tighter text-xs font-bold">
              <Checkbox
                checked={skipDays?.includes(2)}
                onClick={() => handleCheckboxChange(2)}
              />
              T
            </div>
            <div className="flex items-center gap-[4px] tracking-tighter text-xs font-bold">
              <Checkbox
                checked={skipDays?.includes(3)}
                onClick={() => handleCheckboxChange(3)}
              />
              W
            </div>
            <div className="flex items-center gap-[4px] tracking-tighter text-xs font-bold">
              <Checkbox
                checked={skipDays?.includes(4)}
                onClick={() => handleCheckboxChange(4)}
              />
              Th
            </div>
            <div className="flex items-center gap-[4px] tracking-tighter text-xs font-bold">
              <Checkbox
                checked={skipDays?.includes(5)}
                onClick={() => handleCheckboxChange(5)}
              />
              F
            </div>
            <div className="flex items-center gap-[4px] tracking-tighter text-xs font-bold">
              <Checkbox
                checked={skipDays?.includes(6)}
                onClick={() => handleCheckboxChange(6)}
              />
              Sa
            </div>
            <div className="flex items-center gap-[4px] tracking-tighter text-xs font-bold">
              <Checkbox
                checked={skipDays?.includes(0)}
                onClick={() => handleCheckboxChange(0)}
              />
              Su
            </div>
          </div>
        </div>
        <MonthTable weeks={schedule} />
      </div>
    </motion.div>
  );
};
