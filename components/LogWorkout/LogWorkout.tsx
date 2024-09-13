import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./zodSchema";
import { Form } from "../../components/ui/form";
import { StrengthGroups } from "./StrengthGroups/StrengthGroups";
import { TemplateWorkout } from "../../types";
import { useEffect } from "react";
import { LogWorkoutSchema } from "./types";
import { Button } from "../ui/button";

interface LogWorkoutProps {
  template?: TemplateWorkout;
  formRef?: React.RefObject<HTMLFormElement> | null;
  onFormChange?: (data: any) => void;
  handleSubmit?: (data: LogWorkoutSchema) => void;
}
export const LogWorkout = ({
  template,
  onFormChange,
  formRef,
  handleSubmit,
}: LogWorkoutProps) => {
  const form = useForm<LogWorkoutSchema>({
    resolver: zodResolver(schema),
    defaultValues: template,
  });

  const onSubmit = (data: LogWorkoutSchema) => {
    handleSubmit?.(data);
  };

  const values = form.watch();
  useEffect(() => {
    onFormChange?.(values);
  }, [onFormChange, values]);

  return (
    <div className="mx-auto max-md:mb-[150px] mb-[90px] mt-8 flex flex-col bg-white">
      <div className="flex w-full p-2 items-center relative justify-between text-xs text-stone-600">
        {template?.name ? (
          <div className="tracking-tighter font-bold pr-2">
            Name: <span className="italic">{template?.name}</span>
          </div>
        ) : null}
      </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
            <StrengthGroups />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
