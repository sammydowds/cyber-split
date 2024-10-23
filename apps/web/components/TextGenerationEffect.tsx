import { useEffect, useState } from "react";

interface TextGenerateEffectProps {
  text: string;
  speed: number;
}
export const TextGenerateEffect = ({
  text,
  speed,
}: TextGenerateEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="text-[20px] tracking-tighter font-inter">{displayedText}</p>
  );
};
