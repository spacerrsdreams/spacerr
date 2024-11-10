import Image from "next/image";
import Link from "next/link";

import { routes } from "@/lib/routes";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collisition";
import { Button } from "@/components/ui/button";
import FadeInEffect from "@/components/ui/fade-in-effect";
import HoverEffect from "@/components/ui/hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const title = "Deploy your website in seconds, not hours.";

export default function Hero() {
  return (
    <>
      <section className="h-[550px]">
        <BackgroundBeamsWithCollision>
          <div className="relative z-20 mx-auto flex max-w-4xl flex-col gap-4">
            <h1 className="flex flex-wrap">
              <TextGenerateEffect
                words={title}
                className="text-balance text-center text-3xl font-semibold tracking-tight text-gray-700 dark:text-neutral-300 md:text-7xl"
              />
            </h1>
            <div className="relative z-20 mx-auto mt-4 max-w-lg space-y-8 px-4">
              <FadeInEffect>
                <p className="text-center text-base/6 text-gray-600 dark:text-gray-200">
                  With our state of the art, cutting edge, we are so back kinda hosting services,
                  you can deploy your website in seconds.
                </p>
              </FadeInEffect>
              <FadeInEffect>
                <div className="flex items-center justify-center gap-4">
                  <HoverEffect>
                    <Link href={routes.signUp}>
                      <Button className="min-w-16 font-bold shadow-md">Let&apos;s explore</Button>
                    </Link>
                  </HoverEffect>
                  <HoverEffect>
                    <Button variant="outline" className="min-w-36 font-bold shadow-md">
                      Book a call
                    </Button>
                  </HoverEffect>
                </div>
              </FadeInEffect>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </section>
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
    </>
  );
}
