import { AiOutlineSchedule } from "react-icons/ai";

export const Brief = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-left gap-2">
        <AiOutlineSchedule size={32} />
        <h2 className="font-bold tracking-tighter text-lg">
          Workout split programming
        </h2>
      </div>
      <p className="max-md:max-w-[300px] md:max-w-[345px]">
        Workout splits are a well-established way to breakdown workouts weekly.
        They help maintain a simple structure and pattern to your weight
        training journey.
      </p>
    </div>
  );
};
