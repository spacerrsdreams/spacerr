"use client";

import { motion } from "framer-motion";

const fadeInVarriants = {
  default: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  },
  lg: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5 },
  },
};

type Props = {
  children: React.ReactNode;
  size?: keyof typeof fadeInVarriants;
};

export default function FadeInEffect({ children, size = "default" }: Props) {
  return <motion.div {...fadeInVarriants[size]}>{children}</motion.div>;
}
