import { motion } from "framer-motion";
import { Route } from "lucide-react";

export const Brief = () => {
  return (
    <motion.div
      className="flex flex-col gap-2 p-4 md:w-[500px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-left gap-2">
        <Route size={22} />
        <h2 className="font-bold tracking-tighter text-xl">Programming</h2>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <p>
          Workout splits are vital for effective training, allowing you to focus
          on specific muscle groups while ensuring adequate recovery. This
          structured approach enhances muscle growth and reduces the risk of
          overtraining, leading to better results.
        </p>
        <p>
          A successful workout program combines splits with a clear schedule
          tailored to your preferences. This consistency fosters discipline and
          accountability, making it easier to stay motivated and achieve your
          fitness goals.
        </p>
      </div>
    </motion.div>
  );
};
