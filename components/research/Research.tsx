"use client";

import { Bookmark, ExternalLink } from "lucide-react";
import { RESEARCH } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";

export default function Research() {
  const { publication } = RESEARCH;
  const byline = [publication.authors, publication.venue, publication.year]
    .filter(Boolean)
    .join(" · ");

  return (
    <section id="research" className="py-20 md:py-24 relative scroll-mt-20">
      <div className="section-container relative z-10">
        <SectionHeader
          label="Research"
          title="Research & Publications"
          subtitle="Investigating AI safety, adversarial robustness, and modern alignment techniques."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column — Featured Publication */}
          <div className="lg:col-span-7">
            <GlowCard hover={false} glowColor="purple" className="flex flex-col h-full">
              <span className="inline-block self-start mb-4 px-3 py-1 text-xxs font-semibold uppercase tracking-wider rounded-full bg-ai-purple/10 text-ai-purple border border-ai-purple/20">
                Featured Publication
              </span>
              <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)] text-text-primary leading-snug mb-3">
                {publication.title}
              </h3>

              {/* Byline renders only once real citation details are supplied,
                  so the section never shows placeholder venue text. */}
              {byline && (
                <p className="text-xs text-text-muted font-[family-name:var(--font-code)] mb-4">
                  {byline}
                </p>
              )}

              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {publication.summary}
              </p>

              {/* The previous "PDF spec" button had no handler — a link that
                  goes nowhere reads worse than no link, so it only appears
                  once a URL exists. */}
              {publication.url && (
                <div className="border-t border-line pt-6 mt-auto">
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-full bg-tint border border-line text-text-primary hover:bg-tint-strong hover:border-line-strong transition-all duration-300"
                  >
                    <ExternalLink size={14} /> Read the paper
                  </a>
                </div>
              )}
            </GlowCard>
          </div>

          {/* Right Column — Research Interests & Reading List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass rounded-[24px] p-6 md:p-8 border border-line">
              <h4 className="font-bold text-xs uppercase tracking-wider text-text-muted mb-4 font-[family-name:var(--font-heading)]">
                Active Research Tracks
              </h4>
              <ul className="flex flex-wrap gap-2">
                {RESEARCH.interests.map((interest) => (
                  <li
                    key={interest}
                    className="px-3 py-1.5 text-xs font-semibold rounded-full bg-tint border border-line text-text-secondary hover:text-text-primary hover:bg-tint-strong transition-all duration-300"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-[24px] p-6 md:p-8 border border-line">
              <div className="flex items-center gap-2 border-b border-line pb-3 mb-5">
                <Bookmark size={14} className="text-electric-blue" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-text-primary font-[family-name:var(--font-heading)]">
                  Papers Shaping My Current Work
                </h4>
              </div>

              <ul className="space-y-5">
                {RESEARCH.reading.map((paper) => (
                  <li
                    key={paper.title}
                    className="pl-4 border-l border-line hover:border-electric-blue/40 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <h5 className="font-semibold text-xs text-text-primary font-[family-name:var(--font-heading)] leading-snug">
                        {paper.title}
                      </h5>
                      <span className="shrink-0 text-xxs text-text-muted font-[family-name:var(--font-code)]">
                        {paper.year}
                      </span>
                    </div>
                    <p className="text-xxs text-text-muted mt-1">{paper.authors}</p>
                    <p className="text-xs text-text-secondary leading-relaxed mt-1.5">
                      {paper.takeaway}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
