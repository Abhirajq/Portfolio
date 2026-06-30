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
      className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <span className="inline-block mb-4 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-electric-blue bg-electric-blue/10 border border-electric-blue/20 rounded-full font-[family-name:var(--font-code)]">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
