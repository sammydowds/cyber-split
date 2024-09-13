import { FiMinus, FiPlus } from "react-icons/fi";
import { Button } from "../ui/button";
import { useMemo } from "react";

interface ButtonControlsProps {
  value: number;
  incrementBy: number;
  max: number;
  min: number;
  onChange: (newValue: number) => void;
  label?: string;
  valueTextTransformer?: (value: number) => string;
}
export const ButtonControls = ({
  value,
  label,
  onChange,
  incrementBy,
  max,
  min,
  valueTextTransformer,
}: ButtonControlsProps) => {
  const handleIncremement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value < max) {
      onChange(value + incrementBy);
    }
  };

  const handleDecremement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value - incrementBy >= min) {
      onChange(value - incrementBy);
    }
  };

  const valueText = useMemo(() => {
    if (valueTextTransformer) {
      return valueTextTransformer(value);
    }
    return value;
  }, [value, valueTextTransformer]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1 justify-between w-[150px]">
        <Button
          size="icon"
          className="rounded h-8 w-8"
          onClick={handleDecremement}
        >
          <FiMinus size={24} />
        </Button>
        <span className="text-2xl">
          {valueText} <span className="text-xs">{label}</span>
        </span>
        <Button
          size="icon"
          className="rounded h-8 w-8"
          onClick={handleIncremement}
        >
          <FiPlus size={24} />
        </Button>
      </div>
    </div>
  );
};
