import { HeroSection } from "../components/landing/Hero";
import { AnimatedGradientBackground } from "@/components/AnimatedGradientBackground";

export default function Landing() {
  return (
    <main>
      <div className="flex flex-col items-center justify-start h-screen w-screen fixed bg-stone-200 overflow-y-auto">
        <div className="px-6 py-2 max-md:p-2 w-full">
          <div className="rounded overflow-hidden h-[500px] w-full">
            <HeroSection />
          </div>
        </div>
        <div className="flex flex-row max-md:flex-col gap-2 justify-between w-full px-6 max-md:p-2">
          <div className="tracking-tighter rounded flex flex-col bg-black p-6 gap-6 text-white h-[300px] md:max-w-[400px] relative overflow-hidden">
            <AnimatedGradientBackground direction="t" />
            <div className="flex items-center z-50">
              <div className="text-xl font-bold">Live longer</div>
            </div>
            <div className="text-lg leading-5 grow flex flex-col justify-end z-50">
              Weight training 30-60 minutes per week lowers risk of dying from
              all causes by up to 20%.
            </div>
          </div>
          <div className="grow tracking-tighter rounded flex flex-col bg-black p-6 gap-6 text-white h-[300px] relative overflow-hidden">
            <AnimatedGradientBackground direction="t" />
            <div className="flex items-center z-50">
              <div className="text-xl font-bold">Look good</div>
            </div>
            <div className="text-lg leading-5 grow flex flex-col justify-end z-50">
              Weight training will help you develop and utilize muscles you may
              not use without it. Use it or lose it. By combining weight
              training with an active lifestyle, you can show off a hardened
              physique while looking lean.
            </div>
          </div>
          <div className="tracking-tighter rounded flex flex-col bg-black p-6 gap-6 text-white h-[300px] md:max-w-[400px] relative overflow-hidden">
            <AnimatedGradientBackground direction="t" />
            <div className="flex items-center z-50">
              <div className="text-xl font-bold">Age gracefully</div>
            </div>
            <div className="text-lg leading-5 grow flex flex-col justify-end z-50">
              Counter decreased mobility at an older age by building muscle mass
              now. We naturally lose muscle mass due to aging starting at 30.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
