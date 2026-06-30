"use client";

import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Bookmark } from "lucide-react";
import { RESEARCH } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";

export default function Research() {
  const papers = [
    {
      title: "Attention Is All You Need",
      authors: "Vaswani et al.",
      year: "2017",
      focus: "Transformer architecture, self-attention mechanisms replacing recurrence.",
    },
    {
      title: "LoRA: Low-Rank Adaptation",
      authors: "Hu et al.",
      year: "2021",
      focus: "Parameter-efficient LLM fine-tuning via low-rank matrix decomposition.",
    },
    {
      title: "DPO: Direct Preference Optimization",
      authors: "Rafailov et al.",
      year: "2023",
      focus: "Aligning language models directly with human feedback without reinforcement learning.",
    },
  ];

  return (
    <section id="research" className="py-20 relative">
      <div className="section-container relative z-10">
        <SectionHeader
          label="Research"
          title="Research & Publications"
          subtitle="Investigating AI safety, adversarial robustness, and modern alignment techniques."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Left Column — Featured Publication */}
          <div className="lg:col-span-7">
            <GlowCard hover={false} glowColor="purple" className="flex flex-col h-full">
              <span className="inline-block mb-4 px-3 py-1 text-xxs font-semibold uppercase tracking-wider rounded-full bg-ai-purple/10 text-ai-purple border border-ai-purple/20">
                Featured Publication
              </span>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-text-primary leading-snug mb-4">
                {RESEARCH.publication.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {RESEARCH.publication.summary}
              </p>

              <div className="border-t border-white/5 pt-6 mt-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xxs text-text-muted uppercase tracking-wider">Research Venue</span>
                    <p className="text-xs font-semibold text-text-primary mt-1 font-[family-name:var(--font-heading)]">
                      Security & Machine Learning Journal Spec
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <BookOpen size={14} /> PDF spec
                  </button>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* Right Column — Research Interests & Reading Goals */}
          <div className="lg:col-span-5 space-y-6">
            {/* Research Interests Card */}
            <div className="glass rounded-[24px] p-6 md:p-8 border border-white/5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-muted mb-4 font-[family-name:var(--font-heading)]">
                Active Research Tracks
              </h4>
              <div className="flex flex-wrap gap-2">
                {RESEARCH.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 border border-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10 transition-all duration-300 cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Reading List Card */}
            <div className="glass rounded-[24px] p-6 md:p-8 border border-white/5 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-1">
                <Bookmark size={14} className="text-electric-blue" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-text-primary font-[family-name:var(--font-heading)]">
                  Core Academic Reading List
                </h4>
              </div>

              <div className="space-y-4">
                {papers.map((paper, idx) => (
                  <div key={idx} className="group relative pl-4 border-l border-white/5 hover:border-electric-blue/30 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      <h5 className="font-semibold text-xs text-text-primary font-[family-name:var(--font-heading)]">
                        {paper.title}
                      </h5>
                      <span className="text-[10px] text-text-muted font-[family-name:var(--font-code)]">
                        {paper.year}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-muted mt-1">
                      {paper.authors}
                    </p>
                    <p className="text-[11px] text-text-secondary leading-normal mt-1">
                      {paper.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
