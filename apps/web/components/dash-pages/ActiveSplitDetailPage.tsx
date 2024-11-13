import { useActiveSplitDetails } from "@/hooks/useActiveSplitDetails";
import {
  CADENCE_TO_DESCRIPTION_MAP,
  SPLIT_TYPE_TO_DESCRIPTION,
  SPLIT_TYPES,
} from "@repo/database";
import { SplitWorkoutsVolume } from "./components/SplitWorkoutsVolume";
import { WorkoutTemplateCard } from "../WorkoutTemplateCard";
import { HorizontalCarousel } from "../HorizontalCarousel";
import { Button } from "../ui/button";
import { useDeactivateSplit } from "@/hooks/useDeactivateSplit";
import { useActiveSplit } from "@/hooks/useActiveSplit";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

interface ActiveSplitDetailPageProps {
  id: string;
}
export const ActiveSplitDetailPage = ({ id }: ActiveSplitDetailPageProps) => {
  const { data, isPending } = useActiveSplitDetails(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: deactivate } = useDeactivateSplit({
    onSuccess: () => {
      toast.success("Ended this split.");
      queryClient.invalidateQueries();
      router.push("/dashboard");
    },
  });
  const { data: activeSplit } = useActiveSplit();

  if (isPending) {
    return null;
  }
  if (data) {
    return (
      <div className="pt-8 flex justify-center">
        <div className="flex flex-col max-w-[500px] max-md:w-full text-black">
          {activeSplit?.id === data?.id ? (
            <div className="bg-green-50 py-[4px] px-2 font-bold flex justify-between items-center mx-4 rounded border-[1px] border-green-600 mb-6">
              <div className="font-bold text-sm text-green-900">Active</div>
              <Button
                variant="destructive"
                className="font-bold"
                size="sm"
                onClick={() => deactivate({ id: data?.id })}
              >
                End Split
              </Button>
            </div>
          ) : null}
          <div className="text-2xl font-semibold tracking-tighter px-4">
            {data?.split.name}
          </div>
          <dl className="flex flex-col gap-[4px] px-4">
            <div className="flex items-center gap-2">
              <dt className="text-sm text-stone-600 font-medium">Cadence</dt>
              <dd className="text-xs font-semibold">
                {
                  CADENCE_TO_DESCRIPTION_MAP[data?.split.type][
                    data?.split.cadence
                  ]
                }
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-sm text-stone-600 font-medium">Split Type</dt>
              <dd className="text-xs font-semibold">
                {SPLIT_TYPE_TO_DESCRIPTION[data?.split.type as SPLIT_TYPES]}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-sm text-stone-600 font-medium">
                Workouts Completed
              </dt>
              <dd className="text-xs font-semibold">
                {data?.split.loggedWorkouts?.length ?? 0}
              </dd>
            </div>

            <div className="flex items-center gap-2">
              <dt className="text-sm text-stone-600 font-medium">Start</dt>
              <dd className="flex text-xs items-center gap-2">
                {new Date(data?.start).toLocaleDateString("en-us", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                })}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-sm text-stone-600 font-medium">End</dt>
              <dd className="flex text-xs items-center gap-2">
                {new Date(data?.end).toLocaleDateString("en-us", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                })}
              </dd>
            </div>
          </dl>
          <SplitWorkoutsVolume id={data.split.id} />
          <HorizontalCarousel>
            {data.split.workouts.map((workout) => {
              return <WorkoutTemplateCard workout={workout} editable hideCta />;
            })}
          </HorizontalCarousel>
        </div>
      </div>
    );
  }
};
