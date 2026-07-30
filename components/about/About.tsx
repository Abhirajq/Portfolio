"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  BarChart3,
  Layers,
  RefreshCw,
  TrendingUp,
  Brain,
  Database,
  Gauge,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ABOUT, EXPERIENCE } from "@/lib/constants";
import type { Stat } from "@/lib/utils";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  // Values like "<1s" or "✓" have nothing to count toward — render them as-is.
  const isCountable = Number.isFinite(numericValue) && numericValue > 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || !isCountable) return;

    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    // requestAnimationFrame instead of setInterval: the old implementation
    // could compute a 0ms step and hammer the main thread.
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericValue));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, isCountable, numericValue]);

  return (
    <span ref={ref} className="font-[family-name:var(--font-code)]">
      {isCountable ? `${count}${suffix}` : value}
    </span>
  );
}

// Feed-forward network geometry for the About illustration: 4 → 5 → 3 nodes,
// fully connected. Computed once at module scope rather than per render.
const NETWORK_LAYERS: { x: number; y: number }[][] = [
  [40, 80, 120, 160].map((y) => ({ x: 38, y })),
  [30, 65, 100, 135, 170].map((y) => ({ x: 100, y })),
  [65, 100, 135].map((y) => ({ x: 162, y })),
];

const NETWORK_EDGES = NETWORK_LAYERS.slice(0, -1).flatMap((layer, li) =>
  layer.flatMap((from) =>
    NETWORK_LAYERS[li + 1].map((to) => ({
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
    })),
  ),
);

const principleIcons: Record<string, LucideIcon> = {
  BookOpen,
  BarChart3,
  Layers,
  RefreshCw,
  TrendingUp,
};

const moduleIcons: Record<string, LucideIcon> = {
  "LLM Evaluation": Brain,
  "Dataset Engineering": Database,
  Benchmarking: Gauge,
  "Engineering Collaboration": Users,
};

interface AboutProps {
  stats: Stat[];
}

