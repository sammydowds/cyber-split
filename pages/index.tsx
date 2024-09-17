import { HeroSection } from "../components/landing/Hero";

export default function Landing() {
  return (
    <main>
      <div className="flex flex-col items-center justify-start h-screen w-screen fixed">
        <HeroSection />
      </div>
    </main>
  );
}
