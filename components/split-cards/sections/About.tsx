import { SplitDeep } from "@/types";
import { SPLIT_TYPE_TO_DESCRIPTION } from "@/lib/programming/constants";
import { Button } from "../../ui/button";
import { Check, Link } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const About = ({ split }: { split: SplitDeep }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/share/${split.id}`,
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className="flex flex-col px-4">
      <div className="flex items-center gap-2 font-bold text-xl justify-between">
        <div>{split.name}</div>
      </div>
      <div className="flex items-center gap-[4px] text-xs text-stone-500">
        <div>
          {
            SPLIT_TYPE_TO_DESCRIPTION[
              split.type as keyof typeof SPLIT_TYPE_TO_DESCRIPTION
            ]
          }
        </div>
        <div>•</div>
        <Button
          className="flex items-center gap-[4px] overflow-hidden text-xs text-stone-500 p-[2px] m-0 h-max"
          variant="ghost"
          onClick={() => copyToClipboard()}
        >
          {isCopied ? (
            <motion.div
              className="flex items-center gap-[4px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Copied
              <span className="p-[2px] rounded-full bg-green-600">
                <Check size={12} color="white" />
              </span>
            </motion.div>
          ) : (
            <>
              Share
              <Link size={12} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
