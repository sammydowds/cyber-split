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
  MUSCLES_TO_DESCRIPTION_MAP,
  SPLIT_TYPE_TO_MUSCLES_MAP,
} from "@/lib/programming/constants";

export const Muscles = () => {
  const form = useFormContext();
  const { splitType } = useWatch({ control: form.control });
  const muscles =
    SPLIT_TYPE_TO_MUSCLES_MAP[
      splitType as keyof typeof SPLIT_TYPE_TO_MUSCLES_MAP
    ];
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="font-bold tracking-tighter text-xl">
        What type of breakdown would you like?
      </h2>
      <div className="pl-4">
        <FormField
          control={form.control}
          name="muscles"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {muscles?.map((m) => {
                    return (
                      <FormItem
                        key={m}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={m} />
                        </FormControl>
                        <FormLabel className="font-normal max-w-[245px]">
                          {MUSCLES_TO_DESCRIPTION_MAP[splitType][m]}
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
    </div>
  );
};
