"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "cyan" | "emerald";
  hover?: boolean;
  delay?: number;
}

const glowColors = {
  blue: "hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]",
  purple: "hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]",
  cyan: "hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",
  emerald: "hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]",
};

export default function GlowCard({
  children,
  className = "",
  glowColor = "blue",
  hover = true,
  delay = 0,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`
        glass rounded-[24px] p-6 md:p-8
        border border-white/[0.06]
        transition-all duration-300
        ${hover ? `hover:border-white/[0.12] ${glowColors[glowColor]}` : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
