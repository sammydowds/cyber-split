import { HorizontalCarousel } from "@/components/HorizontalCarousel";
import { WorkoutVolumeCard } from "@/components/WorkoutVolumeCard";
import { useSplitWorkoutVolume } from "@/hooks/useSplitWorkoutVolume";

interface SplitWorkoutVolumeProps {
  id: string;
}
export const SplitWorkoutsVolume = ({ id }: SplitWorkoutVolumeProps) => {
  const { data, isPending } = useSplitWorkoutVolume(id);
  if (isPending) {
    return null;
  }

  if (data) {
    return (
      <HorizontalCarousel>
        {Object.keys(data ?? {}).map((key) => {
          return (
            <WorkoutVolumeCard workoutVolumeData={data?.[key as string]} />
          );
        })}
      </HorizontalCarousel>
    );
  }
};
