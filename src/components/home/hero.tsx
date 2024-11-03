import React from "react";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collisition";
import { Button } from "@/components/ui/button";
import FadeInEffect from "@/components/ui/fade-in-effect";
import HoverEffect from "@/components/ui/hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const title = "Deploy your website in seconds, not hours.";

export function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision>
      <div className="relative z-20 mx-auto flex max-w-4xl flex-col gap-4">
        <h1 className="flex flex-wrap">
          <TextGenerateEffect
            words={title}
            className="text-balance text-center text-3xl font-semibold tracking-tight text-gray-700 md:text-7xl"
          />
        </h1>
        <div className="relative z-20 mx-auto mt-4 max-w-lg space-y-8 px-4">
          <FadeInEffect>
            <p className="text-center text-base/6 text-gray-600">
              With our state of the art, cutting edge, we are so back kinda hosting services, you
              can deploy your website in seconds.
            </p>
          </FadeInEffect>
          <FadeInEffect>
            <div className="flex items-center justify-center gap-4">
              <HoverEffect>
                <Button className="min-w-16 font-bold shadow-md">Create account</Button>
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
  );
}
