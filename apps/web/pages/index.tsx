import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { TextGenerateEffect } from "@/components/TextGenerationEffect";
import { NavBar } from "@/components/NavBar";

export default function Landing() {
  const router = useRouter();

  return (
    <main className="w-screen mb-[100px]">
      <NavBar />
      <header className="flex flex-col items-center justify-start w-full mt-14">
        <div className="w-[500px] max-md:w-full flex flex-col gap-[20px] px-6">
          <h1 className="text-5xl max-md:text-4xl font-bold tracking-tight text-black w-full align-left max-w-[340px]">
            Weight training made easier.
          </h1>
          <h2 className="text-2xl tracking-tight text-black w-full align-left">
            Your space to organize and prioritize your weightraining.
          </h2>
          <nav className="flex flex-col items-center w-full gap-2">
            <Button
              className="w-full font-bold text-[16px]"
              size="lg"
              onClick={() => router.push("/discover")}
            >
              Discover Splits
            </Button>
          </nav>
        </div>
        <div></div>
      </header>
      <section className="w-full flex flex-col items-center gap-[20px] mt-[80px]">
        <div className="w-[500px] max-md:w-full flex flex-col gap-[8px] px-4">
          <h3 className="text-3xl font-bold tracking-tight text-black w-full align-left max-w-[340px]">
            <TextGenerateEffect text="Live Longer." speed={50} />
          </h3>
          <p className="text-xl tracking-tight w-full align-left">
            Weight training 30-60 minutes per week lowers risk of dying from all
            causes by up to 20%.
          </p>
        </div>
      </section>
      <section className="w-full flex flex-col items-center gap-[20px] mt-[50px]">
        <div className="w-[500px] max-md:w-full flex flex-col gap-[8px] px-4">
          <h3 className="text-3xl font-bold tracking-tight text-black w-full align-left max-w-[340px]">
            <TextGenerateEffect text="Look Better." speed={90} />
          </h3>
          <p className="text-xl tracking-tight w-full align-left">
            Weight training will help you develop and utilize muscles you may
            not use without it. Use it or lose it. By combining weight training
            with an active lifestyle, you can show off a hardened physique while
            looking lean.
          </p>
        </div>
      </section>
      <section className="w-full flex flex-col items-center gap-[20px] mt-[50px]">
        <div className="w-[500px] max-md:w-full flex flex-col gap-[8px] px-4">
          <h3 className="text-3xl font-bold tracking-tight text-black w-full align-left max-w-[340px]">
            <TextGenerateEffect text="Smooth Aging." speed={140} />
          </h3>
          <p className="text-xl tracking-tight w-full align-left">
            Counter decreased mobility at an older age by building muscle mass
            now. We naturally lose muscle mass due to aging starting at 30.
          </p>
        </div>
      </section>
    </main>
  );
}
