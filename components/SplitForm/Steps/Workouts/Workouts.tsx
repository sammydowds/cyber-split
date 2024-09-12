import { BuildWorkouts } from "./BuildWorkouts";
import { Muscles } from "./Muscles";

export const Workouts = () => {
  return (
    <div className="flex flex-col gap-4">
      <Muscles />
      <BuildWorkouts />
    </div>
  );
};
