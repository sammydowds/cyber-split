import { Exercise } from "@prisma/client";
import { KeyRound } from "lucide-react";

interface TipsAndInstructionsProps {
  exercise: Partial<Exercise>;
}
export const TipsAndInstructions = ({ exercise }: TipsAndInstructionsProps) => {
  const { tips, instructions } = exercise;

  return (
    <div className="flex flex-col gap-4">
      {instructions?.length ? (
        <div className="flex flex-col gap-2">
          <div className="font-bold">Instructions</div>
          <div className="flex flex-col gap-4 pl-2">
            {instructions?.map((instruction, index) => {
              return (
                <div className="flex flex-col gap-[2px]">
                  <div key={index} className="font-bold text-sm">
                    Step {index + 1}
                  </div>
                  <div key={index} className="text-sm">
                    {instruction}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {tips?.length ? (
        <div className="flex flex-col gap-2">
          <div className="font-bold">Tips</div>
          <div className="flex flex-col gap-4 pl-2">
            {tips?.map((tip, index) => {
              return (
                <div className="flex gap-[6px]">
                  <div key={index} className="font-bold text-sm">
                    <KeyRound fill="yellow" />
                  </div>
                  <div key={index} className="text-sm">
                    {tip}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
