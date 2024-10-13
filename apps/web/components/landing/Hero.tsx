"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedGradientBackground } from "../AnimatedGradientBackground";
import { useSession } from "@/hooks/useSession";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface TextGenerateEffectProps {
  text: string;
  speed: number;
}
function TextGenerateEffect({ text, speed }: TextGenerateEffectProps) {
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
}

export default TextGenerateEffect;

export const HeroSection = () => {
  const { data } = useSession();
  return (
    <section className="relative bg-black text-white overflow-hidden font-inter w-full h-full overflow-hidden flex items-center">
      <AnimatedGradientBackground direction="b" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center my-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image src="/logo.png" height={80} width={200} alt="logo" />
          </motion.div>
          <motion.div
            className="text-xl md:text-2xl mb-12 text-[#e7e5e4] font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TextGenerateEffect
              text={"Create weight training programs from scratch."}
              speed={50}
            />
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center md:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              asChild
              className="bg-yellow-300 text-black min-w-[180px] hover:bg-[#fde047] hover:text-black border-[#fde047] font-bold py-6 px-10 rounded-md text-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(253,224,71,0.3)] transform hover:-translate-y-1"
            >
              <Link href="/get-started">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent text-[#fde047] min-w-[180px] hover:bg-[#fde047] hover:text-black border-[#fde047] font-bold py-6 px-10 rounded-md text-lg transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(253,224,71,0.3)] transform hover:-translate-y-1"
            >
              {data ? (
                <Link href="/dashboard" className="flex items-center gap-2">
                  Dashboard <MoveRight />
                </Link>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
