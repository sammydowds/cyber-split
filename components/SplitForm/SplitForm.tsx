import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema, FormSchemaType } from "./schema";
import { useNavigation } from "./useNavigation";
import { STEP_FIELD_VALUES, STEPS } from "./Steps/helpers";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useCreateSplit } from "@/hooks/useCreateSplit";
import { useQueryClient } from "@tanstack/react-query";

export function SplitForm() {
  const { step, next, previous, setStep } = useNavigation();
  const queryClient = useQueryClient();
  const { mutate: createSplit, isPending } = useCreateSplit({
    onSuccess: (data) => {
      queryClient.setQueryData(["activeSplit"], data?.data);
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
    },
  });
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createSplit(values);
  };

  const { muscles, splitType } = useWatch({ control: form.control });

  useEffect(() => {
    form.setValue("cadence", null);
    form.setValue("muscles", null);
    form.setValue("workouts", null);
  }, [splitType, form]);

  useEffect(() => {
    form.setValue("workouts", null);
  }, [muscles, form]);

  if (isPending) {
    return null;
  }

  const fieldValueKey = STEP_FIELD_VALUES[step] as keyof FormSchemaType | null;
  const disable = fieldValueKey ? !form.getValues(fieldValueKey) : false;
  const hidePrevious = step === 0;
  const lastStep = step === STEPS.length - 1;
  return (
    <div className="flex gap-2 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 grow flex flex-col items-left justify-between w-full"
        >
          {STEPS[step]}
          {lastStep ? (
            <div className="flex items-center gap-2 justify-end w-full p-4 pt-2">
              <>
                <Button
                  className={cn(hidePrevious ? "hidden" : "")}
                  variant="ghost"
                  onClick={previous}
                >
                  Previous
                </Button>
                <Button type="submit" disabled={disable}>
                  Finish
                </Button>
              </>
            </div>
          ) : null}
          {lastStep ? null : (
            <div className="flex items-center p-4 pt-2 gap-2 justify-end w-full">
              <>
                <Button
                  className={cn(hidePrevious ? "hidden" : "")}
                  variant="ghost"
                  onClick={previous}
                >
                  Previous
                </Button>
                <Button onClick={next} disabled={disable}>
                  {step === 0 ? "Get Started" : "Next"}
                </Button>
              </>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