export default function About({ stats }: AboutProps) {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  // Roles are stored newest-first; fall back to the first entry so the card
  // still renders if `current` is ever left unset.
  const currentRole = EXPERIENCE.roles.find((role) => role.current) ?? EXPERIENCE.roles[0];
  const priorRoles = EXPERIENCE.roles.filter((role) => role !== currentRole);

  return (
    <div className="space-y-20 md:space-y-24">
      {/* ============================================
         ABOUT SUBSECTION
         ============================================ */}
      <section id="about" className="py-20 md:py-24 relative scroll-mt-20">
        <div className="section-container relative z-10">
          <SectionHeader
            label="About"
            title={ABOUT.heading}
            subtitle="Bridging the gap between cutting-edge ML research and production-ready architectures."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column — Scientific SVG Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex justify-center"
            >
              {/* A dense feed-forward network reads as "ML" at a glance. The
                  previous four-dot orbit left most of the card empty. */}
              <div className="relative w-full max-w-sm aspect-square glass rounded-[24px] overflow-hidden flex items-center justify-center p-6 glow-blue border border-line">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-electric-blue"
                  fill="none"
                  aria-hidden="true"
                >
                  {NETWORK_EDGES.map((edge, i) => (
                    <motion.line
                      key={`e${i}`}
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke="currentColor"
                      strokeWidth="0.6"
                      initial={{ opacity: 0.12 }}
                      animate={{ opacity: [0.08, 0.45, 0.08] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: (i % 9) * 0.35,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {NETWORK_LAYERS.flatMap((layer, li) =>
                    layer.map((node, ni) => (
                      <g key={`n${li}-${ni}`}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="6.5"
                          className={
                            li === 1
                              ? "fill-bg-primary stroke-neural-cyan"
                              : "fill-bg-primary stroke-electric-blue"
                          }
                          strokeWidth="1.2"
                        />
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r="2.6"
                          className={li === 1 ? "fill-neural-cyan" : "fill-electric-blue"}
                          animate={{ opacity: [0.35, 1, 0.35] }}
                          transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            delay: (li * 3 + ni) * 0.22,
                            ease: "easeInOut",
                          }}
                        />
                      </g>
                    )),
                  )}
                </svg>
              </div>
            </motion.div>

            {/* Right Column — Narrative & Statistics */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-4">
                {ABOUT.paragraphs.map((paragraph, i) => (
                  <p key={i} className="text-text-secondary text-sm md:text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Statistics — same source as the hero strip, so the two can no
                  longer disagree with each other. */}
              <dl className="grid grid-cols-2 xl:grid-cols-4 gap-4 pt-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="card-raised p-4 rounded-2xl text-center"
                  >
                    <dd className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] gradient-text">
                      <AnimatedCounter value={stat.value} />
                    </dd>
                    <dt className="text-xxs text-text-muted mt-1 uppercase tracking-wider leading-tight">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* Engineering Philosophy Subsection */}
          <div className="mt-28">
            <h3 className="text-xl md:text-2xl font-bold text-center font-[family-name:var(--font-heading)] mb-12">
              How I Approach AI Engineering
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {ABOUT.principles.map((principle, i) => {
                const Icon = principleIcons[principle.icon] ?? BookOpen;
                return (
                  <GlowCard
                    key={principle.title}
                    glowColor={i % 2 === 0 ? "blue" : "purple"}
                    className="flex flex-col h-full text-left"
                    delay={i * 0.1}
                  >
                    <div className="w-10 h-10 rounded-xl bg-tint border border-line flex items-center justify-center text-electric-blue mb-4">
                      <Icon size={20} />
                    </div>
                    <h4 className="font-semibold text-text-primary text-sm mb-2 font-[family-name:var(--font-heading)]">
                      {principle.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed mt-auto">
                      {principle.description}
                    </p>
                  </GlowCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
         EXPERIENCE SUBSECTION
         ============================================ */}
      <section id="experience" className="py-20 md:py-24 relative bg-band/60 scroll-mt-20">
        <div className="section-container relative z-10">
          <SectionHeader
            label="Experience"
            title="Professional Journey"
            subtitle="Hands-on experience developing dataset infrastructure and automated evaluation pipelines."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Timeline Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="relative border-l border-line pl-6 space-y-8">
                {/* One node per role at the company, so the promotion is legible
                    as progression rather than hidden behind a single title. */}
                {EXPERIENCE.roles.map((role, idx) => (
                  <div key={role.title} className={`relative ${role.current ? "" : "opacity-80"}`}>
                    <div
                      className={
                        role.current
                          ? "absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-electric-blue border-4 border-bg-primary glow-blue"
                          : "absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-electric-blue/40 border-4 border-bg-primary"
                      }
                    />
                    {idx === 0 && (
                      <h4 className="font-bold text-text-primary text-sm font-[family-name:var(--font-heading)]">
                        {EXPERIENCE.company}
                      </h4>
                    )}
                    <p
                      className={`text-xs ${
                        role.current ? "text-text-primary font-semibold" : "text-text-secondary"
                      }`}
                    >
                      {role.title}
                    </p>
                    <span
                      className={`inline-block mt-1.5 px-2.5 py-0.5 text-xxs font-medium rounded-full ${
                        role.current
                          ? "bg-emerald/10 border border-emerald/20 text-emerald"
                          : "bg-tint text-text-muted font-[family-name:var(--font-code)]"
                      }`}
                    >
                      {role.duration}
                    </span>
                  </div>
                ))}

                <div className="relative opacity-70">
                  <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-tint-strong border-4 border-bg-primary" />
                  <h4 className="font-bold text-text-muted text-sm font-[family-name:var(--font-heading)]">
                    AI Projects
                  </h4>
                  <p className="text-xs text-text-muted">Research &amp; Development</p>
                  <span className="text-xxs text-text-muted font-[family-name:var(--font-code)]">
                    2024 - 2025
                  </span>
                </div>

                <div className="relative opacity-70">
                  <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-tint-strong border-4 border-bg-primary" />
                  <h4 className="font-bold text-text-muted text-sm font-[family-name:var(--font-heading)]">
                    Research Publication
                  </h4>
                  <p className="text-xs text-text-muted">Adversarial ML</p>
                  <span className="text-xxs text-text-muted font-[family-name:var(--font-code)]">
                    Apr 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Content Details Column */}
            <div className="lg:col-span-8 space-y-8">
              <GlowCard hover={false} glowColor="purple">
                <div className="border-b border-line pb-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                        {currentRole.title}
                      </h3>
                      <p className="text-sm text-electric-blue">{EXPERIENCE.company}</p>
                    </div>
                    <span className="text-xs text-text-muted font-[family-name:var(--font-code)] self-start sm:self-center">
                      {currentRole.duration}
                    </span>
                  </div>

                  {/* Prior titles at the same employer — reads as a promotion,
                      which a single current title would hide. */}
                  {priorRoles.length > 0 && (
                    <p className="mt-3 text-xxs text-text-muted">
                      <span className="uppercase tracking-wider font-semibold">Previously</span>
                      {priorRoles.map((role) => (
                        <span key={role.title}>
                          {" · "}
                          {role.title}{" "}
                          <span className="font-[family-name:var(--font-code)] text-text-faint">
                            ({role.duration})
                          </span>
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                  {currentRole.summary || EXPERIENCE.details}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 font-[family-name:var(--font-heading)]">
                  Key Technical Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EXPERIENCE.modules.map((module, idx) => {
                    const ModuleIcon = moduleIcons[module.title] ?? Brain;
                    const isActive = activeModule === idx;

                    return (
                      <button
                        key={module.title}
                        type="button"
                        aria-expanded={isActive}
                        onClick={() => setActiveModule(isActive ? null : idx)}
                        className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                          isActive
                            ? "bg-tint border-line glow-blue"
                            : "bg-transparent border-line hover:border-line hover:bg-tint"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              isActive ? "text-neural-cyan bg-neural-cyan/10" : "text-text-muted"
                            }`}
                          >
                            <ModuleIcon size={18} />
                          </div>
                          <h5 className="font-semibold text-text-primary text-sm font-[family-name:var(--font-heading)]">
                            {module.title}
                          </h5>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                          className="overflow-hidden mt-2"
                        >
                          <p className="text-xs text-text-muted leading-relaxed pt-2">
                            {module.description}
                          </p>
                        </motion.div>
                      </button>
                    );
                  })}
                </div>

                {/* Achievements */}
                <div className="mt-8 pt-6 border-t border-line">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 font-[family-name:var(--font-heading)]">
                    Achievements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {EXPERIENCE.achievements.map((achievement) => (
                      <div
                        key={achievement.title}
                        className="p-4 bg-tint border border-line rounded-xl text-center"
                      >
                        <div className="text-xl mb-1" aria-hidden="true">
                          {achievement.emoji}
                        </div>
                        <h5 className="text-xs font-bold text-text-primary mb-1 font-[family-name:var(--font-heading)]">
                          {achievement.title}
                        </h5>
                        {achievement.metric && (
                          <p className="text-sm font-black text-neural-cyan font-[family-name:var(--font-code)] my-1.5">
                            {achievement.metric}
                          </p>
                        )}
                        <p className="text-xxs text-text-muted leading-snug">
                          {achievement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
