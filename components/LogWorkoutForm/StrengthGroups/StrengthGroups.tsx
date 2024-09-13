import { useFieldArray, useFormContext } from "react-hook-form";
import { LogWorkoutSchema } from "../types";
import { StrengthGroup } from "./StrengthGroup";

export const StrengthGroups = () => {
  const { control } = useFormContext<LogWorkoutSchema>();
  const { fields: groupFields } = useFieldArray({
    control,
    name: "strengthGroups",
  });
  return (
    <div className="flex flex-col justify-center">
      {groupFields.map((g, idx) => {
        return <StrengthGroup groupIdx={idx} key={g.id} />;
      })}
    </div>
  );
};
