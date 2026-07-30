"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Database,
  Cpu,
  Brain,
  ChevronDown,
  Volume2,
  Sliders,
  TrendingUp,
  ExternalLink,
  BookOpen,
  Info,
} from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import { GithubIcon } from "@/components/shared/BrandIcons";

// Recharts needs a measured DOM container, so it can't render on the server.
// Loading it client-side only also keeps ~100kB out of the initial bundle.
const TrainingChart = dynamic(() => import("./TrainingChart"), {
  ssr: false,
  loading: () => <div className="h-56 w-full animate-pulse rounded-xl bg-tint" />,
});

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section id="projects" className="py-20 md:py-24 relative scroll-mt-20">
      <div className="section-container relative z-10">
        <SectionHeader
          label="Projects"
          title="Featured AI Projects"
          subtitle="Building intelligent systems through research, engineering, and scalable machine learning."
        />

        {/* Project Switcher Tab Bar */}
        <div className="flex justify-center mb-12">
          <div className="glass p-1.5 rounded-full flex flex-wrap justify-center gap-2" role="tablist">
            {PROJECTS.map((project) => (
              <button
                key={project.id}
                role="tab"
                aria-selected={activeProject === project.id}
                onClick={() => {
                  setActiveProject(project.id);
                  setExpandedSection(null);
                }}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeProject === project.id
                    ? "bg-electric-blue text-white shadow-lg shadow-electric-blue/20"
                    : "text-text-secondary hover:text-text-primary hover:bg-tint"
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Display */}
        <AnimatePresence mode="wait">
          {PROJECTS.map((project) => {
            if (project.id !== activeProject) return null;

            const isRAG = project.id === "rag";
            const hasLinks =
              project.links.github || project.links.demo || project.links.writeup;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left Column — Overview, Metrics, Tech Stack */}
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <span
                      className={`inline-block mb-3 px-3 py-1 text-xxs font-semibold uppercase tracking-wider rounded-full ${
                        isRAG
                          ? "bg-electric-blue/10 text-electric-blue border border-electric-blue/20"
                          : "bg-ai-purple/10 text-ai-purple border border-ai-purple/20"
                      }`}
                    >
                      {project.category}
                    </span>
                    <h3 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-4">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {project.overview}
                    </p>
                  </div>

                  {/* Source / demo links — the single thing a technical reviewer
                      looks for first. Buttons only render when a URL is set. */}
                  {hasLinks && (
                    <div className="flex flex-wrap gap-3">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-tint border border-line text-xs font-semibold text-text-primary hover:bg-tint-strong hover:border-line-strong transition-all"
                        >
                          <GithubIcon size={14} />
                          View Source
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric-blue text-white text-xs font-semibold hover:bg-ai-purple transition-all shadow-lg shadow-electric-blue/20"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                      {project.links.writeup && (
                        <a
                          href={project.links.writeup}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-tint border border-line text-xs font-semibold text-text-primary hover:bg-tint-strong hover:border-line-strong transition-all"
                        >
                          <BookOpen size={14} />
                          Write-up
                        </a>
                      )}
                    </div>
                  )}

                  {/* Metrics Cards */}
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      {project.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="card-raised p-4 rounded-2xl"
                        >
                          <div className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-neural-cyan">
                            {metric.value}
                          </div>
                          <div className="text-xxs text-text-muted mt-1 uppercase tracking-wider">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Baseline / dataset caption — turns a bare number into
                        something a reader can evaluate. */}
                    {project.evidence && (
                      <p className="flex gap-2 mt-3 text-xxs text-text-muted leading-relaxed">
                        <Info size={13} className="shrink-0 mt-0.5 text-text-faint" />
                        <span>{project.evidence}</span>
                      </p>
                    )}
                  </div>

                  {/* Tech Stack Badges */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 font-[family-name:var(--font-heading)]">
                      Technologies &amp; Frameworks
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <li
                          key={tech}
                          className="card-flat px-3 py-1 text-xxs rounded-lg text-text-secondary"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Case Study Modules */}
                  <div className="space-y-3">
                    {[
                      { id: "problem", label: "Problem Statement", items: project.problem },
                      { id: "solution", label: "Implementation Solution", items: project.solution },
                      { id: "lessons", label: "Lessons Learned", items: project.lessons },
                    ].map((section) => {
                      const isOpen = expandedSection === section.id;
                      return (
                        <div
                          key={section.id}
                          className="border border-line rounded-xl overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            aria-expanded={isOpen}
                            className="w-full flex items-center justify-between p-4 bg-tint hover:bg-tint-strong transition-colors text-left gap-4"
                          >
                            <span className="text-xs font-semibold text-text-primary uppercase tracking-wider font-[family-name:var(--font-heading)]">
                              {section.label}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="shrink-0"
                            >
                              <ChevronDown size={14} className="text-text-muted" />
                            </motion.div>
                          </button>
                          <motion.div
                            initial={false}
                            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                            className="overflow-hidden bg-tint"
                          >
                            <ul className="p-4 space-y-2 border-t border-line">
                              {section.items.map((item, idx) => (
                                <li key={idx} className="flex gap-2.5 items-start">
                                  <span className="text-electric-blue text-xs mt-1.5">•</span>
                                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                                    {item}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column — Pipeline or Training Dashboard */}
                <div className="lg:col-span-7">
                  <GlowCard
                    hover={false}
                    glowColor={isRAG ? "blue" : "purple"}
                    className="relative min-h-[400px] flex flex-col justify-between"
                  >
                    {isRAG ? (
                      /* RAG PIPELINE VISUALIZATION */
                      <div className="space-y-8 py-4">
                        <div className="border-b border-line pb-4 mb-4">
                          <h4 className="text-sm font-semibold font-[family-name:var(--font-heading)] text-text-primary">
                            Multi-Modal Retrieval-Augmented Generation Flow
                          </h4>
                          <p className="text-xxs text-text-muted mt-1">
                            Query path from raw document ingestion to grounded response
                          </p>
                        </div>

                        <ol className="relative flex flex-col gap-4">
                          {project.pipeline.map((step, idx) => {
                            const isInput = idx === 0;
                            const isOutput = idx === project.pipeline.length - 1;
                            const isEven = idx % 2 === 0;

                            return (
                              <li key={idx} className="relative flex items-center group">
                                <div
                                  className={`flex items-center gap-3 p-3.5 rounded-xl border w-full max-w-sm ${
                                    isInput
                                      ? "bg-electric-blue/10 border-electric-blue/30 text-electric-blue"
                                      : isOutput
                                        ? "bg-neural-cyan/10 border-neural-cyan/30 text-neural-cyan"
                                        : "bg-tint border-line text-text-secondary group-hover:border-line group-hover:bg-tint-strong"
                                  } transition-all duration-300`}
                                >
                                  <div
                                    className={`p-1.5 rounded-lg ${
                                      isInput
                                        ? "bg-electric-blue/20"
                                        : isOutput
                                          ? "bg-neural-cyan/20"
                                          : "bg-tint"
                                    }`}
                                  >
                                    {isInput ? (
                                      <FileText size={16} />
                                    ) : isOutput ? (
                                      <Cpu size={16} />
                                    ) : isEven ? (
                                      <Database size={16} />
                                    ) : (
                                      <Brain size={16} />
                                    )}
                                  </div>
                                  <span className="text-xs font-semibold tracking-wide font-[family-name:var(--font-heading)]">
                                    {step}
                                  </span>
                                </div>
                                {idx < project.pipeline.length - 1 && (
                                  <div className="absolute left-[22px] top-[46px] w-px h-[18px] bg-tint-strong" />
                                )}
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    ) : (
                      /* TRAINING DASHBOARD */
                      <div className="space-y-6">
                        <div className="border-b border-line pb-4 mb-4">
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="text-sm font-semibold font-[family-name:var(--font-heading)] text-text-primary">
                              Hybrid CNN-LSTM Training Profile
                            </h4>
                            <span className="shrink-0 px-2 py-0.5 text-xxs font-semibold uppercase tracking-wider rounded-full bg-tint border border-line text-text-muted">
                              Illustrative
                            </span>
                          </div>
                          <p className="text-xxs text-text-muted mt-1">
                            Representative convergence shape over 25 epochs — not an exported run
                          </p>
                        </div>

                        <TrainingChart />

                        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-line">
                          <div className="text-center p-2.5 bg-tint border border-line rounded-xl">
                            <div className="text-electric-blue text-xs font-bold flex items-center justify-center gap-1">
                              <Volume2 size={12} /> Librosa
                            </div>
                            <div className="text-xxs text-text-muted mt-1 uppercase">
                              MFCC Config
                            </div>
                          </div>
                          <div className="text-center p-2.5 bg-tint border border-line rounded-xl">
                            <div className="text-ai-purple text-xs font-bold flex items-center justify-center gap-1">
                              <Sliders size={12} /> CNN LSTM
                            </div>
                            <div className="text-xxs text-text-muted mt-1 uppercase">
                              Model Shape
                            </div>
                          </div>
                          <div className="text-center p-2.5 bg-tint border border-line rounded-xl">
                            <div className="text-neural-cyan text-xs font-bold flex items-center justify-center gap-1">
                              <TrendingUp size={12} /> 91%
                            </div>
                            <div className="text-xxs text-text-muted mt-1 uppercase">
                              Final Accuracy
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </GlowCard>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
