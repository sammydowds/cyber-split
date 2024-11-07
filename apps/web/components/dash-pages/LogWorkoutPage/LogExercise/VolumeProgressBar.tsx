import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import { StrengthGroupSchemaType } from "@/lib/formSchemas/log";

const calcVolumeFromGroup = (group: StrengthGroupSchemaType) => {
  let vol = 0;
  if (group.sets.length) {
    group.sets.map((set) => {
      const reps = Number(set.reps);
      const weight = Number(set.weight);
      const volume = reps * weight;
      if (set.dateLogged && set.weight && set.reps) {
        vol += volume;
      }
    });
  }
  return vol;
};

export const VolumeProgressBar = ({
  group,
}: {
  group: StrengthGroupSchemaType;
}) => {
  const currentVolume = calcVolumeFromGroup(group);
  const { previousVolume } = group;
  if (!previousVolume) {
    return;
  }

  const maxValue = 1.3 * previousVolume;
  const value = Math.min(Math.round((currentVolume / maxValue) * 100), 99);
  const relativeVal = Math.round((currentVolume / previousVolume - 1) * 100);
  return (
    <>
      <div className="w-full relative mt-6">
        <div className="z-30 absolute -top-4 left-0 w-full flex items-center gap-2 font-bold italic text-xs text-stone-400 tracking-tighter">
          <div>Progressive Volume</div>
          <div>
            {(currentVolume / 1000).toFixed(1)}k /{" "}
            {(previousVolume / 1000).toFixed(1)}k{" "}
            {relativeVal > 0 ? (
              <span
                className={cn(
                  "text-green-600",
                  relativeVal > 20 ? "text-red-600" : null,
                )}
              >
                +{relativeVal}%
              </span>
            ) : null}
          </div>
        </div>
        <div className="absolute w-full -top-2 left-0 bg-gradient-to-r from-sidebar/90 from-70% via-green-400 to-red-600 h-2"></div>
        <ProgressPrimitive.Root
          className={cn(
            "relative h-2 w-full overflow-hidden rounded-none text-stone-200 bg-primary/20",
          )}
        >
          <ProgressPrimitive.Indicator
            className="h-full w-full flex-1 bg-primary transition-all bg-primary"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
    </>
  );
};
