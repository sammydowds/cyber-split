import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface NubmerInputProps {
  value?: number | null;
  onChange: (newValue?: number) => void;
  label?: string;
  inputClass?: string;
}
export const NumberInput = ({
  value,
  onChange,
  label,
  inputClass,
}: NubmerInputProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.target.value;
    if (val) {
      onChange(parseInt(val));
    } else {
      onChange();
    }
  };
  return (
    <div className="flex items-center gap-[2px] justify-center text-lg font-bold h-full">
      <input
        type="text"
        value={value ?? undefined}
        inputMode="numeric"
        onChange={handleOnChange}
        className={cn(
          "h-full w-full text-center rounded-sm bg-stone-50/80 focus:outline-black p-0 text-[20px]",
          inputClass,
        )}
      />
      <label className="text-xs">{label}</label>
    </div>
  );
};
