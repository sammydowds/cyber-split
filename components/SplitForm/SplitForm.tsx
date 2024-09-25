import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formSchema, FormSchemaType } from "./schema";
import { useNavigation } from "./useNavigation";
import { errorCheck, STEPS } from "./Steps/helpers";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useCreateSplit } from "@/hooks/useCreateSplit";
import { useQueryClient } from "@tanstack/react-query";

export function SplitForm() {
  const { step, next, previous } = useNavigation();
  const queryClient = useQueryClient();
  const { mutate: createSplit, isPending } = useCreateSplit({
    onSuccess: (data) => {
      queryClient.setQueryData(["activeSplit"], data?.data);
      queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
    },
  });
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createSplit(values);
  };

  const { muscles, splitType } = useWatch({ control: form.control });

  useEffect(() => {
    form.setValue("cadence", null);
    form.setValue("muscles", null);
    form.setValue("workouts", []);
  }, [splitType]);

  useEffect(() => {
    form.setValue("workouts", []);
  }, [muscles]);

  if (isPending) {
    return null;
  }

  const disable = errorCheck(step, form.watch());
  const hidePrevious = step === 0;
  const lastStep = step === STEPS.length - 1;
  console.log(form.formState.errors);

  return (
    <div className="flex flex-col justify-between gap-2 w-full relative overflow-hidden overflow-y-scroll">
      <div className="flex h-[50px] items-center p-2 gap-2 w-full bg-white justify-between shadow sticky top-0 z-[1000]">
        <div className="text-sm font-bold">Program Builder</div>
        <div>
          <Button
            className={cn(hidePrevious ? "hidden" : "")}
            variant="ghost"
            onClick={previous}
          >
            Previous
          </Button>
          {lastStep ? (
            <Button type="submit" form="split-form" disabled={disable}>
              Finish
            </Button>
          ) : (
            <Button onClick={next} disabled={disable}>
              {step === 0 ? "Get Started" : "Next"}
            </Button>
          )}
        </div>
      </div>
      <div className="h-max mb-[364px]">
        <Form {...form}>
          <form
            id="split-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 grow flex flex-col items-center justify-between w-full overflow-y-scroll"
          >
            {STEPS[step]}
          </form>
        </Form>
      </div>
    </div>
  );
}
