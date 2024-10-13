import { useState } from "react";

export const useNavigation = () => {
  const [step, setStep] = useState(0);

  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setStep(step + 1);
  };
  const previous = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return {
    step,
    next,
    previous,
    setStep,
  };
};
