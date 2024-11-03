"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const AnimatedSVG1: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const pathRef = useRef<SVGPathElement | null>(null);
  const pathLength = 300; // Set this to the actual length of your SVG path

  useEffect(() => {
    const updatePosition = (progress: number) => {
      if (pathRef.current) {
        const point = pathRef.current.getPointAtLength(progress * pathLength);
        setPosition({ x: point.x, y: point.y });
      }
    };

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed / 8000) % 1; // 2 seconds duration

      updatePosition(progress);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [pathLength]);

  return (
    <div className="absolute -top-2 left-1/2 -translate-x-[90%] text-neutral-200 dark:text-neutral-800">
      <svg
        width="128"
        height="69"
        viewBox="0 0 128 69"
        fill="none"
        className="absolute -top-2 left-1/2 -translate-x-[90%] text-neutral-200"
      >
        <path
          ref={pathRef}
          id="bluePath"
          d="M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75"
          stroke="url(#gradient-2)"
          strokeWidth="1"
        />

        <motion.circle
          cx={position.x}
          cy={position.y}
          r="3"
          fill="#6DD4F5"
          transition={{ type: "spring", stiffness: 300 }}
        />
      </svg>
    </div>
  );
};

export const AnimatedSVG2: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const pathRef = useRef<SVGPathElement | null>(null);
  const pathLength = 300; // Adjust this to match your SVG path length

  useEffect(() => {
    const updatePosition = (progress: number) => {
      if (pathRef.current) {
        const point = pathRef.current.getPointAtLength(progress * pathLength);
        setPosition({ x: point.x, y: point.y });
      }
    };

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed / 8000) % 1; // 8 seconds duration

      updatePosition(progress);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [pathLength]);

  return (
    <div className="absolute -bottom-2 left-1/2 -translate-x-0 text-neutral-200 dark:text-neutral-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="62"
        height="105"
        viewBox="0 0 62 105"
        fill="none"
        className="absolute -bottom-2 left-1/2 -translate-x-0 text-neutral-200 dark:text-neutral-800"
      >
        <path
          ref={pathRef}
          d="M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105"
          stroke="url(#gradient-1)"
          strokeWidth="1"
        />

        <motion.circle
          cx={position.x}
          cy={position.y}
          r="3"
          fill="#6DD4F5"
          transition={{ type: "spring", stiffness: 300 }}
        />
      </svg>
    </div>
  );
};
