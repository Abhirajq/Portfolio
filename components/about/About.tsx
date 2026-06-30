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
} from "lucide-react";
import { ABOUT, EXPERIENCE } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";

// ============================================
// ANIMATED COUNTER
// ============================================
function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parse target number (e.g. "1000+" -> 1000, "2+" -> 2)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = numericValue;
    if (start === end) {
      setCount(end);
      return;
    }

    const duration = 2000; // 2 seconds
    const range = end - start;
    let current = start;
    const increment = end > 100 ? Math.ceil(range / 60) : 1;
    const stepTime = Math.abs(Math.floor(duration / (range / increment)));

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <span ref={ref} className="font-[family-name:var(--font-code)]">
      {count}
      {suffix}
    </span>
  );
}

// ============================================
// ABOUT & EXPERIENCE SECTION
// ============================================
export default function About() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  const iconMap: Record<string, any> = {
    BookOpen: BookOpen,
    BarChart3: BarChart3,
    Layers: Layers,
    RefreshCw: RefreshCw,
    TrendingUp: TrendingUp,
  };

  const moduleIconMap: Record<string, any> = {
    "LLM Evaluation": Brain,
    "Dataset Engineering": Database,
    "Benchmarking": Gauge,
    "Engineering Collaboration": Users,
  };

  return (
    <div className="space-y-32">
      {/* ============================================
         ABOUT SUBSECTION
         ============================================ */}
      <section id="about" className="py-20 relative">
        <div className="section-container relative z-10">
          <SectionHeader
            label="About"
            title={ABOUT.heading}
            subtitle="Bridging the gap between cutting-edge ML research and production-ready architectures."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
            {/* Left Column — Scientific SVG Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-sm aspect-square glass rounded-[24px] overflow-hidden flex items-center justify-center p-8 glow-blue border border-white/10">
                {/* Simulated Neural Layer Visual */}
                <svg viewBox="0 0 200 200" className="w-full h-full text-electric-blue opacity-80" fill="none">
                  {/* Outer connections */}
                  <motion.path
                    d="M 30,100 C 50,50 150,50 170,100 C 150,150 50,150 30,100 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "center" }}
                  />
                  <motion.path
                    d="M 50,100 C 70,70 130,70 150,100 C 130,130 70,130 50,100 Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "center" }}
                  />
                  {/* Central Node */}
                  <circle cx="100" cy="100" r="15" className="fill-bg-primary stroke-neural-cyan" strokeWidth="2" />
                  <circle cx="100" cy="100" r="6" className="fill-neural-cyan" />

                  {/* Satellite Nodes */}
                  {[
                    { cx: 50, cy: 60, r: 8 },
                    { cx: 150, cy: 60, r: 8 },
                    { cx: 50, cy: 140, r: 8 },
                    { cx: 150, cy: 140, r: 8 },
                  ].map((node, i) => (
                    <g key={i}>
                      <motion.line
                        x1="100"
                        y1="100"
                        x2={node.cx}
                        y2={node.cy}
                        stroke="currentColor"
                        strokeWidth="1"
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      />
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        className="fill-bg-primary stroke-electric-blue"
                        strokeWidth="1.5"
                      />
                      <circle cx={node.cx} cy={node.cy} r="3" className="fill-electric-blue" />
                    </g>
                  ))}

                  {/* Data flow particles */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.circle
                      key={i}
                      r="3"
                      fill="#06B6D4"
                      animate={{
                        offsetDistance: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.75,
                        ease: "easeInOut",
                      }}
                      style={{
                        motionPath: "path('M 100,100 L 50,60 L 150,60 L 150,140 L 50,140 Z')",
                      }}
                    />
                  ))}
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
                {ABOUT.paragraphs.map((p, i) => (
                  <p key={i} className="text-text-secondary text-sm md:text-base leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 pt-6">
                {ABOUT.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 glass rounded-2xl text-center border border-white/5"
                  >
                    <div className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] gradient-text">
                      <AnimatedCounter value={stat.value} />
                    </div>
                    <div className="text-xxs sm:text-xs text-text-muted mt-1 uppercase tracking-wider leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Engineering Philosophy Subsection */}
          <div className="mt-28">
            <h3 className="text-xl md:text-2xl font-bold text-center font-[family-name:var(--font-heading)] mb-12">
              How I Approach AI Engineering
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {ABOUT.principles.map((p, i) => {
                const IconComponent = iconMap[p.icon] || BookOpen;
                return (
                  <GlowCard
                    key={i}
                    glowColor={i % 2 === 0 ? "blue" : "purple"}
                    className="flex flex-col h-full text-left"
                    delay={i * 0.1}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-electric-blue mb-4">
                      <IconComponent size={20} />
                    </div>
                    <h4 className="font-semibold text-text-primary text-sm mb-2 font-[family-name:var(--font-heading)]">
                      {p.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed mt-auto">
                      {p.description}
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
      <section id="experience" className="py-20 relative bg-bg-secondary/10">
        <div className="section-container relative z-10">
          <SectionHeader
            label="Experience"
            title="Professional Journey"
            subtitle="Hands-on experience developing dataset infrastructure and automated evaluation pipelines."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
            {/* Timeline Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="relative border-l border-white/10 pl-6 space-y-12">
                {/* Current node */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-electric-blue border-4 border-bg-primary glow-blue" />
                  <h4 className="font-bold text-text-primary text-sm font-[family-name:var(--font-heading)]">
                    Ethara AI
                  </h4>
                  <p className="text-xs text-text-secondary">{EXPERIENCE.role}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 text-xxs font-medium rounded-full bg-emerald/10 border border-emerald/20 text-emerald">
                    {EXPERIENCE.duration}
                  </span>
                </div>

                {/* Previous project/study node */}
                <div className="relative opacity-60">
                  <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-white/20 border-4 border-bg-primary" />
                  <h4 className="font-bold text-text-muted text-sm font-[family-name:var(--font-heading)]">
                    AI Projects
                  </h4>
                  <p className="text-xs text-text-muted">Research & Development</p>
                  <span className="text-xxs text-text-muted font-[family-name:var(--font-code)]">
                    2024 - 2025
                  </span>
                </div>

                {/* Publication node */}
                <div className="relative opacity-60">
                  <div className="absolute -left-[29px] top-1.5 w-3.5 h-3.5 rounded-full bg-white/20 border-4 border-bg-primary" />
                  <h4 className="font-bold text-text-muted text-sm font-[family-name:var(--font-heading)]">
                    Research Publication
                  </h4>
                  <p className="text-xs text-text-muted">Adversarial ML</p>
                  <span className="text-xxs text-text-muted font-[family-name:var(--font-code)]">
                    2024
                  </span>
                </div>
              </div>
            </div>

            {/* Content Details Column */}
            <div className="lg:col-span-8 space-y-8">
              <GlowCard hover={false} glowColor="purple">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                      {EXPERIENCE.role}
                    </h3>
                    <p className="text-sm text-electric-blue">{EXPERIENCE.company}</p>
                  </div>
                  <span className="text-xs text-text-muted font-[family-name:var(--font-code)] self-start sm:self-center">
                    {EXPERIENCE.duration}
                  </span>
                </div>

                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
                  {EXPERIENCE.details}
                </p>

                {/* Expandable/Interactive Job Modules */}
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 font-[family-name:var(--font-heading)]">
                  Key Technical Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {EXPERIENCE.modules.map((m, idx) => {
                    const ModuleIcon = moduleIconMap[m.title] || Brain;
                    const isActive = activeModule === idx;

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-white/5 border-white/10 glow-blue"
                            : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/2"
                        }`}
                        onClick={() => setActiveModule(isActive ? null : idx)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isActive ? "text-neural-cyan bg-neural-cyan/10" : "text-text-muted"}`}>
                            <ModuleIcon size={18} />
                          </div>
                          <h5 className="font-semibold text-text-primary text-sm font-[family-name:var(--font-heading)]">
                            {m.title}
                          </h5>
                        </div>
                        <motion.div
                          initial={false}
                          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                          className="overflow-hidden mt-2"
                        >
                          <p className="text-xxs sm:text-xs text-text-muted leading-relaxed pt-2">
                            {m.description}
                          </p>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                {/* Achievements Badges */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-4 font-[family-name:var(--font-heading)]">
                    Internship Achievements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {EXPERIENCE.achievements.map((ach, idx) => (
                      <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center">
                        <div className="text-xl mb-1">{ach.emoji}</div>
                        <h5 className="text-xs font-bold text-text-primary mb-1 font-[family-name:var(--font-heading)]">
                          {ach.title}
                        </h5>
                        <p className="text-[10px] text-text-muted leading-snug">
                          {ach.description}
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
