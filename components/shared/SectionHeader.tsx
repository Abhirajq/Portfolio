"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // Was mb-16/mb-20, which stacked with each section's py-20 and the grid's
      // mt-12 to leave ~200px of dead air under every heading.
      className={`mb-10 md:mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <span className="inline-block mb-4 px-3.5 py-1 text-xxs font-semibold tracking-[0.2em] uppercase text-electric-blue bg-electric-blue/10 border border-electric-blue/20 rounded-full font-[family-name:var(--font-code)]">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold font-[family-name:var(--font-heading)] leading-[1.15] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg text-text-secondary max-w-2xl text-pretty ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
