import { motion } from "framer-motion";
import { BuildWorkouts } from "./BuildWorkouts";
import { Muscles } from "./Muscles";

export const Workouts = () => {
  return (
    <motion.div
      className="flex flex-col gap-2 md:w-[500px] max-md:w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Muscles />
      <BuildWorkouts />
    </motion.div>
  );
};
