import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Library, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dates = () => {
  const form = useFormContext();

  const { active } = form.watch();

  const handleClickStartNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue("active", true);
  };

  const handleClickStartLater = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.setValue("active", false);
  };

  return (
    <motion.div
      className="p-4 flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-bold tracking-tighter text-xl max-w-[345px]">
          Would you like to start this split immediately?
        </h2>
        <p className="text-stone-600">
          By selecting activate later, the split will appear in your library but
          not as active.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleClickStartNow}
          className={cn(
            "p-[10px] border-black rounded-sm border-[1px] text-sm flex items-center gap-[6px] max-w-[500px]",
            active ? "" : "border-stone-300 text-stone-400",
          )}
        >
          <Zap size={18} fill="#86efac" strokeWidth={0} />
          Activate Now
        </button>
        <button
          onClick={handleClickStartLater}
          className={cn(
            "p-[10px] border-black rounded-sm border-[1px] text-sm flex items-center gap-[6px] max-w-[500px]",
            active ? "border-stone-300 text-stone-400" : "",
          )}
        >
          <Library size={18} />
          Activate Later
        </button>
      </div>
    </motion.div>
  );
};
