"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeInSection({
  children,
  delay = 0,
  className,
}: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
