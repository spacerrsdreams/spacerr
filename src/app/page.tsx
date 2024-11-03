import Image from "next/image";

import Header from "@/components/header/header";
import { BackgroundBeamsWithCollisionDemo } from "@/components/home/hero";
import FadeInEffect from "@/components/ui/fade-in-effect";
import GradientGrid from "@/components/ui/gradient-grid";

export default function page() {
  return (
    <>
      <Header />
      <div className="h-full">
        <GradientGrid itemCount={4} showGradient={true} />
        <div className="h-[550px]">
          <BackgroundBeamsWithCollisionDemo />
        </div>
        <FadeInEffect size="lg">
          <div className="relative mx-auto max-w-7xl rounded-[32px] border border-neutral-200/50 bg-neutral-100 p-2 backdrop-blur-lg md:p-4">
            <div className="rounded-[24px] border border-neutral-200 bg-white p-2">
              <Image
                src="/static/hero-image.png"
                alt="landing page image"
                loading="lazy"
                width={1920}
                height={1080}
                decoding="async"
                className="rounded-[20px"
              />
            </div>
          </div>
        </FadeInEffect>
      </div>
    </>
  );
}
