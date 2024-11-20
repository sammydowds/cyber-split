import { usePostWorkoutData } from "@/hooks/usePostWorkoutData";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { WorkoutMarker } from "../WorkoutMarker";
import { ArrowDown, ArrowUp, Check, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Confetti from "react-confetti";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

interface PostWorkoutPageProps {
  id: string;
  showConfetti?: boolean;
}
export const PostWorkoutPage = ({ id, showConfetti }: PostWorkoutPageProps) => {
  const { data, isPending } = usePostWorkoutData(id);
  const router = useRouter();

  if (isPending || !data) {
    return null;
  }

  const chartConfig = {
    exerciseVolume: {
      label: "Exercise Volume",
      color: "#8884d8",
    },
  };

  if (showConfetti) {
    toast.success("Workout saved to server.", {
      position: "top-right",
    });
  }

  return (
    <div className="flex flex-col gap-4 w-full text-black">
      {showConfetti ? (
        <Confetti
          colors={["#fde047", "black"]}
          numberOfPieces={500}
          recycle={false}
          gravity={0.1}
        />
      ) : null}
      <div className="flex items-center gap-4 pt-4 px-4">
        <div className="flex items-center text-3xl gap-2">
          <WorkoutMarker text={data.letterLabel} />
          <div className="font-bold">{data.name}</div>
        </div>
      </div>

      <div className="px-4">
        {data?.Split?.name ? (
          <div className="text-xs italic text-stone-700">
            Split: {data?.Split?.name}
          </div>
        ) : null}
      </div>

      {Object.entries(data.exerciseVolumes).map(([groupName, exerciseData]) => {
        const group = data.strengthGroups.filter(
          (group) => group.name === groupName,
        )[0];

        const changeSinceLastLogged =
          exerciseData.data.length >= 2 &&
          exerciseData.data[exerciseData.data.length - 1] &&
          !!exerciseData.data[0]
            ? Math.round(
                ((exerciseData.data[exerciseData.data.length - 1].volume -
                  exerciseData.data[0].volume) /
                  exerciseData.data[0].volume) *
                  100,
              )
            : 0;

        if (!exerciseData.data.filter((obj) => !!obj.volume).length) {
          return null;
        }
        return (
          <div key={id} className="w-full flex flex-col">
            <div className="flex justify-between w-full px-4">
              <div>
                <h3 className="font-bold text-lg">{group.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col w-[40px] self-end">
                    <ChartContainer config={chartConfig}>
                      <AreaChart
                        margin={{ left: 0, right: 0, bottom: 6, top: 6 }}
                        data={exerciseData.data}
                        stackOffset="sign"
                      >
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area
                          dataKey="volume"
                          type="natural"
                          fill="#fde047"
                          fillOpacity={0.4}
                          stroke="#fde047"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>

                  {isFinite(changeSinceLastLogged) ? (
                    <div
                      className={cn(
                        "text-[10px] flex items-center font-bold px-[4px] rounded-full",
                        changeSinceLastLogged < 0
                          ? "bg-red-200"
                          : "bg-green-200",
                      )}
                    >
                      {changeSinceLastLogged > 0 ? (
                        <ArrowUp size={10} />
                      ) : (
                        <ArrowDown size={10} />
                      )}
                      {Math.abs(changeSinceLastLogged)}%
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                {group.sets.map((set) => {
                  return (
                    <div className="flex items-center justify-evenly gap-[4px] text-sm font-semibold text-stone-600">
                      <div>{set.reps}</div>
                      <div>x</div>
                      <div>{set.weight}</div>
                      <div>
                        {set.dateLogged ? (
                          <div className="bg-green-500 rounded p-[2px]">
                            <Check size="14" stroke="white" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <Button
        className="text-lg text-white font-bold mx-4"
        onClick={() => router.push("/dashboard")}
      >
        Dashboard
      </Button>
    </div>
  );
};
