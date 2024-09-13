import { ChangeEvent, ReactElement } from "react";
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
    <div className="flex items-center gap-[2px] justify-center text-lg font-bold">
      <input
        type="text"
        value={value ?? undefined}
        inputMode="numeric"
        onChange={handleOnChange}
        className={cn(
          "px-4 max-w-[65px] h-[32px] text-center rounded-full bg-stone-100",
          inputClass,
        )}
      />
      <label className="text-xs">{label}</label>
    </div>
  );
};
