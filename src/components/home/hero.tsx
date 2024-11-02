import React from "react";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collisition";

export function BackgroundBeamsWithCollisionDemo() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className="relative z-20">
        {/* <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]"> */}
        {/* <div className="absolute left-0 top-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Exploding beams.</span>
          </div> */}
        {/* <div className="relative bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent">
            <span className="">Exploding beams.</span>
          </div> */}
        {/* </div> */}
      </h2>
    </BackgroundBeamsWithCollision>
  );
}
