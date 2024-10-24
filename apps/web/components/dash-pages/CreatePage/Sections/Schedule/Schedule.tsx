import { useFormContext, useWatch } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CADENCE_TO_DESCRIPTION_MAP,
  SPLIT_TYPE_TO_CADENCE_MAP,
} from "@repo/database";
import { SampleSchedule } from "./SampleSchedule";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Schedule = () => {
  const form = useFormContext();
  const { splitType } = useWatch({ control: form.control });
  const cadences =
    SPLIT_TYPE_TO_CADENCE_MAP[
      splitType as keyof typeof SPLIT_TYPE_TO_CADENCE_MAP
    ];

  if (!cadences) {
    return null;
  }

  return (
    <motion.div
      className="p-4 flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-bold tracking-tighter text-xl">
        What weekly schedule would you like?
      </h2>
      <div>
        <FormField
          control={form.control}
          name="cadence"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 md:max-w-[500px]"
                >
                  {cadences?.map((c) => {
                    return (
                      <FormItem
                        key={c}
                        className={cn(
                          "flex items-center space-x-3 space-y-0 border-[1px] border-stone-300 min-h-[50px] p-2 rounded shadow-sm",
                          field.value === c ? "border-black" : "",
                        )}
                      >
                        <FormControl>
                          <RadioGroupItem value={c} />
                        </FormControl>
                        <FormLabel className="font-normal w-full">
                          <div>{CADENCE_TO_DESCRIPTION_MAP[splitType][c]}</div>
                          <span className="text-xs text-stone-800">{c}</span>
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full h-full flex flex-col gap-2 items-center md:w-[500px]">
        <SampleSchedule />
      </div>
    </motion.div>
  );
};
