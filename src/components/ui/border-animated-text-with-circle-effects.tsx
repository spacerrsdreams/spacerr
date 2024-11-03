"use client";

import { motion, useInView, type Variants } from "framer-motion";
import React, { useRef } from "react";

type Props = {
  text: string;
};

export default function BorderAnimatedTextWithCirclesEffect({ text }: Props) {
  const divVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div ref={ref} className="relative inline-block max-w-fit p-4 text-center">
      <motion.div
        className="absolute inset-0 border border-neutral-200"
        initial={{ height: "0%", width: "0%" }}
        animate={isInView ? { height: "100%", width: "100%" } : {}}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -left-1 -top-1 h-2 w-2 bg-neutral-200 dark:bg-neutral-800"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divVariants}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute -right-1 -top-1 h-2 w-2 bg-neutral-200 dark:bg-neutral-800"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divVariants}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 h-2 w-2 bg-neutral-200 dark:bg-neutral-800"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divVariants}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="absolute -bottom-1 -right-1 h-2 w-2 bg-neutral-200 dark:bg-neutral-800"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={divVariants}
          transition={{ duration: 1 }}
        />
      </motion.div>
      <h2 className="text-bold text-neutral-8000 mx-auto w-fit text-center text-xl font-bold tracking-tight text-neutral-800 md:text-4xl">
        {text}
      </h2>
    </div>
  );
}
