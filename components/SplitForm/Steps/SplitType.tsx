import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SPLIT_TYPES } from "@/lib/programming/enums";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SPLIT_TYPE_TO_DESCRIPTION,
  SPLIT_TYPE_TO_META_DESCRIPTION,
} from "@/lib/programming/constants";
import { motion } from "framer-motion";

export const SplitType = () => {
  const form = useFormContext();

  return (
    <motion.div
      className="p-4 flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-bold tracking-tighter text-lg max-w-[345px]">
          What kind of split do you want?
        </h2>
        <p className="text-sm text-stone-600 max-w-[330px]">
          If you are a beginner or resuming from a previous break, it is
          recommended to choose a 2-day split.
        </p>
      </div>
      <FormField
        control={form.control}
        name="splitType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={SPLIT_TYPES.FB} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <div>{SPLIT_TYPE_TO_META_DESCRIPTION[SPLIT_TYPES.FB]}</div>
                    <span className="text-xs text-stone-800">
                      {SPLIT_TYPE_TO_DESCRIPTION[SPLIT_TYPES.FB]}
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={SPLIT_TYPES.TWO_DAY} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <div>
                      {SPLIT_TYPE_TO_META_DESCRIPTION[SPLIT_TYPES.TWO_DAY]}
                    </div>
                    <span className="text-xs text-stone-800">
                      {SPLIT_TYPE_TO_DESCRIPTION[SPLIT_TYPES.TWO_DAY]}
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={SPLIT_TYPES.THREE_DAY} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <div>
                      {SPLIT_TYPE_TO_META_DESCRIPTION[SPLIT_TYPES.THREE_DAY]}
                    </div>
                    <span className="text-xs text-stone-800">
                      {SPLIT_TYPE_TO_DESCRIPTION[SPLIT_TYPES.THREE_DAY]}
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={SPLIT_TYPES.FOUR_DAY} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    <div>
                      {SPLIT_TYPE_TO_META_DESCRIPTION[SPLIT_TYPES.FOUR_DAY]}
                    </div>
                    <span className="text-xs text-stone-800">
                      {SPLIT_TYPE_TO_DESCRIPTION[SPLIT_TYPES.FOUR_DAY]}
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};
