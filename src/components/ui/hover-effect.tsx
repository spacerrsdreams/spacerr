"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function HoverEffect({ children, className }: Props) {
  return (
    <motion.div
      className={`group transition-transform duration-75 ${className}`}
      initial={{ y: 0 }}
      whileHover={{ y: -2 }}
    >
      {children}
    </motion.div>
  );
}
