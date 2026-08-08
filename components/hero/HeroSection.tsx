"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Brain, Search, AudioLines, FileText, type LucideIcon } from "lucide-react";
import { HERO, PROJECTS } from "@/lib/constants";
import type { Stat } from "@/lib/utils";

const featureIcons: Record<string, LucideIcon> = {
  Brain,
  Search,
  AudioLines,
  FileText,
};

interface HeroSectionProps {
  photoSrc: string;
  stats: Stat[];
}

export default function HeroSection({ photoSrc, stats }: HeroSectionProps) {
  const audioProject = PROJECTS.find((project) => project.id === "audio-deepfake");
  const headlineMetric = audioProject?.metrics[0];

  return (
    <section
      id="home"
      className="relative min-h-screen text-text-primary flex flex-col justify-between overflow-hidden pt-16 md:pt-20"
    >
      {/* Engineering grid, masked so it fades before it becomes wallpaper */}
      <div className="grid-backdrop absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Main Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center grow py-12">
        {/* Left Column Content */}
        <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
          {/* Pill Badge */}
          <div className="self-start">
            <span className="px-3.5 py-1.5 text-xxs font-bold tracking-widest uppercase rounded-full border border-line bg-tint text-text-muted font-[family-name:var(--font-code)]">
              {HERO.role}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-text-primary">
            {HERO.headline.lead} <br />
            <span className="inline-block bg-gradient-to-r from-electric-blue via-ai-purple to-neural-cyan bg-clip-text text-transparent animate-gradient-shift">
              {HERO.headline.accent}
            </span>{" "}
            <br />
            {HERO.headline.trail}
          </h1>

          {/* Monospace Subtext */}
          <p className="text-xs sm:text-sm text-text-muted font-[family-name:var(--font-code)] leading-relaxed">
            {HERO.subtext}
          </p>

          {/* Tech Stack Row */}
          <ul className="flex flex-wrap gap-2 pt-2">
            {HERO.techStack.map((tech) => (
              <li
                key={tech}
                className="px-3.5 py-1.5 text-xxs font-semibold rounded-full border border-line bg-tint text-text-muted hover:border-electric-blue/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:text-text-primary transition-all duration-300"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 max-w-xl">
            {HERO.features.map((feature) => {
              const Icon = featureIcons[feature.icon] ?? Brain;
              return (
                <div
                  key={feature.label}
                  className="group p-4 rounded-2xl border border-line bg-surface backdrop-blur-md flex items-center gap-3.5 hover:border-electric-blue/30 hover:bg-tint-strong transition-all duration-300"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-electric-blue/10 border border-electric-blue/15 flex items-center justify-center text-electric-blue group-hover:bg-electric-blue/15 transition-colors">
                    <Icon size={17} />
                  </div>
                  <span className="text-xs font-bold text-text-primary">{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column Profile */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[480px]">
          {/* Radial Glow */}
          <div className="absolute w-[340px] h-[340px] rounded-full bg-ai-purple/30 blur-[80px] pointer-events-none z-0" />
          <div className="absolute w-[260px] h-[260px] translate-x-12 translate-y-16 rounded-full bg-electric-blue/20 blur-[70px] pointer-events-none z-0" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] z-10 flex items-center justify-center"
          >
            {/* Gradient ring, photo, vignette.
                PortraitCloud (the point-cloud renderer) still lives in this
                folder — swap it back in here if you ever want it. */}
            <div className="relative w-[290px] h-[290px] rounded-full p-[1.5px] bg-gradient-to-br from-electric-blue/50 via-ai-purple/30 to-transparent">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-bg-secondary">
                <Image
                  src={photoSrc}
                  alt={`Portrait of ${HERO.name}`}
                  fill
                  sizes="290px"
                  className="object-cover scale-105 portrait-grade"
                  priority
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 38%, transparent 40%, color-mix(in srgb, var(--t-bg) 55%, transparent) 78%, color-mix(in srgb, var(--t-bg) 95%, transparent) 100%)",
                  }}
                />
              </div>
            </div>

            {/* Floating metric card — sourced from the project data rather than
                hardcoded, and without the decorative star rating that implied
                a score nothing actually produced.
                It sits over the photo, so it needs an opaque surface: the
                translucent `card-raised` tier is only legible over the page
                background. Offset far enough out to clear the face. */}
            {headlineMetric && (
              <div className="absolute -top-6 -right-10 z-20 animate-float-subtle">
                <a
                  href="#projects"
                  className="block p-4 rounded-2xl w-[160px] card-raised backdrop-blur-md hover:border-neural-cyan/40 transition-colors"
                >
                  {/* cyan = measured data, per the palette roles */}
                  <div className="text-2xl font-black text-neural-cyan leading-none">
                    {headlineMetric.value}
                  </div>
                  <div className="text-xxs font-bold text-text-muted mt-1 leading-snug">
                    CNN-LSTM {headlineMetric.label.toLowerCase()}
                  </div>
                  <div className="text-xxs text-electric-blue mt-2 font-semibold">
                    View project →
                  </div>
                </a>
              </div>
            )}

            {/* Floating Code Terminal */}
            <div
              className="absolute -bottom-6 -left-8 z-20 animate-float-subtle"
              style={{ animationDelay: "1.5s" }}
              aria-hidden="true"
            >
              <div className="p-4 rounded-xl border border-line-strong bg-code-bg shadow-[var(--t-shadow)] font-[family-name:var(--font-code)] w-[180px]">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="text-xxs leading-relaxed text-code-text">
                  <span className="text-electric-blue">train_model</span>(data) <br />
                  <span className="text-electric-blue">evaluate</span>(pipeline) <br />
                  <span className="text-electric-blue">deploy</span>(api)
                </div>
              </div>
            </div>

            {/* Floating </> Icon */}
            <div
              className="absolute top-[40%] -right-6 z-20 animate-float-subtle"
              style={{ animationDelay: "0.75s" }}
              aria-hidden="true"
            >
              <div className="w-10 h-10 rounded-xl bg-electric-blue text-white flex items-center justify-center shadow-lg shadow-electric-blue/30 font-bold text-sm">
                &lt;/&gt;
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom stat strip — was a second <footer> element duplicating the site
          footer (and the profile photo directly above it). */}
      <div className="relative z-10 w-full border-t border-line bg-bg-primary/40 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center sm:justify-between gap-x-8 gap-y-4">
          {/* emerald = availability/status, per the palette roles */}
          <p className="flex items-center gap-2.5 text-xs text-text-muted font-[family-name:var(--font-code)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
            Available for AI/ML engineering roles
          </p>

          <dl className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <dd className="text-sm font-black text-neural-cyan font-[family-name:var(--font-code)]">
                  {stat.value}
                </dd>
                <dt className="text-xxs text-text-muted tracking-wider uppercase font-semibold">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
