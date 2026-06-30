"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Image as ImageIcon,
  ArrowRight,
  ChevronRight,
  Database,
  Cpu,
  Brain,
  Layers,
  ChevronDown,
  Volume2,
  Sliders,
  TrendingUp,
} from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ============================================
// TRAINING CHART DATA (Audio Deepfake)
// ============================================
const trainingData = [
  { epoch: 1, loss: 0.85, accuracy: 0.55 },
  { epoch: 5, loss: 0.62, accuracy: 0.72 },
  { epoch: 10, loss: 0.45, accuracy: 0.81 },
  { epoch: 15, loss: 0.31, accuracy: 0.86 },
  { epoch: 20, loss: 0.22, accuracy: 0.89 },
  { epoch: 25, loss: 0.15, accuracy: 0.91 },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string>("rag");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="section-container relative z-10">
        <SectionHeader
          label="Projects"
          title="Featured AI Projects"
          subtitle="Building intelligent systems through research, engineering, and scalable machine learning."
        />

        {/* Project Switcher Tab Bar */}
        <div className="flex justify-center mb-12">
          <div className="glass p-1.5 rounded-full flex gap-2">
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveProject(proj.id);
                  setExpandedSection(null);
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeProject === proj.id
                    ? "bg-electric-blue text-text-primary shadow-lg shadow-electric-blue/20"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                }`}
              >
                {proj.title}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Display */}
        <AnimatePresence mode="wait">
          {PROJECTS.map((proj) => {
            if (proj.id !== activeProject) return null;

            const isRAG = proj.id === "rag";

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left Column — Overview, Metrics, Tech Stack */}
                <div className="lg:col-span-5 space-y-8">
                  <div>
                    <span className={`inline-block mb-3 px-3 py-1 text-xxs font-semibold uppercase tracking-wider rounded-full ${
                      isRAG ? "bg-electric-blue/10 text-electric-blue border border-electric-blue/20" : "bg-ai-purple/10 text-ai-purple border border-ai-purple/20"
                    }`}>
                      {isRAG ? "Retrieval-Augmented Gen" : "Audio Classification"}
                    </span>
                    <h3 className="text-3xl font-bold font-[family-name:var(--font-heading)] mb-4">
                      {proj.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {proj.overview}
                    </p>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {proj.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl"
                      >
                        <div className="text-xl md:text-2xl font-bold font-[family-name:var(--font-heading)] text-neural-cyan">
                          {metric.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-text-muted mt-1 uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Badges */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-3 font-[family-name:var(--font-heading)]">
                      Technologies & Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {proj.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xxs rounded-lg bg-white/5 border border-white/5 text-text-secondary hover:text-text-primary transition-colors cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Case Study Modules */}
                  <div className="space-y-3">
                    {[
                      { id: "problem", label: "Problem Statement", items: proj.problem },
                      { id: "solution", label: "Implementation Solution", items: proj.solution },
                      { id: "lessons", label: "Lessons Learned", items: proj.lessons },
                    ].map((sec) => (
                      <div
                        key={sec.id}
                        className="border border-white/5 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(sec.id)}
                          className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-left"
                        >
                          <span className="text-xs font-semibold text-text-primary uppercase tracking-wider font-[family-name:var(--font-heading)]">
                            {sec.label}
                          </span>
                          <motion.div
                            animate={{ rotate: expandedSection === sec.id ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={14} className="text-text-muted" />
                          </motion.div>
                        </button>
                        <motion.div
                          initial={false}
                          animate={{
                            height: expandedSection === sec.id ? "auto" : 0,
                            opacity: expandedSection === sec.id ? 1 : 0,
                          }}
                          className="overflow-hidden bg-white/[0.01]"
                        >
                          <div className="p-4 space-y-2 border-t border-white/5">
                            {sec.items.map((item, idx) => (
                              <div key={idx} className="flex gap-2.5 items-start">
                                <span className="text-electric-blue text-xs mt-1.5">•</span>
                                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column — Pipeline, Dashboard or Flowcharts */}
                <div className="lg:col-span-7">
                  <GlowCard hover={false} glowColor={isRAG ? "blue" : "purple"} className="relative min-h-[400px] flex flex-col justify-between">
                    {isRAG ? (
                      /* RAG PIPELINE VISUALIZATION */
                      <div className="space-y-8 py-4">
                        <div className="border-b border-white/5 pb-4 mb-4">
                          <h4 className="text-sm font-semibold font-[family-name:var(--font-heading)] text-text-primary">
                            Multi-Modal Retrieval-Augmented Gen Flow
                          </h4>
                          <p className="text-xxs text-text-muted mt-1">
                            Visual pipeline representing user query contextual enrichment
                          </p>
                        </div>

                        {/* Interactive flow items */}
                        <div className="relative flex flex-col gap-4">
                          {proj.pipeline.map((step, idx) => {
                            const isInput = idx === 0;
                            const isOutput = idx === proj.pipeline.length - 1;
                            const isEven = idx % 2 === 0;

                            return (
                              <div key={idx} className="relative flex items-center justify-between group">
                                <div className={`flex items-center gap-3 p-3.5 rounded-xl border w-full max-w-sm ${
                                  isInput
                                    ? "bg-electric-blue/10 border-electric-blue/30 text-electric-blue"
                                    : isOutput
                                    ? "bg-neural-cyan/10 border-neural-cyan/30 text-neural-cyan"
                                    : "bg-white/[0.02] border-white/5 text-text-secondary group-hover:border-white/10 group-hover:bg-white/[0.04]"
                                } transition-all duration-300`}>
                                  <div className={`p-1.5 rounded-lg ${isInput ? "bg-electric-blue/20" : isOutput ? "bg-neural-cyan/20" : "bg-white/5"}`}>
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
                                {idx < proj.pipeline.length - 1 && (
                                  <div className="absolute left-[22px] top-[46px] w-[1px] h-[18px] bg-white/10" />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* AUDIO DEEPFAKE TRAINING DASHBOARD */
                      <div className="space-y-6">
                        <div className="border-b border-white/5 pb-4 mb-4">
                          <h4 className="text-sm font-semibold font-[family-name:var(--font-heading)] text-text-primary">
                            Hybrid CNN-LSTM Training Metrics
                          </h4>
                          <p className="text-xxs text-text-muted mt-1">
                            Real-time evaluation curves over 25 epochs
                          </p>
                        </div>

                        {/* Chart component */}
                        {mounted && (
                          <div className="h-56 w-full opacity-90 pr-2">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={trainingData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="epoch" stroke="rgba(255,255,255,0.3)" fontSize={10} label={{ value: 'Epoch', position: 'insideBottom', offset: -5, fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
                                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                                <Tooltip
                                  contentStyle={{
                                    background: "rgba(3, 7, 18, 0.95)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "12px",
                                    fontSize: "11px",
                                    color: "#F8FAFC",
                                  }}
                                />
                                <Line type="monotone" dataKey="loss" stroke="#8B5CF6" strokeWidth={2} activeDot={{ r: 6 }} name="Loss" />
                                <Line type="monotone" dataKey="accuracy" stroke="#06B6D4" strokeWidth={2} name="Accuracy" />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        {/* Training indicators */}
                        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5">
                          <div className="text-center p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                            <div className="text-electric-blue text-xs font-bold flex items-center justify-center gap-1">
                              <Volume2 size={12} /> Librosa
                            </div>
                            <div className="text-[10px] text-text-muted mt-1 uppercase">MFCC Config</div>
                          </div>
                          <div className="text-center p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                            <div className="text-ai-purple text-xs font-bold flex items-center justify-center gap-1">
                              <Sliders size={12} /> CNN LSTM
                            </div>
                            <div className="text-[10px] text-text-muted mt-1 uppercase">Model Shape</div>
                          </div>
                          <div className="text-center p-2.5 bg-white/[0.01] border border-white/5 rounded-xl">
                            <div className="text-neural-cyan text-xs font-bold flex items-center justify-center gap-1">
                              <TrendingUp size={12} /> 91%
                            </div>
                            <div className="text-[10px] text-text-muted mt-1 uppercase">Val Target</div>
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
