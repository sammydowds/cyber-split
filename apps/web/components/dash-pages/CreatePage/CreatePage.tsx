import { useCreateSplit } from "@/hooks/useCreateSplit";
import { useQueryClient } from "@tanstack/react-query";
import { formSchema, FormSchemaType } from "@/lib/formSchemas/create";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../ui/form";
import { Button } from "../../ui/button";
import { SplitType } from "./Sections/SplitType";
import { Workouts } from "./Sections/Workouts/Workouts";
import { Schedule } from "./Sections/Schedule/Schedule";
import { Name } from "./Sections/Name";
import { z } from "zod";
import { useRouter } from "next/router";
import { Loader } from "lucide-react";

export const CreatePage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: createSplit, isPending } = useCreateSplit({
    onSuccess: async (data) => {
      await queryClient.setQueryData(["activeSplit"], data?.data);
      await queryClient.invalidateQueries({ queryKey: ["activeSplit"] });
      await queryClient.invalidateQueries({ queryKey: ["allSplits"] });
      router.push("/dashboard/library");
    },
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createSplit(values);
  };

  console.log("values", form.getValues());
  return (
    <div className="flex flex-col items-center">
      <div className="w-full md:max-w-[600px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col"
          >
            <Name />
            <SplitType />
            <Workouts />
            <Schedule />
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="font-bold"
            >
              {isPending ? (
                <Loader className="animate-spinner" />
              ) : (
                "Create Split"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
