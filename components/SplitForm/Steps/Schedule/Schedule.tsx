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
} from "@/lib/programming/constants";
import { SampleSchedule } from "./SampleSchedule";
import { motion } from "framer-motion";

export const Schedule = () => {
  const form = useFormContext();
  const { splitType } = useWatch({ control: form.control });
  const cadences =
    SPLIT_TYPE_TO_CADENCE_MAP[
      splitType as keyof typeof SPLIT_TYPE_TO_CADENCE_MAP
    ];

  return (
    <motion.div
      className="p-4 flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="font-bold tracking-tighter text-lg">
        What schedule would you like?
      </h2>
      <FormField
        control={form.control}
        name="cadence"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {cadences.map((c) => {
                  return (
                    <FormItem
                      key={c}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={c} />
                      </FormControl>
                      <FormLabel className="font-normal md:max-w-[330px] max-md:max-w-[160px]">
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
      <SampleSchedule />
    </motion.div>
  );
};
