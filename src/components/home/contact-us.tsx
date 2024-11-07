import React from "react";

import { Button } from "@/components/ui/button";
import HoverEffect from "@/components/ui/hover-effect";

export default function ContactUs() {
  return (
    <section
      id="contact"
      className="relative isolate w-full bg-white px-4 py-0 dark:bg-neutral-950 sm:py-20 lg:px-4"
    >
      <h2 className="pt-4 text-center text-lg font-bold text-neutral-800 dark:text-neutral-100 md:text-4xl">
        Have a question?
      </h2>
      <p className="mx-auto mt-4 max-w-md text-center text-base text-neutral-600 dark:text-neutral-300">
        We are here to help. Send us a message and we will get back to you as soon as possible.
      </p>
      <div className="mt-10 flex items-center justify-center">
        <HoverEffect>
          <Button size="lg" className="font-bold">
            Book a call
          </Button>
        </HoverEffect>
      </div>
    </section>
  );
}
